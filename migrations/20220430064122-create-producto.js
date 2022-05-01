'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nPresup: {
        type: Sequelize.INTEGER
      },
      nReal: {
        type: Sequelize.INTEGER
      },
      tienda: {
        type: Sequelize.STRING
      },
      nota: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.CHAR
      },
      lista: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};