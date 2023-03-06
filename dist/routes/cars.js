"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExpressWrapper_1 = __importDefault(require("./ExpressWrapper"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const controllers_1 = require("../controllers");
const carsRouter = (0, express_1.Router)();
carsRouter.get('/', (0, ExpressWrapper_1.default)(controllers_1.getFilteredCars));
carsRouter.get('/dashboard', (0, authMiddleware_1.default)('admin'), (0, ExpressWrapper_1.default)(controllers_1.getCarsDetails));
carsRouter.delete('/:id', (0, authMiddleware_1.default)('admin'), (0, ExpressWrapper_1.default)(controllers_1.deleteCarsById));
carsRouter.put('/:id', (0, authMiddleware_1.default)('admin'), (0, ExpressWrapper_1.default)(controllers_1.updateCars));
carsRouter.post('/', (0, authMiddleware_1.default)('user'), (0, ExpressWrapper_1.default)(controllers_1.addCar));
carsRouter.patch('/buy', (0, authMiddleware_1.default)('user'), (0, ExpressWrapper_1.default)(controllers_1.buyCar));
carsRouter.get('/user', (0, authMiddleware_1.default)('user'), (0, ExpressWrapper_1.default)(controllers_1.getUserCars));
carsRouter.get('/:id', (0, ExpressWrapper_1.default)(controllers_1.getCarsById));
carsRouter.post('/images/:id', (0, authMiddleware_1.default)('admin'), (0, ExpressWrapper_1.default)(controllers_1.addCarImagesController));
exports.default = carsRouter;
//# sourceMappingURL=cars.js.map