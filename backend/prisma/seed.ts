import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  await prisma.city.createMany({
    data: [
      { name: 'Berlin', country: 'Germany', population: 3700000 },
      { name: 'Hamburg', country: 'Germany', population: 1800000 },
      { name: 'Munich', country: 'Germany', population: 1500000 },
      { name: 'Cologne', country: 'Germany', population: 1080000 },
      { name: 'Stuttgart', country: 'Germany', population: 630000 },
      { name: 'Leipzig', country: 'Germany', population: 600000 },
      { name: 'Dresden', country: 'Germany', population: 560000 },
      { name: 'Bonn', country: 'Germany', population: 330000 },
    ]
  })
}

main()
  .then(() => {
    console.log('✅ Daten eingefügt')
  })
  .catch(e => {
    console.error('❌ Fehler beim Seeding:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
