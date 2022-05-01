'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lista', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nProd: {
        type: Sequelize.INTEGER
      },
      nComp: {
        type: Sequelize.INTEGER
      },
      toPresup: {
        type: Sequelize.INTEGER
      },
      toGast: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.CHAR
      },
      alert: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lista');
  }
};