'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('chats_migr', {
    chat_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });
  // Chat.associate = function(models) {
  //   Chat.hasMany(models.USERS_REPOSITORY, {
  //       through: 'chats_users',
  //       as: 'chat',
  //       foreignKey: 'chat_id'
  //     });
  // };
  return Chat;
};
