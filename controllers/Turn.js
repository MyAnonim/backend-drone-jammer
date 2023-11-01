import express from "express";
import { DblockerApi, UserApi } from "../models/UserModel.js";
import axios from "axios";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.json());

io.on("connection", (socket) => {
  console.log("Klien terhubung");

  socket.on("disconnect", () => {
    console.log("Klien terputus");
  });
});

export const Turn = async (req, res) => {
  const { jammer_rc, jammer_gps, dblocker_id, user_id } = req.body;
  const idUser = req.params.id; // Mengambil ID dari parameter URL

  try {
    const user = await DblockerApi.findAll({
      where: { id: dblocker_id },
    });

    const idLogin = await UserApi.findOne({
      where: { id: user_id },
    });

    if (!idLogin || idLogin.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "ID user tidak ditemukan",
      });
    }

    // Memeriksa apakah ID di body request sama dengan ID di URL
    if (idUser !== user_id) {
      return res.status(400).json({
        status: "fail",
        message: "ID tidak sesuai",
      });
    }

    const userId = user[0].id;
    const no_seri = user[0].no_seri;
    const ip_addr = user[0].ip_addr;
    const location = user[0].location;

    // // Kirim data ke ESP8266
    // const responseFromESP = await axios.post(`http://${ip_addr}`, {
    //   jammer_rc,
    //   jammer_gps,
    // });

    // console.log(responseFromESP.data);

    // // Perbarui data di database berdasarkan respon dari ESP8266
    // await DblockerApi.update(
    //   {
    //     jammer_rc: responseFromESP.data.jammer_rc_status,
    //     jammer_gps: responseFromESP.data.jammer_gps_status,
    //   },
    //   {
    //     where: { id: userId },
    //   }
    // );

    await DblockerApi.update(
      {
        jammer_rc: jammer_rc,
        jammer_gps: jammer_gps,
      },
      {
        where: { id: userId },
      }
    );

    // Kirim pembaruan ke klien melalui WebSocket
    // io.emit("updateData", {
    //   jammer_rc: responseFromESP.data.jammer_rc_status,
    //   jammer_gps: responseFromESP.data.jammer_gps_status,
    // });

    res.json({
      status: "success",
      data: {
        idUser: idLogin.id,
        namaUser: idLogin.username,
        id: userId,
        no_seri: no_seri,
        ip_addr: ip_addr,
        location: location,
        createdAt: user[0].createdAt,
        updatedAt: user[0].updatedAt,
        // jammer_rc: responseFromESP.data.jammer_rc_status,
        // jammer_gps: responseFromESP.data.jammer_gps_status,
        jammer_rc: jammer_rc,
        jammer_gps: jammer_gps,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: "Failed to Switch / Id not valid",
    });
  }
};
