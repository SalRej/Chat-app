import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicLayout = (): JSX.Element => {
  const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to='/chat'/>
  }
  return (
    <Outlet />
  )
}

export default PublicLayout
