import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicLayout = ({ children }: any): JSX.Element => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/chat" replace={true} />
  }

  return (
        <>{children}</>
  )
}

export default PublicLayout
