"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../util/verifyToken");
router.post('/signup', auth_controller_1.signup);
router.post('/login', auth_controller_1.login);
// protected routes
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
