"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DATABASE_URL, NODE_ENV, DB_URL_DEV, DB_URL_TEST, } = process.env;
let dbUrl;
switch (NODE_ENV) {
    case 'production':
        dbUrl = DATABASE_URL;
        break;
    case 'development':
        dbUrl = DB_URL_DEV;
        break;
    case 'test':
        dbUrl = DB_URL_TEST;
        break;
    default: throw Error('there is error in database url');
}
const sequelize = new sequelize_1.Sequelize(dbUrl, {
    logging: false,
    dialectOptions: {
        ssl: NODE_ENV === 'production'
            ? {
                require: true,
                rejectUnauthorized: false,
            }
            : false,
    },
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map