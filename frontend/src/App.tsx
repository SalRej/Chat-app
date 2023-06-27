import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatRoom from './pages/ChatRoom'
import PrivateLayout from './layouts/PrivateLayout'
import PublicLayout from './layouts/PublicLayout'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>

        <PublicLayout>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </PublicLayout>

        <PrivateLayout>
          <Routes>
            <Route path='/chat' element={<ChatRoom />}></Route>
          </Routes>
        </PrivateLayout>
    </BrowserRouter>
  )
}

export default App
