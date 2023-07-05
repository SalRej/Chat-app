import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

const PrivateLayout = (): JSX.Element => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to='/'/>
  }
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  )
}
export default PrivateLayout
