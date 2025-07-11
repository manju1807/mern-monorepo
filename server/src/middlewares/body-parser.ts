import express from 'express';

export const bodyParserMiddleware = express.json({
  limit: '10mb',
});

export const urlencodedMiddleware = express.urlencoded({
  extended: true,
  limit: '10mb',
});
