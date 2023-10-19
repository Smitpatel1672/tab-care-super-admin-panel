import React from 'react'
import '../styles/dashboard.css'
import {SearchComponent} from '../components/SearchComponent'
import {Navbar} from '../components/Navbar'
import {DashboardCard} from '../components/DashboardCard'
import rupeeIcon from '../assets/svg/rupee.svg'

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar/>
      <div className="dashboard-body">
        <SearchComponent/>
        <h1>Good morning, Natasha!</h1>
        <p>Here’s whats happening in your store today</p>
        <div className="dashboard-cards">
          <DashboardCard heading="Total Earnings" body="Rs.50,000" icon={rupeeIcon}/>
          <DashboardCard heading="Total Earnings" body="Rs.50,000" icon={rupeeIcon}/>
          <DashboardCard heading="Total Earnings" body="Rs.50,000" icon={rupeeIcon}/>
          <DashboardCard heading="Total Earnings" body="Rs.50,000" icon={rupeeIcon}/>
          <DashboardCard heading="Total Earnings" body="Rs.50,000" icon={rupeeIcon}/>
        </div>
      </div>
    </div>
  )
}
