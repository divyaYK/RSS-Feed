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
exports.getPapersByDateRange = exports.getPaperByDate = exports.getPaperByTitle = exports.getAllPapers = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = __importDefault(require("xml2js"));
const Paper_1 = __importDefault(require("../models/Paper"));
const validationSchema_1 = require("../util/validationSchema");
exports.getAllPapers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://rss.sciencedirect.com/publication/science/00086223';
    let settings = { method: 'Get' };
    yield node_fetch_1.default(url, settings)
        .then((res) => res.text())
        .then((xml) => {
        xml2js_1.default.parseStringPromise(xml)
            .then((result) => {
            let requiredJson = result.rss.channel[0].item;
            let length = requiredJson.length;
            requiredJson.forEach((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                const title = item.title[0];
                const paperExists = yield Paper_1.default.find({ title: title });
                console.log(paperExists.length);
                if (paperExists.length === 0) {
                    const link = item.link[0];
                    const description = item.description[0];
                    let splitDescription = description
                        .trim()
                        .split(/<p>|<\/p>/gi)
                        .filter(function (element) {
                        return element !== '';
                    });
                    const publicationDate = new Date(splitDescription[0].split(':')[1]);
                    const authors = splitDescription[2].split(':')[1].split(',');
                    const paper = new Paper_1.default({
                        title: title,
                        publicationDate: publicationDate,
                        authors: authors,
                        link: link
                    });
                    const savedPaper = yield paper.save();
                    if (index === length - 1) {
                        const allPapers = yield Paper_1.default.find();
                        response.status(200).json(allPapers);
                    }
                }
                else {
                    try {
                        const allPapers = yield Paper_1.default.find();
                        response.status(200).json(allPapers);
                    }
                    catch (err) {
                        response.status(500).json(err);
                    }
                }
            }));
        })
            .catch((err) => response.status(500).json({ error: err }));
    });
});
exports.getPaperByTitle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchema_1.paperTitleValidation(request.body);
    if (error)
        return response.status(400).send(error);
    const title = request.body.title;
    console.log(title);
    let regex = new RegExp(title, 'gi');
    console.log(regex);
    const paper = yield Paper_1.default.find({ title: regex });
    if (!paper)
        return response.status(404).json({ message: 'Paper not found' });
    response.status(200).json(paper);
});
exports.getPaperByDate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchema_1.paperDateValidation(request.body);
    if (error)
        return response.status(400).send(error);
    const date = new Date(request.body.date);
    const papers = yield Paper_1.default.find({ publicationDate: date });
    if (!papers)
        return response.status(404).json({ message: 'Paper not found' });
    response.status(200).json(papers);
});
exports.getPapersByDateRange = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchema_1.paperDateRangeValidation(request.body);
    if (error)
        return response.status(400).send(error);
    const startDate = request.body.startDate;
    const endDate = request.body.endDate;
    const papers = yield Paper_1.default.find({ publicationDate: new Date(startDate) })
        .then((paper) => {
        return Paper_1.default.find({ publicationDate: { $gte: startDate, $lt: endDate } }).sort({
            publicationDate: 1
        });
    })
        .catch((err) => {
        response.status(500).json({ message: 'Internal server error' });
    });
    response.status(200).json(papers);
});
