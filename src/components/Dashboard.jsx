import React from 'react'
import{IconNumber,IconFileSignal ,IconWritingSignOff,IconWritingSign,IconAlertTriangle} from "@tabler/icons-react"
import Card from "../components/Card"
import "../dist/DashboardModule.css"

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
        <Card title="Nombre Totale de Clients" classname="client" nbr="50" Icon={IconNumber} Path="/admin/clients"/>
        <Card title="Reservation En Attente" classname="reservation__attente" nbr="230" Icon={IconFileSignal} Path="/admin/reservations"/>
        <Card title="Alerts" classname="alerts" nbr="230" Icon={IconAlertTriangle} Path="/"/>
        <Card title="Reservation Approuvée" classname="reservation__approuvee" nbr="230" Icon={IconWritingSign} Path="/admin/reservations"/>
        <Card title="Reservation Annulée" classname="reservation__annulee" nbr="230" Icon={IconWritingSignOff} Path="/admin/reservations"/>
    </div>
  )
}

export default Dashboard;