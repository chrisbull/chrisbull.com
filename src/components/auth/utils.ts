import { FaGithub, FaGoogle } from 'react-icons/fa'

export const getProviderIcon = (providerId: string) => {
  switch (providerId) {
    case 'github':
      return FaGithub
    case 'google':
      return FaGoogle
    default:
      return null
  }
}

export const getProviderColor = (providerId: string) => {
  switch (providerId) {
    case 'github':
      return 'gray'
    case 'google':
      return 'red'
    default:
      return 'blue'
  }
}
