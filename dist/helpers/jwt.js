"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, (err, token) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(token);
        }
    });
});
exports.generateToken = generateToken;
const verifyToken = (token) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err)
            reject(new Error('Unauthorized'));
        else
            resolve(decoded);
    });
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map