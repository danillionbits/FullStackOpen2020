import React from 'react'

const Filter = ({ persons, filter, handleNewFilter }) => {
  return (
    <div>
      filter shown with: 
      <input value={filter} onChange={handleNewFilter} />
    </div>
  )
}

export default Filter