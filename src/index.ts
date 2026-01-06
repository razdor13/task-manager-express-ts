import express, { request, response } from 'express';
import { PORT } from './config.js';
import { cardsRouter } from './routers/cards.router.js';
import { connectDB } from './db.js';

const server = express();

async function run() {
  await connectDB();

  server.get('/', (req, res) => {
    res.send('you are ok');
  });
  server.use(express.json());
  server.use('/cards', cardsRouter);
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
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
