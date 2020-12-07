import Head from 'next/head'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

// import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/globals.css'

// AdminLTE
import '../../public/adminlte/plugins/fontawesome-free/css/all.min.css'
import '../../public/adminlte/dist/css/adminlte.min.css'
import '../../public/adminlte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'

import { AuthProvider } from '../contexts/AuthContext'
import { ConfigProvider } from '../contexts/ConfigContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Almoxarifado - Metadil</title>
      </Head>

      <ConfigProvider>
        <AuthProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </AuthProvider>
      </ConfigProvider>
    </>
  )
}

export default App
