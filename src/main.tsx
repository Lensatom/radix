import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MetaMaskProvider } from '@metamask/sdk-react'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaMaskProvider
    debug={false}
    sdkOptions={{
      dappMetadata: {
        name: "Radix",
        url: window.location.href,
      },
      infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
    }}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </MetaMaskProvider>
  </React.StrictMode>,
)