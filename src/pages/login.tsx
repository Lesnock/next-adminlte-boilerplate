import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'

import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuth()

  const makeLogin = () => {
    if (login) {
      const isLogged = login(username, password)

      if (isLogged) {
        router.push('/')
      }
    }
  }

  return (
    <div>
      <Link href="/">
        <a>Ir para home</a>
      </Link>
      <br />
      Username
      <input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
      />
      Senha
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={makeLogin}>Login</button>
    </div>
  )
}
