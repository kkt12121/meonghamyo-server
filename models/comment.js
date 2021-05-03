'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "userId"
      })

      this.belongsTo(models.content, {
        foreignKey: "contentId"
      })
    }
  };
  comment.init({
    contentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    commentBody: DataTypes.STRING,
    like: {
      type: DataTypes.INTEGER,      
      defaultValue: '0'
     }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};