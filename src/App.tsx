import { RouterProvider } from 'react-router'
import './App.css'
import { createRouter } from './routes/route'

function App() {
  const router = createRouter()
  return (
    <>
      <RouterProvider router={router} />;
    </>
  )
}

export default App
