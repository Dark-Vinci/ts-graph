import config from "config";
import Sequelize from "sequelize";

import { func as uFunc } from "./user";
import { func as pFunc } from "./project";
import { func as upFunc } from "./xa";

class DB {
  private db: any = {};
  private confi: { 
    database: string, 
    username: string, 
    password: string
  } = config.get("db");

  // @ts-ignore
  private sequelize = new Sequelize(this.confi.database, this.confi.username, this.confi.password, this.confi);

  constructor() {
    const uF = uFunc(this.sequelize, Sequelize.DataTypes);
    const pF = pFunc(this.sequelize, Sequelize.DataTypes);
    const upF = upFunc(this.sequelize, Sequelize.DataTypes);

    this.db[uF.name] = uF;
    this.db[pF.name] = pF;
    this.db[upF.name] = upF;

    Object.keys(this.db).forEach(modelName => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });

    this.db.sequelize = this.sequelize;
    this.db.Sequelize = Sequelize;
  }

  public get dbObject () {
    return this.db;
  }

  public static init() {
    return new DB();
  }
}

export default DB.init().dbObject;
