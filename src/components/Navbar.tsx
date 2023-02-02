import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const {data: session} = useSession();

  return (
    <Popover className="relative bg-purple-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
              <span className="sr-only">KeyLive</span>
              <h1 className='text-3xl text-indigo-600 font-semibold'>KeyLive</h1>
              </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">

            <a href="pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Pricing
            </a>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Docs
            </a>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <a href="#" 
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            onClick={session ? () => window.location.href = "/dashboard" : () => void signIn()}>
              {session?.user ? session.user.name : "Sign In"}
            </a>
            <a
              href="#"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              onClick={session ? () => void signOut() : () => void signIn()}
            >
              {!session ? "Sign up" : "Logout"}
            </a>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
      </Transition>
    </Popover>
  )
}


module.exports = Navbar;