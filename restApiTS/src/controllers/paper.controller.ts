import { Request, Response } from 'express';
import fetch from 'node-fetch';
import XmlParser from 'xml2js';

import Paper, { IPaper } from '../models/Paper';
import {
  paperTitleValidation,
  paperDateValidation,
  paperDateRangeValidation
} from '../util/validationSchema';

export const getAllPapers = async (request: Request, response: Response) => {
  const url: string = 'http://rss.sciencedirect.com/publication/science/00086223';

  let settings = { method: 'Get' };

  await fetch(url, settings)
    .then((res) => res.text())
    .then((xml) => {
      XmlParser.parseStringPromise(xml)
        .then((result) => {
          let requiredJson: Array<any> = result.rss.channel[0].item;
          let length: number = requiredJson.length;
          requiredJson.forEach(async (item, index) => {
            const title: string = item.title[0];

            const paperExists = await Paper.find({ title: title });
            console.log(paperExists.length);
            if (paperExists.length === 0) {
              const link: string = item.link[0];
              const description: string = item.description[0];
              let splitDescription = description
                .trim()
                .split(/<p>|<\/p>/gi)
                .filter(function (element) {
                  return element !== '';
                });
              const publicationDate: Date = new Date(splitDescription[0].split(':')[1]);
              const authors: string[] = splitDescription[2].split(':')[1].split(',');

              const paper: IPaper = new Paper({
                title: title,
                publicationDate: publicationDate,
                authors: authors,
                link: link
              });
              const savedPaper = await paper.save();
              if (index === length - 1) {
                const allPapers = await Paper.find();
                response.status(200).json(allPapers);
              }
            } else {
              try {
                const allPapers = await Paper.find();
                response.status(200).json(allPapers);
              } catch (err) {
                response.status(500).json(err);
              }
            }
          });
        })
        .catch((err) => response.status(500).json({ error: err }));
    });
};

export const getPaperByTitle = async (request: Request, response: Response) => {
  const { error } = paperTitleValidation(request.body);
  if (error) return response.status(400).send(error);
  const title = request.body.title;
  console.log(title);
  let regex = new RegExp(title, 'gi');
  console.log(regex);
  const paper = await Paper.find({ title: regex });
  if (!paper) return response.status(404).json({ message: 'Paper not found' });
  response.status(200).json(paper);
};

export const getPaperByDate = async (request: Request, response: Response) => {
  const { error } = paperDateValidation(request.body);
  if (error) return response.status(400).send(error);
  const date = new Date(request.body.date);
  const papers = await Paper.find({ publicationDate: date });
  if (!papers) return response.status(404).json({ message: 'Paper not found' });
  response.status(200).json(papers);
};

export const getPapersByDateRange = async (request: Request, response: Response) => {
  const { error } = paperDateRangeValidation(request.body);
  if (error) return response.status(400).send(error);
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;
  const papers = await Paper.find({ publicationDate: new Date(startDate) })
    .then((paper) => {
      return Paper.find({ publicationDate: { $gte: startDate, $lt: endDate } }).sort({
        publicationDate: 1
      });
    })
    .catch((err) => {
      response.status(500).json({ message: 'Internal server error' });
    });
  response.status(200).json(papers);
};
