'use server'

import { prisma } from '@/lib/prisma'

export async function getPublishedProjects() {
  return await prisma.project.findMany({
    where: {
      published: true,
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      images: true,
    },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })
}

export async function getFeaturedProjects(limit: number = 6) {
  return await prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  })
}
