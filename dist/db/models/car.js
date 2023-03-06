"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
const Car = connection_1.default.define('car', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    mileage: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    quality: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    isGoodPrice: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        allowNull: false,
        type: sequelize_1.DataTypes.ENUM('pending', 'under-check', 'on-market', 'sold'),
        defaultValue: 'pending',
    },
    transmission: {
        type: sequelize_1.DataTypes.ENUM('automatic', 'manual'),
    },
    features: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    fuel: {
        type: sequelize_1.DataTypes.ENUM('diesel', 'petrol'),
    },
});
exports.default = Car;
//# sourceMappingURL=car.js.map