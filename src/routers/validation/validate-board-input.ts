import { IdParams } from '../../types/common';
import { Response, Request } from 'express';
import { Board } from '../../generated/prisma/client';
import { CreateBoardRequest } from '../../types/cards/create-board.request';

export const valideteBoardInput = (
  { body }: Request<IdParams, Board, CreateBoardRequest>,
  responce: Response,
  next: () => void,
): void => {
  if (typeof body !== 'object' || body.name || typeof body.name !== 'string') {
    responce.status(400).send({
      error: 'validetion error',
    });
    return;
  }
  next();
};
