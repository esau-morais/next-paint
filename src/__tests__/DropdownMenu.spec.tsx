import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest' 

import { DropdownMenu } from '../components'

const handler = vi.fn()

const handlers = [
  { handler },
  { handler }
]

const user = userEvent.setup()

describe('DropdownMenu', () => {
  it.only('should display the component closed by default', async () => {
    const { getByRole } = render(<DropdownMenu handlers={handlers} />)

    expect(getByRole('button', {
      expanded: false
    })).toBeInTheDocument()
  })

  it('should render all items once the menu button has been clicked', async () => {
    const { getByTestId, getAllByRole } = render(<DropdownMenu handlers={handlers} />)

    await user.click(getByTestId('dropdown_menu_btn'))

    expect(getAllByRole('menuitem')).toHaveLength(2)
  })
})
