"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paperDateRangeValidation = exports.paperDateValidation = exports.paperTitleValidation = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.registerValidation = (data) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(6).required(),
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(6).required()
    });
    return schema.validate(data);
};
exports.loginValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(6).required()
    });
    return schema.validate(data);
};
exports.paperTitleValidation = (data) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(6).required()
    });
    return schema.validate(data);
};
exports.paperDateValidation = (data) => {
    const schema = joi_1.default.object({
        date: joi_1.default.date().required()
    });
    return schema.validate(data);
};
exports.paperDateRangeValidation = (data) => {
    const schema = joi_1.default.object({
        startDate: joi_1.default.date().required(),
        endDate: joi_1.default.date().required()
    });
    return schema.validate(data);
};
