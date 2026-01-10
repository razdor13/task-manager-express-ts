import { Card } from '../../generated/prisma/client';

export type CreateCardRequest = Pick<Card, 'text' | 'column_id'>;
