import { render, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Canvas } from '@/components'
import { useWindowSize } from '@/hooks/windowSize'

const onMouseDown = vi.fn()

describe('Canvas', () => {
  it('should render canvas element and its correct size correctly', () => {
    const { result } = renderHook(() => useWindowSize())
    const { getByTestId } = render(<Canvas onMouseDown={onMouseDown} />)

    expect(getByTestId('canvas')).toBeInTheDocument()
    expect(getByTestId('canvas')).toHaveAttribute('width', result.current.width.toString())
    expect(getByTestId('canvas')).toHaveAttribute('height', result.current.height.toString())
  })
})
