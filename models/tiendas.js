'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tiendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tiendas.init({
    nombre: DataTypes.STRING,
    //sucursal: DataTypes.STRING,
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    region: DataTypes.STRING,
    estado: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'tiendas',
  });
  return tiendas;
};