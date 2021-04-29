'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.comment,{
        foreignKey: "id"
      })

      this.belongsTo(models.user, {
        foreignKey: "userId"
      })

      this.belongsToMany(models.tag, {
        through: models.tagContent,
        foreignKey: "contentId"
      })
    }
  };
  content.init({
    userId: DataTypes.INTEGER,
    boardCode: DataTypes.INTEGER,
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    content: DataTypes.STRING,
    hit: { 
       type: DataTypes.INTEGER,
       allowNull: fallse,
       defaultValue: '0'
      },
    like: {
       type: DataTypes.INTEGER,
       allowNull: fallse,
       defaultValue: '0'
      }
  }, {
    sequelize,
    modelName: 'content',
  });
  return content;
};