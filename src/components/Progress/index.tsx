import React, { useEffect, useState } from 'react'

type ProgessProps = {
  percentage: number
  type?: string
}

const Progress = ({ percentage, type }: ProgessProps) => {
  const [_type, setType] = useState('success')

  useEffect(() => {
    if (type) {
      setType(type)
    } else if (percentage < 10) {
      setType('danger')
    } else if (percentage < 50) {
      setType('warning')
    } else if (percentage < 80) {
      setType('primary')
    } else {
      setType('success')
    }
  }, [percentage, type])

  return (
    <div
      className="progress progress-xs progress-striped active"
      style={{ minWidth: '200px' }}
    >
      <div
        className={`progress-bar bg-${_type}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}

export default Progress
