import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import PrivateLayout from './layouts/PrivateLayout'
import PublicLayout from './layouts/PublicLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Chat from './pages/Chat'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { CssBaseline } from '@mui/material'
import Profile from './pages/Profile'
import ChatRoom from './components/Chat/ChatRoom'
const queryClient = new QueryClient()

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<PublicLayout />}>
                <Route path='/' element={<Login />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Route>

            <Route element={<PrivateLayout />}>
              <Route path='/todo' element={<Todos />}></Route>
              <Route path='/chat' element={<Chat />}>
                <Route path='member' element={<ChatRoom />}></Route>
              </Route>
              <Route path='/profile' element={<Profile />}></Route>
            </Route>
          </Routes>
          <CssBaseline />
          <ToastContainer />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
