const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
import { Router } from "express";
const router: Router = Router();

const options = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'Node.js Express',
  },
  "paths": {
    "/api/authenticate": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "requestBody": {
            "required": "true",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                    },
                    "password": {
                      "type": "string",
                    },
                  }
                }
              }
            }

        }
      }
    },
    "/api/register": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "requestBody": {
          "required": "true",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                  },
                  "password": {
                    "type": "string",
                  },
                }
              }
            }
          }

        }
      }
    },
    "/api/books/": {
      "get": {
        "tags": [
          "Books"
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      },
      "post": {
        "tags": [
          "Books"
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "requestBody": {
          "required": "true",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                  },
                  "price": {
                    "type": "number",
                  },
                  "img": {
                    "type": "string",
                  },
                  "description": {
                    "type": "string",
                  },
                }
              }
            }
          }

        }
      }
    },
    "/api/books/:{id}": {
      "get": {
        "tags": [
          "Books"
        ],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "type": "integer",
            "format": "uuid",
            "required": true
          }
        ]
      }
    },
    "/api/chat/createChatRoom": {
          "post": {
            "tags": [
              "Chat"
            ],
            "responses": {
              "200": {
                "description": ""
              }
            },
            "requestBody": {
              "required": "true",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                      },
                      "creation_user_id": {
                        "type": "string",
                      },
                    }
                  }
                }
              }

            }
          },
    },
  },
  // swaggerDefinition: {
  //   info: {
  //     title: 'Test API',
  //     version: '1.0.0',
  //     description: 'Test Express API with autogenerated swagger doc',
  //   },
  //   basePath: '/',
  // },
}
export  const specs = options;

