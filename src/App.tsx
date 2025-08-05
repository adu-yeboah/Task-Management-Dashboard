import { RouterProvider } from 'react-router'
import { createRouter } from './routes/route'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

function App() {
  const router = createRouter()
  const queryClient = new QueryClient()

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <RouterProvider router={router} />
          
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
