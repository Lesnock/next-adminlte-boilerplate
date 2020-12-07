import React, { useEffect, useState } from 'react'

type ProgessProps = {
  percentage: number
}

const Progress = ({ percentage }: ProgessProps) => {
  const [type, setType] = useState('success')

  useEffect(() => {
    if (percentage < 10) {
      setType('danger')
    } else if (percentage < 50) {
      setType('warning')
    } else if (percentage < 80) {
      setType('primary')
    } else {
      setType('success')
    }
  }, [percentage])

  return (
    <div className="progress progress-xs progress-striped active">
      <div
        className={`progress-bar bg-${type}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}

export default Progress
