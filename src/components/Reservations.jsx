import React, { useState } from 'react';
import InfoTable from './InfoTable';
import {IconFileSignal ,IconWritingSignOff,IconWritingSign} from "@tabler/icons-react"
import "../dist/ReservationModule.css"
const Reservation = () => {
  const [expanded, setExpanded] = useState(null); // State to manage expanded dropdown
  //fakedata
  const resNumber=[{status:'En attente',nbr:'250'},{status:'Approuvés',nbr:'30'},{status:'Annulés',nbr:'25'}]
  const reservations = [
    {
      status: 'En attente',
      data: [
        { id: 1, reservationNum: '56464', client: { cin: '145263', nom: 'moula' }, voiture: { number: 'ABC123', modele: 'Toyota' } },
        { id: 2, reservationNum: '45646', client: { cin: '78989', nom: '7amouda' }, voiture: { number: 'XYZ789', modele: 'Honda civic' } },
        { id: 3, reservationNum: '45646', client: { cin: '78989', nom: ';ldkk' }, voiture: { number: '1123tun55', modele: 'Mercedes 190e' } },
        { id: 4, reservationNum: '45646', client: { cin: '78989', nom: 'dffaad' }, voiture: { number: 'XYZ789', modele: 'kia Rio' } },
        { id: 5, reservationNum: '45646', client: { cin: '78989', nom: '7amouda' }, voiture: { number: 'XYZ789', modele: 'Honda' } },
        { id: 6, reservationNum: '45646', client: { cin: '78989', nom: '7amouda' }, voiture: { number: 'XYZ789', modele: 'Honda' } },
        { id: 7, reservationNum: '45646', client: { cin: '78989', nom: '7amouda' }, voiture: { number: 'XYZ789', modele: 'Honda' } },
        { id: 2, reservationNum: '45646', client: { cin: '78989', nom: '7amouda' }, voiture: { number: 'XYZ789', modele: 'Honda' } },

      ],
    },
    {
      status: 'Approuvés',
      data: [
        { id: 3, reservationNum: '4646', client: { cin: '145263', nom: 'moulaEl Bash' }, voiture: { number: 'DEF456', modele: 'Ford' } },
      ],
    },
    {
      status: 'Annulés',
      data: [
        { id: 4, reservationNum: '7890', client: { cin: '78989', nom: '7amouda' }, voiture: { number: 'GHI789', modele: 'Chevrolet' } },
      ],
    },
  ];
//drropdown handeling
  const handleToggle = (index) => {
    if (expanded === index) {
      setExpanded(null); // Collapse if already expanded
    } else {
      setExpanded(index); // Expand if not expanded
    }
  };
  const handleopr=(id)=>{
    alert(`doing the opertation on  item with ID: ${id}`);
  }
  const getOperationText = (status) => {
    switch (status) {
      case 'En attente':
        return 'Approuver';
      case 'Approuvés':
        return 'Annuler';
      case 'Annulés':
        return 'Approuver';
      default:
        return 'Operation';
    }
  };
  const getOperationIcon = (status) => {
    switch (status) {
      case 'En attente':
        return <IconFileSignal/>;
      case 'Approuvés':
        return <IconWritingSign/>;
      case 'Annulés':
        return <IconWritingSignOff/>;
      default:
        return '';
    }
  };
  const getResNum= (status) =>{
    const res = resNumber.find((section) => section.status === status);
    return <p>{res ? res.nbr : ''}</p>;
  }

  return (
    <div className="reservation-container">
      {reservations.map((section, index) => (
        <div key={index} className={`reservation-section__${section.status}`}>
          <div className='reservation-header'>
          <h2>Reservations  {section.status}</h2>
          <div className="dropdown">
            <button onClick={() => handleToggle(index)} className="dropdown-btn"><i>{getOperationIcon(section.status)} {getResNum(section.status)}</i>
              Voir plus
            </button>
          </div>
            {expanded === index && (
              <div className="dropdown-content">
                <InfoTable
                  columns={[
                    { Header: 'Numéro de réservation', accessor: 'reservationNum' },
                    {
                      Header: 'Client',
                      accessor: 'client',
                      Cell: ({ value }) => `${value.cin} - ${value.nom}`,
                    },
                    {
                      Header: 'Voiture',
                      accessor: 'voiture',
                      Cell: ({ value }) => `${value.number} - ${value.modele}`,
                    },
                  ]}
                  data={section.data} 
                  
                  operation={getOperationText(section.status)}
                  opr={handleopr}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reservation;
