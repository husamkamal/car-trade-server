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
exports.addImageService = exports.getCarByCustomerId = exports.addCarService = exports.getCarsDetailsQuery = exports.deleteCars = exports.updateCarService = exports.getCarInfo = exports.getCars = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../db/models");
const addCarService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield models_1.Car.create(data, {
        returning: true,
    });
    return car;
});
exports.addCarService = addCarService;
const CAR_NUM_IN_PAGE = 9;
const getCars = ({ brand, model, year, maxPrice, fuel, mileage, goodPrice, state, page, }) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (brand.trim()) {
        where.brand = {
            [sequelize_1.Op.iLike]: `%${brand.trim()}%`,
        };
    }
    if (model.trim()) {
        where.model = {
            [sequelize_1.Op.iLike]: `%${model.trim()}%`,
        };
    }
    if (mileage.trim()) {
        where.mileage = {
            [sequelize_1.Op.lte]: +mileage,
        };
    }
    if (maxPrice.trim()) {
        where.price = {
            [sequelize_1.Op.lte]: maxPrice.trim(),
        };
    }
    if (year.trim()) {
        where.year = +year;
    }
    if (fuel.trim()) {
        where.fuel = fuel.trim();
    }
    if (+goodPrice) {
        where.isGoodPrice = Boolean(+goodPrice);
    }
    if (state.trim()) {
        where.state = state.trim();
    }
    const cars = yield models_1.Car.findAndCountAll({
        where,
        offset: (page - 1) * CAR_NUM_IN_PAGE,
        limit: CAR_NUM_IN_PAGE,
        include: { model: models_1.Image },
        distinct: true,
    });
    return cars;
});
exports.getCars = getCars;
const deleteCars = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield models_1.Car.destroy({
        where: ({
            id,
        }),
    });
    return car;
});
exports.deleteCars = deleteCars;
const getCarInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield models_1.Car.findAll({
        where: { id },
        include: { model: models_1.Image },
    });
    return car;
});
exports.getCarInfo = getCarInfo;
const CAR_NUM = 10;
const getCarsDetailsQuery = (state, page) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield models_1.Car.findAndCountAll({
        where: {
            state,
        },
        offset: (page - 1) * CAR_NUM,
        include: [
            { model: models_1.Customer, attributes: ['fullName', 'phoneNumber', 'email'] },
        ],
        limit: CAR_NUM,
        distinct: true,
    });
    return cars;
});
exports.getCarsDetailsQuery = getCarsDetailsQuery;
const updateCarService = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield models_1.Car.update(Object.assign({}, body), {
        returning: true,
        where: { id },
    });
    return car;
});
exports.updateCarService = updateCarService;
const getCarByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield models_1.Car.findAll({
        where: { customerId },
        attributes: ['state', 'id', 'createdAt', 'model'],
    });
    return car;
});
exports.getCarByCustomerId = getCarByCustomerId;
const addImageService = (images) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield models_1.Image.bulkCreate([...images]);
    return rows;
});
exports.addImageService = addImageService;
//# sourceMappingURL=cars.js.map