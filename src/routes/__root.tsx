import { useEffect } from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useEffect(() => {
    const splash = document.getElementById('splashscreen')
    if (splash) {
      splash.style.opacity = '0'
      setTimeout(() => {
        splash.remove()
      }, 500)
    }
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}
