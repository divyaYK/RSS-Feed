import JOI from '@hapi/joi';

export const registerValidation = (data: {}) => {
  const schema = JOI.object({
    username: JOI.string().min(6).required(),
    email: JOI.string().min(6).required().email(),
    password: JOI.string().min(6).required()
  });
  return schema.validate(data);
};

export const loginValidation = (data: {}) => {
  const schema = JOI.object({
    email: JOI.string().min(6).required().email(),
    password: JOI.string().min(6).required()
  });
  return schema.validate(data);
};

export const paperTitleValidation = (data: {}) => {
  const schema = JOI.object({
    title: JOI.string().min(6).required()
  });
  return schema.validate(data);
};

export const paperDateValidation = (data: {}) => {
  const schema = JOI.object({
    date: JOI.date().required()
  });
  return schema.validate(data);
};

export const paperDateRangeValidation = (data: {}) => {
  const schema = JOI.object({
    startDate: JOI.date().required(),
    endDate: JOI.date().required()
  });
  return schema.validate(data);
};
