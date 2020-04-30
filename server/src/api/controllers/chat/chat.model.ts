import sequelize from "../../../config/db.connection";
import * as Sequelize from "sequelize";
import {USERS_REPOSITORY} from "../users/user.model";

export const CHAT_REPOSITORY: any = sequelize.define("chats", {
  chat_id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creation_user_id: {
    type: Sequelize.UUID,
    allowNull: false,
  }
});
export const CHAT_USERS_REPOSITORY: any = sequelize.define("chats_users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chat_id: {
    type: Sequelize.UUID,
    references: {
      model: CHAT_REPOSITORY,
      key: 'chat_id'
    },
  },
  user_id: {
    type: Sequelize.UUID,
    references: {
      model: USERS_REPOSITORY,
      key: 'user_id'
    },
  },
});
CHAT_REPOSITORY.belongsToMany(USERS_REPOSITORY, {through: 'chats_users', foreignKey: "chat_id",});
USERS_REPOSITORY.belongsToMany(CHAT_REPOSITORY, {through: 'chats_users', foreignKey: "user_id",});

export const MESSAGE_REPOSITORY: any = sequelize.define("messages", {
  message_id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  chat_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'chats',
      key: 'chat_id'
    },
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date_create: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
USERS_REPOSITORY.hasMany(MESSAGE_REPOSITORY, {foreignKey: 'user_id', sourceKey: 'user_id'});
MESSAGE_REPOSITORY.belongsTo(USERS_REPOSITORY, {foreignKey: 'user_id', targetKey: 'user_id', as:'user_sender'});


export const MESSAGE_STATUS_REPOSITORY: any = sequelize.define("messages_status", {
  message_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'messages',
      key: 'message_id'
    },
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  is_read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

MESSAGE_REPOSITORY.hasMany(MESSAGE_STATUS_REPOSITORY, {foreignKey: 'message_id',  sourceKey: 'message_id', as: 'read_statuses'});
MESSAGE_STATUS_REPOSITORY.belongsTo(MESSAGE_REPOSITORY, {foreignKey: 'message_id', targetKey: 'message_id'})

export class ChatUsers {
  id: number;
  chat_id: string = '';
  user_id: string = '';
}
export class Chat {
  chat_id: string = '';
  name: string = '';
  creation_user_id: string = '';
}

export class UserMessage {
  user_id: string = '';
  message_id: string = '';
  constructor(userId: string, messageId: string) {
    this.user_id = userId;
    this.message_id = messageId;
  }
}
export class Message {
  message_id: string = '';
  chat_id: string = '';
  user_id: string = '';
  content: string = '';
  date_create: string;
  read_statuses: any[];
  constructor(messageId: string) {
    this.message_id = messageId;
  }
}

export interface ChatMessage {
  content: string;
  date_create: string;
  message_id: string;
  user_sender: ChatMember;
  read_statuses?: string[];
}

export interface ChatMember {
  img: string;
  user_id: string;
  email: string;
}

export class MessagesStatuses {
  message_id: string;
  user_id: string;
  is_read: boolean;
}

export class SendMessage {
  chat_id: string;
  user_id: string;
  content: string;
  date_create: string;
}
