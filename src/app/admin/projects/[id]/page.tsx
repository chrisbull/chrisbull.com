import { ProjectForm } from '@/components/admin/ProjectForm'
import { getProject, getAllSkills } from '@/lib/actions/projects'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'

interface EditProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin')
  }

  const { id } = await params
  const [project, skills] = await Promise.all([getProject(id), getAllSkills()])

  if (!project) {
    notFound()
  }

  return <ProjectForm project={project} skills={skills} mode="edit" />
}
