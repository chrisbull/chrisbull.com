import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Simple example component to test
function ExampleComponent({ name }: { name: string }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>This is a test component</p>
    </div>
  )
}

describe('ExampleComponent', () => {
  it('renders the component with correct text', () => {
    render(<ExampleComponent name="World" />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello, World!'
    )
    expect(screen.getByText('This is a test component')).toBeInTheDocument()
  })

  it('renders with different name prop', () => {
    render(<ExampleComponent name="Vitest" />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello, Vitest!'
    )
  })
})

// Example utility function test
function add(a: number, b: number): number {
  return a + b
}

describe('add function', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })
})
