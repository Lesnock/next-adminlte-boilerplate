import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

// AdminLTE
import '../../public/adminlte/plugins/fontawesome-free/css/all.min.css'
import '../../public/adminlte/dist/css/adminlte.min.css'

import { AuthProvider } from '../contexts/AuthContext'
import { ConfigProvider } from '../contexts/ConfigContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
