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
const ExpressWrapper = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, data = null, msg = null, token = null, } = yield fn(req, res, next);
        if (token) {
            res.cookie('token', token).status(status).json({ msg, data });
        }
        else {
            res.status(status).json({ msg, data });
        }
    }
    catch (error) {
        // may need change
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.errors });
        }
        else if (error.status) {
            res.status(error.status).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Server Error', err: error });
        }
    }
});
exports.default = ExpressWrapper;
//# sourceMappingURL=ExpressWrapper.js.map