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
exports.profile = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const validationSchema_1 = require("../util/validationSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchema_1.registerValidation(req.body);
    if (error)
        return res.status(400).send(error);
    const emailExists = yield User_1.default.findOne({ email: req.body.email });
    if (emailExists)
        return res.status(400).send('Email already exists');
    const user = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.JWT_SECRET || 'jwt secret');
    res.header('Auth_token', token).status(201).json(token);
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchema_1.loginValidation(req.body);
    if (error)
        return res.status(400).send(error);
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ message: 'Email not registered' });
    let correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json({ message: 'Password incorrect' });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET || 'jwt secret', {
        expiresIn: 60 * 60 * 24
    });
    res.header('Auth-token', token).status(200).json(token);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json({ message: 'No user found' });
    res.status(200).json(user);
});
