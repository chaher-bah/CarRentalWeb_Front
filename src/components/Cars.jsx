import React, { Suspense, lazy, useState } from 'react';
import "../dist/CarsModule.css";
import Page404 from "../Pages/Page404";
const InfoTable =lazy(()=>import('./InfoTable'));

const Form=lazy(()=>import('../components/Form'));

const Cars = () => {
  const fake_cardata = [
    { make: 'Toyota', model: 'Corella', licensePlate: 'ABC123', year: '2008', vin: 'ty46464c6z', vignetteDueDate: '2024-12-31', visiteDueDate: '2024-12-31', insuranceDueDate: '2024-12-31' },
    { make: 'VW', model: 'Golf6', licensePlate: 'sdaC123', year: '2028', vin: 'vw46464c6z', vignetteDueDate: '2023-11-30', visiteDueDate: '2024-05-31', insuranceDueDate: '2024-02-28' },
    { make: 'Mercedes', model: 'GLK', licensePlate: 'tun123', year: '2018', vin: 'mb46464c6z', vignetteDueDate: '2024-07-31', visiteDueDate: '2024-12-30', insuranceDueDate: '2024-12-03' }
  ];

  const [cars, setCars] = useState(fake_cardata);
  const [showForm, setShowForm] = useState(false);
  const [showCars, setShowCars] = useState(false);

  const handleShowCars = () => {
    setShowCars(true);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowCars(false);
  };

  const handleAddCar = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
    setShowForm(false);
  };
  const handleCarModification=(id)=>{
    alert(`hiiii item with ID: ${id}`);
  };
  const getStatusColor = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return 'red';
    if (daysDiff <= 30) return 'orange';
    return 'green';
  };

  const formFields = [
    { name: 'make', label: 'Marque', type: 'text', placeholder: 'VW/Mercedes/BMW', required: true },
    { name: 'model', label: 'Modèle', type: 'text', placeholder: 'Golf6/GLA-4Matic', required: true },
    { name: 'year', label: 'Date de Début de Circulation', type: 'text', placeholder: 'Année', required: true },
    { name: 'vin', label: 'Num Vin', type: 'text', placeholder: 'WBAHA91050GK33329', required: false },
    { name: 'licensePlate', label: 'Numéro d\'immatriculation', type: 'text', placeholder: '78945-TUN-120', required: true },
    { name: 'insuranceDueDate', label: 'Date d\'échéance de l\'assurance', type: 'date', required: false },
    { name: 'vignetteDueDate', label: 'Date d\'échéance du Vignette', type: 'date', required: false },
    { name: 'visiteDueDate', label: 'Date d\'échéance du Visite', type: 'date', required: false },
    {name:'photos',label:'Photos',type:'file',accept:'image/*'}
  ];

  return (
    <Suspense fallback={<Page404/>}>
    <div className="cars-container">
      <div className="cars__buttons-container">
        <button onClick={handleShowCars}>Afficher toutes les voitures</button>
        <button onClick={handleShowForm}>Ajouter nouvelle voiture</button>
      </div>

      {showCars && (
        <div className="cars-list">
          {cars.length === 0 ? (
            <div className='cars-list__notfound'>
              <p>Aucune voiture trouvée.</p>
              <Page404 />
            </div>
          ) : (
            <div className='cars-list__exists'>
              <h2>Liste des voitures</h2>
              <InfoTable
                columns={[
                  { Header: 'Marque', accessor: 'make' },
                  { Header: 'Modèle', accessor: 'model' },
                  { Header: 'Date de début de circulation', accessor: 'year' },
                  { Header: 'VIN', accessor: 'vin' },
                  { Header: 'Numéro d\'immatriculation', accessor: 'licensePlate' },
                  { Header: 'Date d\'échéance de l\'assurance', accessor: 'insuranceDueDate' },
                  { Header: 'Status de l\'assurance', accessor: 'insuranceStatus',
                    Cell: ({ row }) => (
                      <span style={{ color: getStatusColor(row.original.insuranceDueDate) ,fontSize:'2rem'}}>
                        {getStatusColor(row.original.insuranceDueDate) === 'red'
                          ? 'Assurance en retard'
                          : getStatusColor(row.original.insuranceDueDate) === 'orange'
                            ? 'Assurance proche de la date limite'
                            : 'Assurance à jour'}

                      </span>
                    )
                  },
                  {
                    Header: 'Status du Vignette',
                    accessor: 'vignetteStatus',
                    Cell: ({ row }) => (
                      <span style={{ color: getStatusColor(row.original.vignetteDueDate) ,fontSize:'2rem'}}>
                        {getStatusColor(row.original.vignetteDueDate) === 'red'
                          ? 'Vignette en retard'
                          : getStatusColor(row.original.vignetteDueDate) === 'orange'
                            ? 'Vignette proche de la date limite'
                            : 'Vignette à jour'}
                      </span>
                    )
                  },
                  {
                    Header: 'Status de la visite',
                    accessor: 'visiteStatus',
                    Cell: ({ row }) => (
                      <span style={{ color: getStatusColor(row.original.visiteDueDate) ,fontSize:'2rem'}}>
                        {getStatusColor(row.original.visiteDueDate) === 'red'
                          ? 'Visite en retard'
                          : getStatusColor(row.original.visiteDueDate) === 'orange'
                            ? 'Visite proche de la date limite'
                            : 'Visite à jour'}
                      </span>
                    )
                  }
                ]}
                data={cars}
                operation={'Modifier'}
                opr={handleCarModification}
              />
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="add-car-form">
          <h2>Ajouter une nouvelle voiture</h2>
          <Form
            title=""
            fields={formFields}
            buttonLabel="Ajouter"
            onSubmit={handleAddCar}
          />
        </div>
      )}
    </div></Suspense>
  );
};

export default Cars;
