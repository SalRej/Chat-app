import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import PrivateLayout from './layouts/PrivateLayout'
import PublicLayout from './layouts/PublicLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Chat from './pages/Chat'
const queryClient = new QueryClient()

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<PublicLayout />}>
              <Route path='/' element={<Login />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
          </Route>

          <Route element={<PrivateLayout />}>
            <Route path='/todo' element={<Todos />}></Route>
            <Route path='/chat' element={<Chat />}></Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
