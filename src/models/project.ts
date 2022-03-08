import { Model } from "sequelize";

interface ProjectDoc {
  title: string;
  id: number
}

export const func = (sequelize: any, DataTypes: any) => {
  class Project extends Model<ProjectDoc> implements ProjectDoc {
    declare title: string;
    declare id: number;

    static associate(models: any) {
      models.Project.belongsToMany(models.User, {
        through: models.Up
      });
    }
  }

  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Project',
  });

  return Project;
};