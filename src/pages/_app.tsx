import { AppProps } from 'next/app'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '../contexts/AuthContext'

function App({ Component, pageProps }: AppProps) {
  console.log('rodou app')
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
