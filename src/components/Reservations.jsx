import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoTable from './InfoTable';
import { IconFileSignal, IconWritingSignOff, IconWritingSign } from "@tabler/icons-react";
import "../dist/ReservationModule.css";

const Reservation = () => {
  const [expanded, setExpanded] = useState(null); // State to manage expanded dropdown
  const [reservations, setReservations] = useState([]);
  const [resNumber, setResNumber] = useState([]); // State for reservation numbers

  // Function to load reservations from the API
  const loadReservations = async () => {
    try {
      const response = await axios.get("http://localhost:2020/locationvoiture/v1/reservation");
      const data = response.data;
      const statusCounts = data.reduce((acc, reservation) => {
        const status = reservation.reservationStatus;
        if (!acc[status]) {
          acc[status] = 0;
        }
        acc[status]++;
        return acc;
      }, {});

      const resNumberData = Object.keys(statusCounts).map(status => ({
        status,
        nbr: statusCounts[status]
      }));

      setReservations(data);
      setResNumber(resNumberData);
    } catch (error) {
      console.error("Failed to load reservations:", error);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  // Dropdown handling
  const handleToggle = (index) => {
    if (expanded === index) {
      setExpanded(null); // Collapse if already expanded
    } else {
      setExpanded(index); // Expand if not expanded
    }
  };

  // const handleOperation = (id) => {
  //   alert(`Performing operation on item with ID: ${id}`);
  // };

  const getOperationText = (status) => {
    switch (status) {
      case 'EN_COUR':
        return 'Approuver';
      case 'ACCEPTEE':
        return 'Annuler';
      case 'REFUSEE':
        return 'Approuver';
      default:
        return 'Operation';
    }
  };

  const getOperationIcon = (status) => {
    switch (status) {
      case 'EN_COUR':
        return <IconFileSignal />;
      case 'ACCEPTEE':
        return <IconWritingSign />;
      case 'REFUSEE':
        return <IconWritingSignOff />;
      default:
        return '';
    }
  };

  const getResNum = (status) => {
    const res = resNumber.find((section) => section.status === status);
    return <p>{res ? res.nbr : ''}</p>;
  };
  // Function to handle the PATCH request
  const handleOperation = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:2020/locationvoiture/v1/reservation/status/${id}`, { status: newStatus });
      if (response.status === 200) {
        loadReservations(); // Reload reservations to reflect changes
      }
    } catch (error) {
      alert(`Failed to update reservation status for ID: ${id}`);
      console.error(`Failed to update reservation status for ID: ${id}`, error);
    }
  };

  // Group reservations by status
  const groupedReservations = reservations.reduce((acc, reservation) => {
    const status = reservation.reservationStatus;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(reservation);
    return acc;
  }, {}); 

  return (
    <div className="reservation-container">
      {Object.keys(groupedReservations).length>0?(
      Object.keys(groupedReservations).map((status, index) => (
        <div key={index} className={`reservation-section__${status}`}>
          <div className='reservation-header'>
            <h2>Reservations {status.charAt(0)+status.slice(1).toLowerCase()}</h2>
            <div className="dropdown">
              <button onClick={() => handleToggle(index)} className="dropdown-btn"><i>{getOperationIcon(status)} {getResNum(status)}</i>
                Voir plus
              </button>
            </div>
            {expanded === index && (
              <div className="dropdown-content">
                <InfoTable
                  columns={[
                    { Header: 'Numéro de réservation', accessor: 'id' },
                    {
                      Header: 'Client',
                      accessor: 'client',
                      Cell: ({ value }) => `${value.cin} / ${value.nom}`,
                    },
                    {
                      Header: 'Voiture',
                      accessor: 'car',
                      Cell: ({ value }) => ` ${value.marque}-${value.modele} (${value.matricule})`,
                    },
                    {
                      Header: 'Periode',
                      accessor: (row) => `De : ${row.startDate} jusqu'a: ${row.endDate}`,
                    },
                  ]}
                  data={groupedReservations[status]}
                  operation={getOperationText(status)}
                  opr={(id) => {
                    const newStatus = status === 'REFUSEE' ? 'ACCEPTEE' : status==='ACCEPTEE'?'REFUSEE':'ACCEPTEE';
                    handleOperation(id, newStatus);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ))
      ):(<p style={{color:"black",fontSize:"40px"}}>Pas de reservation  </p>)
    }
    </div>
  );
};

export default Reservation;
