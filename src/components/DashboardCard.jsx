import React from 'react'
import '../styles/dashboard_card.css'

export const DashboardCard = (props) => {
  return (
    <div className="dashboard-card">
      <div className="card-info">
        <p className="heading">{props.heading}</p>
        <p className="body">{props.body}</p>
      </div>
      <img src={props.icon} className="card-icon" alt="logo" />
    </div>
  )
}
