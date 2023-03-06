"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./db/config/connection"));
const PORT = app_1.default.get('port');
connection_1.default.sync().then(() => {
    app_1.default.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=index.js.map