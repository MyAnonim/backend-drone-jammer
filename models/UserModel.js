import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

const UserApi = db.define(
  "user_api",
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    nama: {
      type: DataTypes.STRING,
    },
    id_karyawan: {
      type: DataTypes.STRING,
    },
    jabatan: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

const DblockerApi = db.define(
  "dblocker_api",
  {
    no_seri: {
      type: DataTypes.STRING,
    },
    ip_addr: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    jammer_rc: {
      type: DataTypes.STRING,
    },
    jammer_gps: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export { Users, UserApi, DblockerApi };
