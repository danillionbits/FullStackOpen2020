import React from 'react'

const Filter = ({ newFilter, handleNewFilter }) => {
  return (
    <div>
      find countries
      <input value={newFilter} onChange={handleNewFilter}/>
    </div>
  )
}

export default Filter