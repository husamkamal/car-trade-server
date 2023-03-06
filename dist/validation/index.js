"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.addCarSchema = exports.loginSchema = exports.updateCarSchema = void 0;
const updateCarSchema_1 = require("./updateCarSchema");
Object.defineProperty(exports, "updateCarSchema", { enumerable: true, get: function () { return updateCarSchema_1.updateCarSchema; } });
Object.defineProperty(exports, "addCarSchema", { enumerable: true, get: function () { return updateCarSchema_1.addCarSchema; } });
const loginSchema_1 = __importDefault(require("./loginSchema"));
exports.loginSchema = loginSchema_1.default;
const signupSchema_1 = __importDefault(require("./signupSchema"));
exports.signupSchema = signupSchema_1.default;
//# sourceMappingURL=index.js.map