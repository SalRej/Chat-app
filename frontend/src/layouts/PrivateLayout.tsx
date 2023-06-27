import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateLayout = (): JSX.Element => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to='/'/>
  }
  return (
    <Outlet />
  )
}
export default PrivateLayout
