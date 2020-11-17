import '../styles/globals.css'

function App({ Component, pageProps }) {
  console.log(pageProps)
  return <Component {...pageProps} />
}

export default App
