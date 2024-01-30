import React from 'react'
import SignIn from './pages/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Protected from './components/Protected'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<SignIn />} />
        <Route
          path='/gochat/:userId'
          element={<Protected><Main /></Protected>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App