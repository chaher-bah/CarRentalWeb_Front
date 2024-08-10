import React, { useState, useEffect } from 'react';
import { IconNumber, IconFileSignal, IconAlertTriangle, IconWritingSign, IconWritingSignOff ,IconRosetteFilled,IconRosette} from "@tabler/icons-react";
import { getDaysDiff } from './Cars';
import Card from "../components/Card";
import "../dist/DashboardModule.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import{BASE_URL} from '../Const/API_url.js'


const Dashboard = () => {
  const [data, setData] = useState({
    nbrClients: 0,
    nbrReservations: 0,
    nbrReservationsAcc: 0,
    nbrReservationsRef: 0,
  });

  const [alerts, setAlerts] = useState({
    assuranceExp: [],
    vigExp: [],
    visiteExp: [],
  });

  const navigate = useNavigate();

  const loadStat = async () => {
    try {
      const result = await axios.get(BASE_URL+'dash');
      setData(result.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const loadCars = async () => {
    try {
      const response = await axios.get(BASE_URL+"admin/cars");
      const cars = response.data;

      const assuranceExp = [];
      const vigExp = [];
      const visiteExp = [];

      cars.forEach(car => {
        if (getDaysDiff(car.dateExpAssurance) <= 0) {
          assuranceExp.push(`${car.marque}-${car.modele} [ID: ${car.id}]`);
        }
        if (getDaysDiff(car.dateExpVignette) <= 0) {
          vigExp.push(`${car.marque}-${car.modele} [ID: ${car.id}]`);
        }
        if (getDaysDiff(car.dateExpVisite) <= 0) {
          visiteExp.push(`${car.marque}-${car.modele} [ID: ${car.id}]`);
        }
      });

      setAlerts({
        assuranceExp,
        vigExp,
        visiteExp,
      });
    } catch (error) {
      console.error('Failed to load cars:', error);
    }
  };

  useEffect(() => {
    loadStat();
    loadCars();
  }, []);

  return (
    <div className='dashboard-container'>
      <Card title="Nombre Totale de Clients" classname="client" nbr={data.nbrClients} Icon={IconNumber} Path="/admin/clients" />
      <Card title="Reservation En Attente" classname="reservation__attente" nbr={data.nbrReservations} Icon={IconFileSignal} Path="/admin/reservations" />
      <div className='card'> 
        <div className={`alerts-container`} onClick={() => navigate("/admin/cars")} style={{ cursor: 'pointer', transition: 'all 0.5s ease' }}>
          <div className={`alerts-card `}>
            <div className={`alerts-content `}>
              <div className='content'>
                <div className='content_a'>
                  <IconAlertTriangle className="icon"/>
                  <h3>Alerts</h3>
                </div>
                <p>{alerts.assuranceExp.length + alerts.vigExp.length + alerts.visiteExp.length}</p>
              </div>
              <div className='alerts_list'>
              <ul>
                <li><IconRosetteFilled/>Assurances en retard: {alerts.assuranceExp.length}</li>
                <ul>
                  {alerts.assuranceExp.map((car, index) => (
                    <li key={index}>&nbsp;<IconRosette/>&nbsp;{car}</li>
                  ))}
                </ul>
                <li><IconRosetteFilled/>Vignettes en retard: {alerts.vigExp.length}</li>
                <ul>
                  {alerts.vigExp.map((car, index) => (
                    <li key={index}>&nbsp;<IconRosette/>&nbsp;{car}</li>
                  ))}
                </ul>
                <li><IconRosetteFilled/>Visites en retard: {alerts.visiteExp.length}</li>
                <ul>
                  {alerts.visiteExp.map((car, index) => (
                    <li key={index}>&nbsp;<IconRosette/>&nbsp;{car}</li>
                  ))}
                </ul>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card title="Reservation Approuvée" classname="reservation__approuvee" nbr={data.nbrReservationsAcc} Icon={IconWritingSign} Path="/admin/reservations"/>
      <Card title="Reservation Annulée" classname="reservation__annulee" nbr={data.nbrReservationsRef} Icon={IconWritingSignOff} Path="/admin/reservations"/>
    </div>
  );
};

export default Dashboard;
