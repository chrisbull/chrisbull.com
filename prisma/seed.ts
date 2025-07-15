import { PrismaClient } from '@/generated/prisma'
import { hashPassword } from '@/lib/password'

import { projects } from './projects'

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

  for (const projectData of projects) {
    const { skills: skillNames, ...projectInfo } = projectData

    const project = await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {},
      create: {
        ...projectInfo,
        authorId: admin.id,
      },
    })

    // Add skills to the project
    for (const skillName of skillNames) {
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

    // Add sample images for each project
    const imageUrls = [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
    ]

    await prisma.projectImage.upsert({
      where: { id: `${project.id}-primary` },
      update: {},
      create: {
        id: `${project.id}-primary`,
        projectId: project.id,
        url: imageUrls[projects.indexOf(projectData) % imageUrls.length],
        alt: `${project.title} - Main Image`,
        caption: `Main screenshot of ${project.title}`,
        sortOrder: 0,
      },
    })
  }

  console.log('Database seeded successfully!')
  console.log(`Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  console.log(`Created ${projects.length} sample projects with images`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
