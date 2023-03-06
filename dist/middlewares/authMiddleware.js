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
const http_errors_1 = __importDefault(require("http-errors"));
const helpers_1 = require("../helpers");
const authMiddleware = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        const decoded = yield (0, helpers_1.verifyToken)(token);
        res.locals.user = decoded;
        if (role !== decoded.role) {
            next((0, http_errors_1.default)(401, 'Unauthorized'));
        }
        next();
    }
    catch (err) {
        next((0, http_errors_1.default)(401, 'Unauthorized'));
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map