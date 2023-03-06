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
exports.loginAdmin = exports.userController = exports.signupController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_errors_1 = __importDefault(require("http-errors"));
const validation_1 = require("../validation");
const services_1 = require("../services");
const helpers_1 = require("../helpers");
const AdminLoginSchema_1 = __importDefault(require("../validation/AdminLoginSchema"));
//----------------------------------------------------------------
const loginController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield validation_1.loginSchema.validate({ email, password });
    const result = yield (0, services_1.findUser)({ email });
    if (!result) {
        throw (0, http_errors_1.default)(400, 'wrong email or password');
    }
    const isCompare = yield bcryptjs_1.default.compare(password, result.password);
    if (!isCompare) {
        throw (0, http_errors_1.default)(400, 'wrong email or password');
    }
    const token = yield (0, helpers_1.generateToken)({ userId: result.id, role: 'user' });
    return {
        status: 200,
        data: {
            id: result.id, email: result.email, username: result.fullName, role: 'user',
        },
        token,
    };
});
exports.loginController = loginController;
const signupController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, phoneNumber, } = req.body;
    yield validation_1.signupSchema.validate({
        fullName, email, password, phoneNumber,
    });
    const result = yield (0, services_1.checkEmail)({ email });
    if (result.length) {
        throw (0, http_errors_1.default)(400, 'this email is registered');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    const user = yield (0, services_1.signupUser)({
        email, password: hashedPassword, phoneNumber, fullName,
    });
    const token = yield (0, helpers_1.generateToken)({ userId: user, role: 'user' });
    return {
        status: 201,
        msg: 'done!',
        data: {
            id: user.id, email: user.email, username: user.fullName, role: 'user',
        },
        token,
    };
});
exports.signupController = signupController;
const userController = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (token) {
        const decoded = yield (0, helpers_1.verifyToken)(token);
        if (decoded.role === 'user') {
            const result = yield (0, services_1.findUserById)({ id: decoded.userId });
            return {
                status: 200,
                data: {
                    id: result.id, email: result.email, username: result.fullName, role: 'user',
                },
            };
        }
        const result = yield (0, services_1.findAdminById)(decoded.userId);
        return { status: 200, data: { role: 'admin', id: decoded.id, username: result.username } };
    }
    return { status: 401 };
});
exports.userController = userController;
const loginAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    yield AdminLoginSchema_1.default.validate({ username, password });
    const result = yield (0, services_1.checkAdmin)({ username });
    if (!result) {
        throw (0, http_errors_1.default)(400, 'wrong username or password');
    }
    const isCompare = yield bcryptjs_1.default.compare(password, result.password);
    if (!isCompare) {
        throw (0, http_errors_1.default)(400, 'wrong username or password');
    }
    const token = yield (0, helpers_1.generateToken)({ userId: result.id, role: 'admin' });
    return {
        status: 200,
        data: {
            id: result.id, username: result.username, role: 'admin',
        },
        token,
    };
});
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=auth.js.map