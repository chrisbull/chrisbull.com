import { ProjectForm } from '@/components/admin/ProjectForm'
import { getAllSkills } from '@/lib/actions/projects'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin')
  }

  const skills = await getAllSkills()

  return <ProjectForm skills={skills} mode="create" />
}
