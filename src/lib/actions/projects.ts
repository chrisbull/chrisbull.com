'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export type ProjectFormData = {
  title: string
  description: string
  longDescription: string
  company?: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  published: boolean
  skillIds: string[]
}

async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/admin')
  }
  return session.user.id
}

export async function createProject(data: ProjectFormData) {
  const userId = await requireAuth()

  try {
    // Validate that all skillIds exist in the database
    if (data.skillIds.length > 0) {
      const validSkills = await prisma.skill.findMany({
        where: {
          id: { in: data.skillIds },
        },
        select: { id: true },
      })

      if (validSkills.length !== data.skillIds.length) {
        throw new Error(
          'One or more selected skills are invalid. Please refresh the page and try again.'
        )
      }
    }

    // Generate slug from title
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    })

    // If slug exists, append a number
    if (existingProject) {
      let counter = 1
      let newSlug = `${slug}-${counter}`
      while (true) {
        const slugExists = await prisma.project.findUnique({
          where: { slug: newSlug },
        })
        if (!slugExists) {
          slug = newSlug
          break
        }
        counter++
        newSlug = `${slug}-${counter}`
      }
    }

    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        slug,
        company: data.company || null,
        projectUrl: data.projectUrl || null,
        githubUrl: data.githubUrl || null,
        featured: data.featured,
        published: data.published,
        authorId: userId,
        ...(data.skillIds.length > 0 && {
          skills: {
            create: data.skillIds.map(skillId => ({
              skillId,
            })),
          },
        }),
      },
    })

    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
  } catch (error) {
    // Don't catch redirect errors - let them propagate
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error
    }

    console.error('Error creating project:', error)

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        throw new Error(
          'A project with this title already exists. Please use a different title.'
        )
      }
      if (error.message.includes('Foreign key constraint')) {
        if (error.message.includes('projects_authorId_fkey')) {
          throw new Error(
            'Authentication error: User not found in database. Please sign out and sign in again.'
          )
        }
        throw new Error(
          'Invalid skill selected. Please refresh the page and try again.'
        )
      }
    }

    // More detailed error message for debugging
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Failed to create project: ${errorMessage}`)
  }
}

export async function updateProject(id: string, data: ProjectFormData) {
  await requireAuth()

  try {
    // Get the current project to check if title changed
    const currentProject = await prisma.project.findUnique({
      where: { id },
      select: { title: true, slug: true },
    })

    if (!currentProject) {
      throw new Error('Project not found')
    }

    // Validate that all skillIds exist in the database
    if (data.skillIds.length > 0) {
      const validSkills = await prisma.skill.findMany({
        where: {
          id: { in: data.skillIds },
        },
        select: { id: true },
      })

      if (validSkills.length !== data.skillIds.length) {
        throw new Error(
          'One or more selected skills are invalid. Please refresh the page and try again.'
        )
      }
    }

    // Generate slug from title only if title changed
    let slug = currentProject.slug
    if (currentProject.title !== data.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      // Check if slug already exists for another project
      const existingProject = await prisma.project.findFirst({
        where: {
          slug,
          id: { not: id }, // Exclude current project
        },
      })

      // If slug exists, append a number
      if (existingProject) {
        let counter = 1
        let newSlug = `${slug}-${counter}`
        while (true) {
          const slugExists = await prisma.project.findFirst({
            where: {
              slug: newSlug,
              id: { not: id },
            },
          })
          if (!slugExists) {
            slug = newSlug
            break
          }
          counter++
          newSlug = `${slug}-${counter}`
        }
      }
    }

    // First, delete existing skill relationships
    await prisma.projectSkill.deleteMany({
      where: { projectId: id },
    })

    // Then update the project with new data
    await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        slug,
        company: data.company || null,
        projectUrl: data.projectUrl || null,
        githubUrl: data.githubUrl || null,
        featured: data.featured,
        published: data.published,
        skills: {
          create: data.skillIds.map(skillId => ({
            skillId,
          })),
        },
      },
    })

    revalidatePath('/admin/dashboard')
  } catch (error) {
    console.error('Error updating project:', error)

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        throw new Error(
          'A project with this title already exists. Please use a different title.'
        )
      }
      if (error.message.includes('Project not found')) {
        throw new Error('Project not found. It may have been deleted.')
      }
      if (error.message.includes('Foreign key constraint')) {
        if (error.message.includes('projects_authorId_fkey')) {
          throw new Error(
            'Authentication error: User not found in database. Please sign out and sign in again.'
          )
        }
        throw new Error(
          'Invalid skill selected. Please refresh the page and try again.'
        )
      }
      if (error.message.includes('One or more selected skills are invalid')) {
        throw error // Re-throw the specific validation error
      }
    }

    // More detailed error message for debugging
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Failed to update project: ${errorMessage}`)
  }
}

export async function deleteProject(id: string) {
  await requireAuth()

  try {
    await prisma.project.delete({
      where: { id },
    })

    revalidatePath('/admin/dashboard')
  } catch (error) {
    console.error('Error deleting project:', error)
    throw new Error('Failed to delete project')
  }
}

export async function getProject(id: string) {
  await requireAuth()

  return await prisma.project.findUnique({
    where: { id },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  })
}

export async function getAllSkills() {
  await requireAuth()

  return await prisma.skill.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}

export async function createSkill(
  name: string,
  category: string,
  color?: string
) {
  await requireAuth()

  try {
    const skill = await prisma.skill.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        color: color || '#000000',
      },
    })

    revalidatePath('/admin/dashboard')
    return skill
  } catch (error) {
    console.error('Error creating skill:', error)

    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        throw new Error('A skill with this name already exists.')
      }
    }

    throw new Error('Failed to create skill. Please try again.')
  }
}
