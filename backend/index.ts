import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client'
import cors from 'cors'



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient()

app.use(cors());

app.get('/', (req, res) => {
  res.send('✅ Backend läuft! Benutze /cities für die API.');
});

app.get('/cities', async (req, res) => {
  const minPopulation = parseInt(req.query.minPopulation as string)

  const cities = await prisma.city.findMany({
    where: isNaN(minPopulation) ? undefined : {
      population: {
        gte: minPopulation
      }
    }
  })

  res.json(cities)
})

app.post('/cities', async (req, res) => {
  const { name, country, population } = req.body
  const newCity = await prisma.city.create({
    data: { name, country, population: Number(population) }
  })
  res.json(newCity)
})

app.put('/cities/:id', async (req, res) => {
  const { id } = req.params
  const { name, country, population } = req.body
  const updated = await prisma.city.update({
    where: { id: Number(id) },
    data: { name, country, population: Number(population) }
  })
  res.json(updated)
})

app.delete('/cities/:id', async (req, res) => {
  const { id } = req.params
  await prisma.city.delete({ where: { id: Number(id) } })
  res.json({ deleted: true })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});