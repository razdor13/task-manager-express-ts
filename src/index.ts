import express, { request, response } from 'express';
import { PORT } from './config.js';
import { cardsRouter } from './routers/cards.router.js';
import { connectDB } from './db.js';

const server = express();

connectDB();
// async function main() {
//   const card = await prisma.card.create({
//     data: {
//       text: '123', // text це String, не число
//     },
//   });
//   console.log(card);
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());

server.get('/', (request, response) => {
  response.send('you are ok');
});

server.use('/cards', cardsRouter);
console.log(PORT);
server.listen(PORT);
