'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PortfolioUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PortfolioUser.init({
    avatar: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    full_name: DataTypes.STRING,
    skills: DataTypes.INTEGER,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    email: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    income: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PortfolioUser',
  });
  return PortfolioUser;
};