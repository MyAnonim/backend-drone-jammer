import { UserApi } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const data = await UserApi.findAll({
      attributes: ["username", "nama", "refresh_token"],
    });
    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, nama, id_karyawan, jabatan, password, confPassword } =
    req.body;

  try {
    // Periksa apakah username sudah ada dalam database
    const existingUser = await UserApi.findOne({ where: { username } });

    const existingIdKaryawan = await UserApi.findOne({
      where: { id_karyawan },
    });

    if (existingUser || existingIdKaryawan) {
      return res.status(400).json({
        status: "fail",
        message: "Username already registered",
      });
    }

    if (password !== confPassword)
      return res
        .status(400)
        .json({ message: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await UserApi.create({
      username: username,
      nama: nama,
      id_karyawan: id_karyawan,
      jabatan: jabatan,
      password: hashPassword,
    });

    res.json({
      status: "success",
      data: {
        username: username,
        nama: nama,
        id_karyawan: id_karyawan,
        jabatan: jabatan,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await UserApi.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match)
      return res
        .status(400)
        .json({ message: "Password yang anda masukkan salah" });
    const userId = user[0].id;
    const username = user[0].username;
    const nama = user[0].nama;
    const id_karyawan = user[0].id_karyawan;
    const jabatan = user[0].jabatan;
    const accessToken = jwt.sign(
      { userId, username, nama, id_karyawan, jabatan },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, username, nama, id_karyawan, jabatan },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await UserApi.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      //   secure: true, //untuk https server global
    });
    res.json({
      status: "success",
      data: {
        user_id: userId,
        token: accessToken,
      },
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: "fail", message: "Username or password wrong" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  const user = await UserApi.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0])
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  const userId = user[0].id;
  await UserApi.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    status: "success",
  });
};

export const deleteUser = async (req, res) => {
  try {
    const user = await UserApi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const userId = user.id;
    const username = user.username;
    // res.status(200).json({ msg: "User Success Deleted" });
    res.status(200).json({
      status: "success deleted",
      data: {
        user_id: userId,
        username: username,
      },
    });

    await UserApi.destroy({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
