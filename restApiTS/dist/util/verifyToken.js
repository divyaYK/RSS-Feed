"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidation = (req, res, next) => {
    const token = req.header('Auth-token');
    if (!token)
        return res.status(401).json({ message: 'Access Denied' });
    const payload = jsonwebtoken_1.default.verify(JSON.parse(token), process.env.JWT_SECRET || 'jwt secret');
    req.userId = payload._id;
    next();
};
