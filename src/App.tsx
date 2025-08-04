import { RouterProvider } from 'react-router'
import { createRouter } from './routes/route'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const router = createRouter()
  const queryClient = new QueryClient()

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />;
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
