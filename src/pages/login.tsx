import router from 'next/router'
import { useState, FormEvent } from 'react'

import { delay } from '../helpers'
import { useAuth } from '../contexts/AuthContext'

import Loading from '../components/Loading'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const makeLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    await delay(500)

    if (login) {
      const isLogged = await login(username, password)

      if (isLogged) {
        return router.push('/')
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/login">
            <div className="image">
              <img src="/images/logo.png" alt="Logo da Metadil" />
            </div>
            <b>Almoxarifado</b>METADIL
          </a>
        </div>
        <div className="card">
          {isLoading && <Loading />}
          <div className="card-body login-card-body">
            <p className="login-box-msg">Faça o login para iniciar a sessão</p>
            <form method="post" onSubmit={makeLogin}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuário"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Lembrar-me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Log In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
