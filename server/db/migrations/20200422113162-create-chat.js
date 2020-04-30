'use strict';
import {CHAT_REPOSITORY} from "../../src/api/controllers/chat/chat.model";


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chats_migr', CHAT_REPOSITORY);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chats');
  }
};
