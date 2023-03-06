"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Customer = exports.Car = exports.Image = void 0;
const image_1 = __importDefault(require("./image"));
exports.Image = image_1.default;
const car_1 = __importDefault(require("./car"));
exports.Car = car_1.default;
const customer_1 = __importDefault(require("./customer"));
exports.Customer = customer_1.default;
const admin_1 = __importDefault(require("./admin"));
exports.Admin = admin_1.default;
car_1.default.hasMany(image_1.default);
image_1.default.belongsTo(car_1.default);
customer_1.default.hasMany(car_1.default);
car_1.default.belongsTo(customer_1.default);
//# sourceMappingURL=index.js.map