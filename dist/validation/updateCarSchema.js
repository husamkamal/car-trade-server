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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCarSchema = exports.updateCarSchema = void 0;
const yup = __importStar(require("yup"));
const updateCarSchema = yup.object().shape({
    brand: yup.string().notRequired().label('brand'),
    model: yup.string().notRequired().label('model'),
    price: yup.number().notRequired().label('price'),
    year: yup.number().notRequired().label('year'),
    mileage: yup.number().notRequired().label('mileage'),
    quality: yup.number().notRequired().label('quality'),
    isGoodPrice: yup.boolean().notRequired().label('isGoodPrice'),
    features: yup.array().of(yup.string()).notRequired().label('features'),
    transmission: yup.string().notRequired().label('transmission').oneOf(['automatic', 'manual']),
    description: yup.string().notRequired().label('description'),
    fuel: yup.string().nullable().label('fuel').oneOf(['petrol', 'diesel']),
    state: yup.string().notRequired().label('state').oneOf(['under-check', 'pending', 'on-market', 'sold']),
});
exports.updateCarSchema = updateCarSchema;
const addCarSchema = updateCarSchema.shape({ location: yup.string().required().label('location') });
exports.addCarSchema = addCarSchema;
//# sourceMappingURL=updateCarSchema.js.map