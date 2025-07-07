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

  // Create sample projects
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with Next.js and Stripe',
      longDescription: `This is a comprehensive e-commerce platform that demonstrates full-stack development capabilities. 
      
The project includes features like product management, shopping cart, payment processing, user authentication, and an admin dashboard.

Key features:
- Responsive design with mobile-first approach
- Real-time inventory management
- Secure payment processing with Stripe
- User authentication and authorization
- Admin dashboard for managing products and orders
- Search and filtering capabilities
- Order tracking and history

Technical highlights:
- Built with Next.js 14 and TypeScript
- Prisma ORM with PostgreSQL database
- Stripe integration for payments
- NextAuth.js for authentication
- Tailwind CSS for styling
- Deployed on Vercel`,
      slug: 'ecommerce-platform',
      company: 'Tech Startup Co.',
      projectUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/ecommerce',
      featured: true,
      published: true,
      sortOrder: 1,
      skills: ['TypeScript', 'React', 'Next.js', 'PostgreSQL', 'Prisma'],
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates',
      longDescription: `A comprehensive task management solution designed for teams and individuals to organize, track, and collaborate on projects effectively.

Core Features:
- Real-time collaboration with WebSocket integration
- Drag-and-drop task organization
- Team management and role-based permissions
- Advanced filtering and search capabilities
- File attachments and comments
- Time tracking and reporting
- Mobile-responsive design

Technical Implementation:
- Frontend: React with TypeScript and Chakra UI
- Backend: Node.js with Express and Socket.io
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT with refresh tokens
- Real-time: WebSocket connections
- File Storage: AWS S3 integration
- Deployment: Docker containers on AWS ECS`,
      slug: 'task-management-app',
      company: 'Productivity Solutions Inc.',
      projectUrl: 'https://taskapp.example.com',
      githubUrl: 'https://github.com/example/taskapp',
      featured: true,
      published: true,
      sortOrder: 2,
      skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
      title: 'Weather Dashboard',
      description:
        'A beautiful weather dashboard with location-based forecasts',
      longDescription: `An intuitive weather dashboard that provides comprehensive weather information with a focus on user experience and visual design.

Features:
- Current weather conditions and 7-day forecasts
- Location-based weather using geolocation API
- Interactive weather maps and radar
- Weather alerts and notifications
- Historical weather data and trends
- Multiple location management
- Dark/light theme support

Technical Stack:
- Frontend: React with TypeScript and styled-components
- Weather API: OpenWeatherMap integration
- Maps: Mapbox GL JS for interactive maps
- State Management: Redux Toolkit
- Testing: Jest and React Testing Library
- Build Tool: Vite for fast development
- Deployment: Netlify with CI/CD`,
      slug: 'weather-dashboard',
      company: 'Personal Project',
      projectUrl: 'https://weather.example.com',
      githubUrl: 'https://github.com/example/weather',
      featured: false,
      published: true,
      sortOrder: 3,
      skills: ['TypeScript', 'React', 'GraphQL'],
    },
  ]

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
