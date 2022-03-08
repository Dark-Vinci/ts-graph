'use strict';
module.exports = {
  async up(queryInterface: { createTable: (arg0: string, arg1: { id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; ProjectId: { type: any; }; createdAt: { allowNull: boolean; type: any; }; updatedAt: { allowNull: boolean; type: any; }; }) => any; }, Sequelize: { INTEGER: any; DATE: any; }) {
    await queryInterface.createTable('ProjectAssignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface: { dropTable: (arg0: string) => any; }, _Sequelize: any) {
    await queryInterface.dropTable('ProjectAssignments');
  }
};