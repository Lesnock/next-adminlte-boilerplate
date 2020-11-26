import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import Loading from '../../components/Loading'

export default function Logout() {
  const { logout } = useAuth()

  useEffect(() => {
    if (logout) {
      logout()
    }
  })

  return <Loading />
}
