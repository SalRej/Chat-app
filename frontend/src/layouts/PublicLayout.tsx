import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Loading from '../components/Loading'

const PublicLayout = (): JSX.Element => {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loading />
  }

  if (user) {
    return <Navigate to="/chat"/>
  }

  return (
    <Outlet />
  )
}

export default PublicLayout
