'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lista.init({
    nombre: DataTypes.STRING,
    nProd: DataTypes.INTEGER,
    nComp: DataTypes.INTEGER,
    toPresup: DataTypes.INTEGER,
    toGast: DataTypes.INTEGER,
    estado: DataTypes.CHAR,
    alert: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lista',
  });
  return lista;
};