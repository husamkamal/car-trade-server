"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 4000);
app.use([(0, compression_1.default)(),
    express_1.default.json(),
    (0, cookie_parser_1.default)(),
    express_1.default.urlencoded({ extended: false })]);
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use('/api/v1', routes_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static((0, path_1.join)(__dirname, '..', '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, '..', '..', 'client', 'build', 'index.html'));
    });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, next) => {
    res.status(404).json('bad request');
});
app.use((error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (error.status) {
        res.status(error.status).json(error.message);
    }
    else {
        res.status(500).json('interval server error');
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map