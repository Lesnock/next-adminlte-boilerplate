import React from 'react'

type Props = {
  message: string | string[]
  type?: string
  closable?: boolean
}

const Alert = ({ message, type = 'danger', closable = true }: Props) => {
  return (
    <div className="alert-container">
      <div
        className={`alert alert-${type} show fade alert-dismissible`}
        role="alert"
      >
        {/* Message is array */}
        {Array.isArray(message) && (
          <ul>
            {message.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}

        {/* Message is string */}
        {typeof message === 'string' && message}

        {closable && (
          <button
            type="button"
            className="btn close"
            data-dismiss="alert"
            data-card-widget="remove"
          >
            <i className="fas fa-times fa-xs"></i>
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
