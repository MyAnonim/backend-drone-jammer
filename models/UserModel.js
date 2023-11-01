import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

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

const Users = db.define(
  "tb_users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    id_karyawan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export { UserApi, DblockerApi, Users };
