import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { createContext, useState, useContext, useEffect } from 'react'

import api from 'services/api'
import { ReactProps, User } from 'types'

import Loading from 'components/Loading'

interface Auth {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
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
          const { data: me } = await api.get('/users/me')

          if (me) setUser(me)
        } catch (error) {
          logout()
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  /**
   * Make login with username and password
   */
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    if (!username || !password) {
      return false
    }

    let isLogged = false

    // Get token
    try {
      let data: { token?: string } = {}

      try {
        const response = await api.post('/login', { username, password })
        data = response.data
      } catch (error) {
        toast.error(error.message)
      }

      const { token } = data

      if (!token) {
        return false
      }

      Cookies.set('token', token, { expires: 7 })

      // Get user
      try {
        const { data: me } = await api.get('/users/me')

        if (me) {
          setUser(me)
          isLogged = true
        }
      } catch (error) {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

    return isLogged
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
      router.push('/login?redirect=' + router.asPath)
    } else {
      return <>{children}</>
    }
  }

  return <Loading type="" />
}
