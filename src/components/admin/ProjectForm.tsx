'use client'

import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  SimpleGrid,
  Collapsible,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'

import { Field } from '@/components/ui/field'
import { useState, useTransition } from 'react'
import {
  createProject,
  updateProject,
  createSkill,
  type ProjectFormData,
} from '@/lib/actions/projects'
import { Project, ProjectSkill, Skill } from '@/generated/prisma'
import { Checkbox } from '@/components/ui/checkbox'

type ProjectWithSkills = Project & {
  skills: (ProjectSkill & {
    skill: Skill
  })[]
}

interface ProjectFormProps {
  project?: ProjectWithSkills | null
  skills: Skill[]
  mode: 'create' | 'edit'
}

export function ProjectForm({ project, skills, mode }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [skillsFromProps, setSkillsFromProps] = useState<Skill[]>(skills)
  const [showAddSkill, setShowAddSkill] = useState(false)
  const [newSkillData, setNewSkillData] = useState({
    name: '',
    category: '',
    color: '#000000',
  })
  const [isAddingSkill, setIsAddingSkill] = useState(false)

  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    company: project?.company || '',
    projectUrl: project?.projectUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
    published: project?.published ?? true,
    skillIds: project?.skills.map(s => s.skill.id) || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.longDescription.trim()
    ) {
      setError('Title, description, and long description are required')
      return
    }

    startTransition(async () => {
      try {
        if (mode === 'create') {
          await createProject(formData)
        } else if (project?.id) {
          await updateProject(project.id, formData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    })
  }

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter(id => id !== skillId)
        : [...prev.skillIds, skillId],
    }))
  }

  const handleAddSkill = async () => {
    if (!newSkillData.name.trim() || !newSkillData.category.trim()) {
      setError('Skill name and category are required')
      return
    }

    setIsAddingSkill(true)
    setError(null)

    try {
      const newSkill = await createSkill(
        newSkillData.name,
        newSkillData.category,
        newSkillData.color
      )

      // Add the new skill to the skills list
      setSkillsFromProps(prev => [...prev, newSkill])

      // Select the new skill for this project
      setFormData(prev => ({
        ...prev,
        skillIds: [...prev.skillIds, newSkill.id],
      }))

      // Reset the form
      setNewSkillData({
        name: '',
        category: '',
        color: '#000000',
      })
      setShowAddSkill(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add skill')
    } finally {
      setIsAddingSkill(false)
    }
  }

  return (
    <Container maxW="container.lg" py="8">
      <VStack gap="8" align="stretch">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                ← Back to Projects
              </Button>
            </Link>
            <Heading size="xl">
              {mode === 'create' ? 'Add New Project' : 'Edit Project'}
            </Heading>
          </Flex>
        </Flex>

        <Card.Root>
          <Card.Body p="8">
            <form onSubmit={handleSubmit}>
              <Stack gap="6">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                  <Field label="Title *" required>
                    <Input
                      value={formData.title}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Project title"
                      required
                    />
                  </Field>

                  <Field label="Company">
                    <Input
                      value={formData.company}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Company or organization"
                    />
                  </Field>
                </SimpleGrid>

                <Field label="Short Description *" required>
                  <Textarea
                    value={formData.description}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Brief description of the project"
                    rows={3}
                    required
                  />
                </Field>

                <Field label="Long Description *" required>
                  <Textarea
                    value={formData.longDescription}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        longDescription: e.target.value,
                      }))
                    }
                    placeholder="Detailed description of the project, features, technologies used, etc."
                    rows={8}
                    required
                  />
                </Field>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                  <Field label="Project URL">
                    <Input
                      value={formData.projectUrl}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          projectUrl: e.target.value,
                        }))
                      }
                      placeholder="https://example.com"
                      type="url"
                    />
                  </Field>

                  <Field label="GitHub URL">
                    <Input
                      value={formData.githubUrl}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          githubUrl: e.target.value,
                        }))
                      }
                      placeholder="https://github.com/username/repo"
                      type="url"
                    />
                  </Field>
                </SimpleGrid>

                <Box>
                  <Text>Skills</Text>
                  <Text fontSize="sm" color="fg.muted" mb="3">
                    Select the skills and technologies used in this project
                  </Text>
                  <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap="3">
                    {skillsFromProps.map(skill => (
                      <Checkbox
                        key={skill.id}
                        checked={formData.skillIds.includes(skill.id)}
                        onChange={() => handleSkillToggle(skill.id)}
                      >
                        {skill.name}
                      </Checkbox>
                    ))}
                  </SimpleGrid>

                  <Collapsible.Root
                    open={showAddSkill}
                    onOpenChange={details => setShowAddSkill(details.open)}
                  >
                    <Flex align="center" gap="2" mt="4">
                      <Collapsible.Trigger asChild>
                        <Button variant="outline" size="sm">
                          {showAddSkill ? 'Cancel' : '+ Add New Skill'}
                        </Button>
                      </Collapsible.Trigger>
                    </Flex>

                    <Collapsible.Content>
                      <Card.Root mt="3">
                        <Card.Body p="4">
                          <Stack gap="4">
                            <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                              <Field label="Skill Name">
                                <Input
                                  value={newSkillData.name}
                                  onChange={e =>
                                    setNewSkillData(prev => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  placeholder="e.g., React, Python, AWS"
                                  size="sm"
                                />
                              </Field>

                              <Field label="Category">
                                <select
                                  value={newSkillData.category}
                                  onChange={e =>
                                    setNewSkillData(prev => ({
                                      ...prev,
                                      category: e.target.value,
                                    }))
                                  }
                                  style={{
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '14px',
                                    width: '100%',
                                  }}
                                >
                                  <option value="">Select category</option>
                                  <option value="Frontend">Frontend</option>
                                  <option value="Backend">Backend</option>
                                  <option value="Database">Database</option>
                                  <option value="DevOps">DevOps</option>
                                  <option value="Cloud">Cloud</option>
                                  <option value="Tools">Tools</option>
                                  <option value="Mobile">Mobile</option>
                                  <option value="Other">Other</option>
                                </select>
                              </Field>
                            </SimpleGrid>

                            <Field label="Color">
                              <Input
                                type="color"
                                value={newSkillData.color}
                                onChange={e =>
                                  setNewSkillData(prev => ({
                                    ...prev,
                                    color: e.target.value,
                                  }))
                                }
                                size="sm"
                                w="20"
                              />
                            </Field>

                            <Flex gap="2" justify="flex-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAddSkill(false)}
                                disabled={isAddingSkill}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleAddSkill}
                                loading={isAddingSkill}
                                loadingText="Adding..."
                              >
                                Add Skill
                              </Button>
                            </Flex>
                          </Stack>
                        </Card.Body>
                      </Card.Root>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                  <Checkbox
                    checked={formData.featured}
                    onChange={() => {
                      setFormData(prev => ({
                        ...prev,
                        featured: !prev.featured,
                      }))
                    }}
                  >
                    Featured Project
                  </Checkbox>

                  <Checkbox
                    checked={formData.published}
                    onChange={() => {
                      setFormData(prev => ({
                        ...prev,
                        published: !prev.published,
                      }))
                    }}
                  >
                    Published
                  </Checkbox>
                </SimpleGrid>

                {error && (
                  <Text
                    fontSize="sm"
                    color="red.500"
                    bg="red.50"
                    p="3"
                    rounded="md"
                  >
                    {error}
                  </Text>
                )}

                <Flex gap="4" justify="flex-end">
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isPending}
                    loadingText={
                      mode === 'create' ? 'Creating...' : 'Updating...'
                    }
                  >
                    {mode === 'create' ? 'Create Project' : 'Update Project'}
                  </Button>
                </Flex>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Container>
  )
}
