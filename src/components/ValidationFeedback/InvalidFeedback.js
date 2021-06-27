import React from 'react'

export default function InvalidFeedback({ message }) {
    return (
        <div className="invalid-feedback">
            {message}
        </div>
    )
}
