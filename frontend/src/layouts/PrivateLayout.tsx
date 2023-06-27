import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateLayout = ({ children }: any): JSX.Element => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <>{children}</>
  )
}

export default PrivateLayout
