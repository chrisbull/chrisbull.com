import { Provider } from '@/components/ui/provider'
import { SessionProvider } from '@/components/providers/SessionProvider'

export function AppProvider(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider>{props.children}</Provider>
    </SessionProvider>
  )
}
