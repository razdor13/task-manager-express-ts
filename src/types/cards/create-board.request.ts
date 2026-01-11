import { Board } from '../../generated/prisma/client';

export type CreateBoardRequest = Pick<Board, 'name' | 'id'>;
