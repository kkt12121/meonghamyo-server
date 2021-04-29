'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.content,{
        foreignKey: "id"
      })

      this.hasMany(models.comment,{
        foreignKey: "id"
      })
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    birth: DataTypes.STRING,
    chatbox: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};