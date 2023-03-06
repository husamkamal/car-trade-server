"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const fakedata_json_1 = require("./fakedata.json");
const connection_1 = __importDefault(require("./connection"));
const buildDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.sync({ force: true });
    yield models_1.Admin.bulkCreate(fakedata_json_1.admins);
    yield models_1.Customer.bulkCreate(fakedata_json_1.customers);
    yield models_1.Car.bulkCreate(fakedata_json_1.cars);
    yield models_1.Image.bulkCreate(fakedata_json_1.images);
});
if (process.env.DB_SEED) {
    buildDB();
}
exports.default = buildDB;
//# sourceMappingURL=buildFakeData.js.map