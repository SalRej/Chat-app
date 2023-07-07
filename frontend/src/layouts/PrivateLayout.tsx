import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Loading from '../components/Loading'

const PrivateLayout = (): JSX.Element => {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/login"/>
  }

  return (
    <Outlet />
  )
}

export default PrivateLayout
