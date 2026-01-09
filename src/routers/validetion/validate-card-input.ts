import { error } from 'node:console';
import { Card, CreateCardRequest } from '../../types/cards';
import { IdParams } from '../../types/common';
import { Response, Request } from 'express';

export const valideteCardInput = (
  { body }: Request<IdParams, Card, CreateCardRequest>,
  responce: Response,
  next: () => void,
): void => {
  if (typeof body !== 'object' || body.text || typeof body.text !== 'string') {
    responce.status(400).send({
      error: 'validetion error',
    });
    return;
  }
  next();
};
