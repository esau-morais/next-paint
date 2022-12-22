import { Item } from '@/lib/types'
import { Menu } from '@headlessui/react'

const MenuItem = ({ handler, icon, label }: Item) => {
  return (
    <div className="px-1 py-1">
      <Menu.Item>
        <button
          className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
          onClick={handler}
        >
          {icon ? icon : null}
          <span>
            {label}
          </span>
        </button>
      </Menu.Item>
    </div>
  )
}

export default MenuItem
