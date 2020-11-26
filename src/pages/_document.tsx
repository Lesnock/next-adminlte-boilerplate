import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700"
            rel="stylesheet"
          />
        </Head>
        <body className="hold-transition sidebar-mini">
          <Main />
          <NextScript />

          <script src="/adminlte/plugins/jquery/jquery.min.js"></script>
          <script src="/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="/adminlte/dist/js/adminlte.min.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
