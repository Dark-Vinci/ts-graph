import { Model } from "sequelize";

interface UserDocument {
  id?: number;
  age: number;
  name: string;
}

export const func = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserDocument> implements UserDocument {
    declare id?: number;
    declare name: string;
    declare age: number;

    static associate(models: any) {
      console.log("wanndjkbckuj")
      models.User.belongsToMany(models.Project, {
        through: models.Up,
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
}