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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAdminById = exports.checkAdmin = exports.signupUser = exports.checkEmail = exports.findUserById = exports.findUser = void 0;
const models_1 = require("../db/models");
const checkEmail = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    const getEmail = yield models_1.Customer.findAll({
        where: {
            email,
        },
        attributes: ['email'],
    });
    return getEmail;
});
exports.checkEmail = checkEmail;
const findUser = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield models_1.Customer.findOne({ where: { email } });
    return userInfo;
});
exports.findUser = findUser;
const findUserById = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield models_1.Customer.findOne({ where: { id } });
    return userInfo;
});
exports.findUserById = findUserById;
const signupUser = ({ email, password, fullName, phoneNumber, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield models_1.Customer.create({
        email,
        password,
        fullName,
        phoneNumber,
    });
    return userInfo;
});
exports.signupUser = signupUser;
const checkAdmin = ({ username }) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield models_1.Admin.findOne({
        where: {
            username,
        },
        attributes: ['id', 'username', 'password'],
    });
    return admin;
});
exports.checkAdmin = checkAdmin;
const findAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminInfo = yield models_1.Admin.findOne({
        where: { id },
        attributes: ['id', 'username', 'password'],
    });
    return AdminInfo;
});
exports.findAdminById = findAdminById;
//# sourceMappingURL=auth.js.map