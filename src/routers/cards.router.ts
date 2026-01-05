import express, { Response, Request } from 'express';
import {
  Card,
  CreateCardRequest,
  GetCardsResponce,
} from '../types/cards/index.js';
import { IdParams } from '../types/common/index.js';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  (request: Request<{}, {}>, response: Response<GetCardsResponce>) => {
    //todo return cards
  },
);
cardsRouter.get(
  '/:id',
  (request: Request<IdParams, {}>, response: Response<Card>) => {
    //todo return card
    request.params.id;
  },
);
cardsRouter.post(
  '/:id',
  (request: Request<{}, CreateCardRequest>, response: Response<Card>) => {
    //todo create card
  },
);
cardsRouter.put(
  '/:id',
  (request: Request<IdParams, Card>, response: Response<Card>) => {
    //todo update card
  },
);

cardsRouter.delete(
  '/:id',
  (request: Request<IdParams>, response: Response<void>) => {
    //todo delete card
  },
);
