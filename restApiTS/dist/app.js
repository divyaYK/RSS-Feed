"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
dotenv_1.default.config();
require("./database");
const auth_1 = __importDefault(require("./routes/auth"));
const papers_1 = __importDefault(require("./routes/papers"));
// settings
app.set('port', 6523);
// middleware
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// routes
app.use('/api/auth', auth_1.default);
app.use('/api/papers', papers_1.default);
app.listen(app.get('port'), () => console.log('Server listening on port ' + app.get('port')));
