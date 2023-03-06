"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.addCarImagesController = exports.getUserCars = exports.buyCar = exports.addCar = exports.getCarsDetails = exports.deleteCarsById = exports.updateCars = exports.getCarsById = exports.getFilteredCars = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const yup = __importStar(require("yup"));
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const validation_1 = require("../validation");
const emailTemplate_1 = __importDefault(require("../helpers/emailTemplate"));
const addCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { userId } = res.locals.user;
    const data = Object.assign(Object.assign({}, body), { customerId: userId });
    yield validation_1.addCarSchema.validate(body);
    const result = yield (0, services_1.addCarService)(data);
    const userInfo = yield (0, services_1.findUserById)({ id: userId });
    if (process.env.NODE_ENV !== 'test') {
        const emailTitle = 'Your Sell Request Sent Successfully!';
        const emailBody = `<p>We are happy to tell you that your sell car request has been received with the following details :</p>
  <ul  class="list">
     <li>Brand: ${result.brand}</li>
     <li>Model: ${result.model}</li>
     <li>Year: ${result.year}</li>
     <li>Mileage: ${result.mileage}</li>
     <li>location: ${result.location}</li>
     <li>price: $${result.price}</li>
  </ul>
 <p>Soonly our team will check your request, we will keep in touch with you, you can track your request state through email or using your profile..</p>
 <a href="https://car-trad.herokuapp.com/profile" class="button">Go To Profile!</a>`;
        const subject = 'Car trade team';
        const content = (0, emailTemplate_1.default)(emailTitle, userInfo.fullName, emailBody);
        yield (0, helpers_1.sendEmail)(userInfo, subject, content);
    }
    return { msg: 'successfully', status: 201, data: result };
});
exports.addCar = addCar;
//-------------------------------------------------------
const schema = yup.object({
    id: yup.number().integer().required(),
});
const deleteCarsById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield schema.validate({ id });
    const carInfo = yield (0, services_1.getCarInfo)(id);
    const result = yield (0, services_1.deleteCars)(id);
    if (result === 0) {
        throw (0, http_errors_1.default)(400, 'car not found');
    }
    if (process.env.NODE_ENV !== 'test') {
        const userInfo = yield (0, services_1.findUserById)({ id: carInfo[0].customerId });
        const emailTitle = 'Your Sell Car Request Has Been Rejected';
        const emailBody = `<p>Unfortunately, Your sell car request with the following details:</p>.
    <ul  class="list">
      <li>Brand: ${carInfo[0].brand}</li>
      <li>Model: ${carInfo[0].model}</li>
      <li>Year: ${carInfo[0].year}</li>
      <li>Mileage: ${carInfo[0].mileage}</li>
      <li>location: ${carInfo[0].location}</li>
      <li>price: $${carInfo[0].price}</li>
    </ul>
     <p>has been rejected. Good luck.</p>`;
        const subject = 'Car trade team';
        const content = (0, emailTemplate_1.default)(emailTitle, userInfo.fullName, emailBody);
        yield (0, helpers_1.sendEmail)(userInfo, subject, content);
    }
    return { status: 200, msg: 'done!', data: result };
});
exports.deleteCarsById = deleteCarsById;
//-------------------------------------------------------
const getCarsById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const schema2 = yup.object({
        id: yup.number().integer().required(),
    });
    yield schema2.validate({ id });
    const result = yield (0, services_1.getCarInfo)(id);
    return { status: 200, msg: 'done!', data: result };
});
exports.getCarsById = getCarsById;
//-------------------------------------------------------
const getCarsDetails = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { state = '', page = 1, } = req.query;
    if (!state) {
        throw (0, http_errors_1.default)(400, 'not found');
    }
    const result = yield (0, services_1.getCarsDetailsQuery)(state, page);
    if (result.rows.length === 0) {
        return { status: 200, msg: 'Not found', data: result };
    }
    return { status: 200, msg: 'done', data: result };
});
exports.getCarsDetails = getCarsDetails;
//-------------------------------------------------------
const getFilteredCars = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { brand = '', model = '', year = '', maxPrice = '', fuel = '', mileage = '', goodPrice = '', state = '', page = 1, } = req.query;
    const result = yield (0, services_1.getCars)({
        brand, model, year, maxPrice, fuel, mileage, goodPrice, state, page,
    });
    if (result.rows.length === 0) {
        return { status: 200, msg: 'Not found', data: result };
    }
    return { status: 200, msg: 'done!', data: result };
});
exports.getFilteredCars = getFilteredCars;
//-------------------------------------------------------
// eslint-disable-next-line consistent-return
const updateCars = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const car = yield (0, services_1.getCarInfo)(id);
    if (!car.length) {
        throw (0, http_errors_1.default)(400, 'car not found to update');
    }
    else if (car[0].state === 'sold') {
        throw (0, http_errors_1.default)(400, 'This car sold');
    }
    yield validation_1.updateCarSchema.validate(body);
    const result = yield (0, services_1.updateCarService)(body, id);
    if (process.env.NODE_ENV !== 'test') {
        let emailTitle;
        let emailBody;
        const userInfo = yield (0, services_1.findUserById)({ id: result[1][0].customerId });
        if (body.state === 'under-check') {
            emailTitle = 'Your Sell Request Has Been Accepted!';
            emailBody = `<p>We are happy to tell you that your sell car request has been accepted initially.</p>
    <p>Soonly our team will check your request, if it is accepted, a group of professionals will contact you to
        come to see the car and gather its specifications preparing to publish it on our market.</p>
    <p>you can track the state of your request through your email or your profile.</p>
    <a href="https://car-trad.herokuapp.com/profile" class="button">Go To Profile!</a>`;
        }
        else if (body.state === 'on-market') {
            emailTitle = 'Your Car Added To The Market !';
            emailBody = `<p>We are happy to tell you that your sell car request
       has been accepted and your car added to the market finally🌟.</p>
       <p>You can track the state of your request through your email or your profile.</p>
       <a href="https://car-trad.herokuapp.com/profile" class="button">Go To Profile!</a>`;
        }
        const subject = 'Car trade team';
        const content = (0, emailTemplate_1.default)(emailTitle, userInfo.fullName, emailBody);
        yield (0, helpers_1.sendEmail)(userInfo, subject, content);
    }
    return { status: 200, msg: 'done!', data: result };
});
exports.updateCars = updateCars;
//-------------------------------------------------------
const buyCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { userId } = res.locals.user;
    const carInfo = yield (0, services_1.getCarInfo)(id);
    if (carInfo[0].state === 'on-market') {
        yield (0, services_1.updateCarService)({ state: 'sold' }, id);
        if (process.env.NODE_ENV !== 'test') {
            const result = yield (0, services_1.findUserById)({ id: userId });
            const subject = 'Car trade team';
            const emailTitle = 'Your Buy Request receive successfully!';
            const emailBody = `<br/>
    We appreciate your patronage and your decision to purchase a vehicle from our website.<br/>
    <br/>
    Thanks again, <b>Your reservation was accepted. To finish the sale, kindly visit our showroom. 
    </b><br/><br/>`;
            const content = (0, emailTemplate_1.default)(emailTitle, result.fullName, emailBody);
            yield (0, helpers_1.sendEmail)(result, subject, content);
        }
        return { status: 200, msg: 'successfully' };
    }
    throw (0, http_errors_1.default)(400, 'car not available to sell');
});
exports.buyCar = buyCar;
//-------------------------------------------------------
const getUserCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = res.locals.user;
    const result = yield (0, services_1.getCarByCustomerId)(userId);
    return {
        status: 200,
        msg: 'successfully',
        data: result,
    };
});
exports.getUserCars = getUserCars;
const addCarImagesController = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = request.body;
    const { id } = request.params;
    yield (0, services_1.addImageService)(images);
    const car = yield (0, services_1.getCarInfo)(id);
    if (!car.length) {
        throw (0, http_errors_1.default)(400, 'car not found to update');
    }
    else if (car[0].state !== 'under-check' && car[0].state !== 'on-market') {
        throw (0, http_errors_1.default)(400, 'car not allowed to update');
    }
    const result = yield (0, services_1.updateCarService)({ state: 'on-market' }, id);
    return { status: 201, msg: 'successfully', data: result };
});
exports.addCarImagesController = addCarImagesController;
//# sourceMappingURL=cars.js.map