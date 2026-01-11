import express, { Response, Request } from 'express';

import { IdParams } from '../types/common/index.js';
import { prisma } from '../db.js';
import { valideteBoardInput } from './validation/validate-board-input.js';
import { Board } from '../generated/prisma/client.js';
import { CreateBoardRequest } from '../types/cards/create-board.request.js';

export const boardsRouter = express.Router();

boardsRouter.get('/', async (request: Request<{}, {}>, response: Response) => {
  const boards = await prisma.board.findMany();
  response.send(boards);
});

boardsRouter.get(
  '/:id',
  async (request: Request<IdParams, {}>, response: Response<Board>) => {
    const board = await prisma.board.findUnique({
      where: { id: request.params.id },
    });

    if (!board) {
      response.sendStatus(404);
      return;
    }

    response.send(board);
  },
);

boardsRouter.post(
  '/',
  valideteBoardInput,
  async (request: Request<{}, {}, CreateBoardRequest>, response: Response) => {
    const { name, id } = request.body;

    const newboard = await prisma.board.create({
      data: {
        name: name,
        id: id,
      },
    });
    response.send(newboard);
  },
);

boardsRouter.put(
  '/:id',
  valideteBoardInput,
  async (
    request: Request<IdParams, Board, CreateBoardRequest>,
    response: Response<Board>,
  ) => {
    const updatedboard = await prisma.board.update({
      where: {
        id: request.params.id,
      },
      data: {
        name: request.body.name,
      },
    });

    response.send(updatedboard);
  },
);

boardsRouter.delete(
  '/:id',
  async (request: Request<IdParams>, response: Response<void>) => {
    await prisma.board.delete({
      where: {
        id: request.params.id,
      },
    });

    response.sendStatus(204);
  },
);
