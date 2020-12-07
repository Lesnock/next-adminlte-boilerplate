import { createContext, useContext } from 'react'

import config from 'config/app'
import { ReactProps, Config } from 'types'

const ConfigContext = createContext<Config>(config)

export function ConfigProvider({ children }: ReactProps) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext)
}
