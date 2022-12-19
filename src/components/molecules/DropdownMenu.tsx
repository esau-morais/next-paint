'use client'

import { Fragment } from 'react'

import { Item } from '@/lib/types'
import { Menu, Transition } from '@headlessui/react'
import { HamburgerMenuIcon, TrashIcon } from '@radix-ui/react-icons'

const DropdownMenu = ({ handlers }: { handlers: Array<{ [key: string]: () => void }> }) => {
  const ITEMS: Array<Item> = [
    {
      id: 1,
      icon: <TrashIcon />,
      label: 'Reset the canvas',
      handler: handlers[0].clearCanvas
    }
  ]

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent border border-zinc-800 p-2 font-medium text-white hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-800">
          <HamburgerMenuIcon color="black" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {ITEMS.map(item => (
            <Menu.Item key={item.id}>
              <button
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                onClick={item.handler}
              >
                {item ? item.icon : null}
                <span>
                  Reset the canvas 
                </span>
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
