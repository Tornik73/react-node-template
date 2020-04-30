import sequelize from "../../../config/db.connection";
import * as Sequelize from "sequelize";


export const USERS_REPOSITORY: any = sequelize.define("users", {
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: true
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
});

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  user_id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  img: string;
  telephone: string;
  age: number;
}
export class UserTokenPayload {
  user_id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  telephone: string;
  age: number;

  constructor(user: User) {
    this.user_id = user.user_id;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
    this.telephone = user.telephone;
    this.age = user.age;
  }
}
export class UserTokenImg {
  token: string;
  img: string;

  constructor(token: string, img: string) {
    this.token = token;
    this.img = img;
  }
}
