import React, { PropsWithChildren, useContext } from 'react'
import { LuKanbanSquare, LuKanbanSquareDashed, LuLogOut } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'
import { TbLayoutDashboard } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
import { UserLabel } from '@/components/shared/UserLabel.tsx'
import { Button } from '@/components/ui/button.tsx'
import { AuthenticationContext } from '@/auth/AuthenticationContext.tsx'

const Logo = () => {
  return (
    <NavLink to={'/'}>
      <div className={'text-xl flex items-center flex-row gap-2 font-bold'}>
        <LuKanbanSquare className={'text-4xl'} />
        <h4>Task Management</h4>
      </div>
    </NavLink>
  )
}

export const Toolbar: React.FC = () => {
  const { isAuthenticated } = useContext(AuthenticationContext)

  return (
    <div
      className={
        'w-full border-b px-2 sm:px-4 md:px-8 lg:px-16 xl:px-20 py-4 bg-white flex '
      }
    >
      <Logo />

      {isAuthenticated && (
        <div className={'flex flex-row gap-4 items-center ml-12'}>
          <NavigationItem to={'/'}>
            <TbLayoutDashboard className={'size-5'} />
            Dashboard
          </NavigationItem>

          <NavigationItem to={'/board'}>
            <LuKanbanSquareDashed className={'size-5'} />
            Board
          </NavigationItem>
        </div>
      )}

      <CurrentUser />
    </div>
  )
}

type NavigationItemProps = PropsWithChildren & {
  to: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        twMerge(
          'flex flex-row gap-2 items-center pl-4 pr-6 py-1.5 rounded-lg',
          isActive ? 'bg-primary text-primary-foreground' : ''
        )
      }
    >
      {children}
    </NavLink>
  )
}

const CurrentUser = () => {
  const { user, logout } = useContext(AuthenticationContext)

  if (!user) {
    return <></>
  }

  return (
    <div className={'flex flex-row gap-2 ml-auto'}>
      <UserLabel user={user} showPosition={true} />
      <Button size={'sm'} variant={'outline'} onClick={() => logout()}>
        Logout
        <LuLogOut className={'ml-2'} />
      </Button>
    </div>
  )
}
