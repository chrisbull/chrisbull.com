import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/password'

const prisma = new PrismaClient()

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

async function main() {
  // Create admin user
  const adminPassword = await hashPassword(ADMIN_PASSWORD)
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      password: adminPassword,
      name: 'Admin User',
    },
  })

  console.log('Database seeded successfully!')
  console.log(`Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
