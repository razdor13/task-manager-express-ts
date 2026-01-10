import express, { Response, Request } from 'express';
import {
  Card,
  CreateCardRequest,
  GetCardsResponce,
} from '../types/cards/index.js';
import { IdParams } from '../types/common/index.js';
import { prisma } from '../db.js';
import { valideteCardInput } from './validetion/validate-card-input.js';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  async (request: Request<{}, {}>, response: Response<GetCardsResponce>) => {
    const cards = await prisma.card.findMany();
    response.send(cards);
  },
);

cardsRouter.get(
  '/:id',
  async (request: Request<IdParams, {}>, response: Response<Card>) => {
    const card = await prisma.card.findUnique({
      where: { id: request.params.id },
    });

    if (!card) {
      response.sendStatus(404);
      return;
    }

    response.send(card);
  },
);

cardsRouter.post(
  '/',
  valideteCardInput,
  async (request: Request<{}, {}, CreateCardRequest>, response: Response) => {
    const { text, column_id } = request.body;

    const newCard = await prisma.card.create({
      data: {
        text: text,
        column_id: column_id,
      },
    });
    response.send(newCard);
  },
);

cardsRouter.put(
  '/:id',
  valideteCardInput,
  async (
    request: Request<IdParams, Card, CreateCardRequest>,
    response: Response<Card>,
  ) => {
    const updatedCard = await prisma.card.update({
      where: {
        id: request.params.id,
      },
      data: {
        text: request.body.text,
      },
    });

    response.send(updatedCard);
  },
);

cardsRouter.delete(
  '/:id',
  async (request: Request<IdParams>, response: Response<void>) => {
    await prisma.card.delete({
      where: {
        id: request.params.id,
      },
    });

    response.sendStatus(204);
  },
);
