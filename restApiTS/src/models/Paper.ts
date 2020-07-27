import { Schema, model, Document } from 'mongoose';

export interface IPaper extends Document {
  title: string;
  publicationDate: Date;
  authors: string[];
  link: string;
}

const paperSchema = new Schema({
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

export default model<IPaper>('Paper', paperSchema);
