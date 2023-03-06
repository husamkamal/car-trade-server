"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const ExpressWrapper_1 = __importDefault(require("./ExpressWrapper"));
const auth = (0, express_1.Router)();
auth.post('/signup', (0, ExpressWrapper_1.default)(controllers_1.signupController));
auth.post('/login', (0, ExpressWrapper_1.default)(controllers_1.loginController));
auth.post('/admin/login', (0, ExpressWrapper_1.default)(controllers_1.loginAdmin));
auth.get('/user', (0, ExpressWrapper_1.default)(controllers_1.userController));
auth.get('/logout', (req, res) => { res.clearCookie('token').status(200).end(); });
exports.default = auth;
//# sourceMappingURL=auth.js.map