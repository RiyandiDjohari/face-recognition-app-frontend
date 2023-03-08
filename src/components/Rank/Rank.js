import React from 'react'

const Rank = ({user}) => {
  return (
    <div style={{marginTop: "5rem"}}>
      <div className="white f3">{`${user.name}, Your count image is...`}</div>
      <div className="white f3">{user.entries}</div>
    </div>
  )
}

export default Rank
