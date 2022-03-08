import { Model } from "sequelize";

interface ProjectAssiDoc {
  ProjectId: number;
  UserId: number;
}

export const func = (sequelize: any, DataTypes: any) => {
  class Up extends Model<ProjectAssiDoc> implements  ProjectAssiDoc{
    declare ProjectId: number;
    declare UserId: number;
    
    static associate(models: any) {}
  }

  Up.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Projects",
        key: "id"
      }
    },

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Up',
  });

  return Up;
};

// export func;