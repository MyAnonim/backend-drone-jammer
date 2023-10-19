import { DblockerApi, UserApi } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getDrone = async (req, res) => {
  try {
    const dblocker = await DblockerApi.findAll({
      attributes: [
        "id",
        "no_seri",
        "ip_addr",
        "location",
        "createdAt",
        "updatedAt",
        "jammer_rc",
        "jammer_gps",
      ],
    });
    // res.json(user_api);
    res.json({
      status: "success",
      data: {
        dblocker,
      },
    });
  } catch (error) {
    // console.log(error);
    res.json({
      status: "fail",
      message: "Errors fetch data",
    });
  }
};

export const addDrone = async (req, res) => {
  const { no_seri, ip_addr, location } = req.body;

  try {
    // Periksa apakah no_seri sudah ada dalam database
    const existingNoSeri = await DblockerApi.findOne({
      where: { no_seri },
    });

    // Periksa apakah ip_addr sudah ada dalam database
    const existingIpAddr = await DblockerApi.findOne({
      where: { ip_addr },
    });

    if (existingNoSeri || existingIpAddr) {
      return res.status(400).json({
        status: "fail",
        message:
          "nomer seri already registered / ip already used / error lainya",
      });
    }

    const dblocker = await DblockerApi.create({
      no_seri: no_seri,
      ip_addr: ip_addr,
      location: location,
      jammer_rc: "off",
      jammer_gps: "off",
    });

    console.log(dblocker);

    res.json({
      status: "success",
      data: {
        id: dblocker.id,
        no_seri: no_seri,
        ip_addr: ip_addr,
        location: location,
        createdAt: dblocker.createdAt,
        updatedAt: dblocker.updatedAt,
        jammer_rc: "off",
        jammer_gps: "off",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const Turn = async (req, res) => {
  const user = await DblockerApi.findAll({
    where: {
      no_seri: req.body.no_seri,
    },
  });
  console.log(req.body);

  try {
    // Periksa apakah No_Seri sudah ada dalam database
    const existingNoSeri = await DblockerApi.findOne({ where: { no_seri } });

    if (existingNoSeri) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to Switch / Id not valid",
      });
    }

    const dblocker = await DblockerApi.update({
      where: { no_seri: no_seri, jammer_rc: jammer_rc, jammer_gps: jammer_gps },
    });

    console.log(dblocker);

    res.json({
      status: "success",
      data: {
        id: dblocker.id,
        no_seri: no_seri,
        ip_addr: dblocker.ip_addr,
        location: dblocker.location,
        createdAt: dblocker.createdAt,
        updatedAt: dblocker.updatedAt,
        jammer_rc: jammer_rc,
        jammer_gps: jammer_gps,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
