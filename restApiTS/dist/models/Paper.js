"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paperSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    authors: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('Paper', paperSchema);
