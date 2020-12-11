import { useState, useCallback } from 'react'

function useUpdate() {
  const [, setTick] = useState(0)

  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])

  return update
}

export default useUpdate
