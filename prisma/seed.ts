import { PrismaClient } from '@/generated/prisma'
import { hashPassword } from '@/lib/password'

const prisma = new PrismaClient()

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admin.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

async function main() {
  // Create admin user
  const adminPassword = await hashPassword(ADMIN_PASSWORD)
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      password: adminPassword,
      name: 'Admin User',
    },
  })

  // Create sample skills
  const skills = [
    { name: 'TypeScript', category: 'Frontend', color: '#3178C6' },
    { name: 'React', category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', category: 'Frontend', color: '#000000' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'PostgreSQL', category: 'Database', color: '#336791' },
    { name: 'Prisma', category: 'Database', color: '#2D3748' },
    { name: 'GraphQL', category: 'Backend', color: '#E10098' },
    { name: 'Docker', category: 'DevOps', color: '#2496ED' },
    { name: 'AWS', category: 'Cloud', color: '#FF9900' },
    { name: 'Chakra UI', category: 'Frontend', color: '#319795' },
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: { ...skill },
      create: { ...skill },
    })
  }

  // Create sample project
  const project = await prisma.project.upsert({
    where: { slug: 'sample-project' },
    update: {},
    create: {
      title: 'Sample E-commerce Platform',
      description: 'A modern e-commerce platform built with Next.js and Stripe',
      longDescription: `
        This is a comprehensive e-commerce platform that demonstrates full-stack development capabilities. 
        The project includes features like product management, shopping cart, payment processing, 
        user authentication, and an admin dashboard.
        
        Key features:
        - Responsive design with mobile-first approach
        - Real-time inventory management
        - Secure payment processing with Stripe
        - User authentication and authorization
        - Admin dashboard for managing products and orders
        - Search and filtering capabilities
        - Order tracking and history
      `,
      slug: 'sample-project',
      company: 'Tech Startup Co.',
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project',
      featured: true,
      published: true,
      sortOrder: 1,
      authorId: admin.id,
    },
  })

  // Add skills to the project
  const projectSkills = [
    'TypeScript',
    'React',
    'Next.js',
    'PostgreSQL',
    'Prisma',
  ]
  for (const skillName of projectSkills) {
    const skill = await prisma.skill.findUnique({
      where: { name: skillName },
    })
    if (skill) {
      await prisma.projectSkill.upsert({
        where: {
          projectId_skillId: {
            projectId: project.id,
            skillId: skill.id,
          },
        },
        update: {},
        create: {
          projectId: project.id,
          skillId: skill.id,
        },
      })
    }
  }

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
