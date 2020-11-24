import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { createContext, useState, useContext, useEffect } from 'react'

import api from '../services/api'
import { ReactProps, User } from '../types'

interface Auth {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<Partial<Auth>>({
  isAuthenticated: false,
  isLoading: true,
  user: null
})

export const AuthProvider = ({ children }: ReactProps) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user
  useEffect(() => {
    async function loadUser() {
      const token = Cookies.get('token')
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        // Get user
        try {
          const { data: user } = await api.get('/users/me')

          if (user) setUser(user)
        } catch (error) {
          logout()
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    // Get token
    const { data: token } = await api.post('/login', { email, password })

    if (token) {
      Cookies.set('token', token, { expires: 7 })
      api.defaults.headers.Authorization = `Bearer ${token}`

      // Get user
      try {
        const { data: user } = await api.get('/users/me')

        if (user) setUser(user)
      } catch (error) {
        // console.log('Error on login ' + error.message)
      }
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    delete api.defaults.headers.Authorization

    // Redirect
    window.location.pathname = '/login'
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): Partial<Auth> => {
  return useContext<Partial<Auth>>(AuthContext)
}

export const PrivateRoute = ({ children }: ReactProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  if (!isLoading) {
    if (!isAuthenticated) {
      router.push('/login')
    } else {
      return <>{children}</>
    }
  }

  return <h1>Carregando...</h1>
}
