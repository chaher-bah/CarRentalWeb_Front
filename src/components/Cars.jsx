import React, { Suspense, lazy, useState, useEffect } from 'react';
import "../dist/CarsModule.css";
import Page404 from "../Pages/Page404";
import axios from "axios";

const InfoTable = lazy(() => import('./InfoTable'));
const Form = lazy(() => import('../components/Form'));

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showCars, setShowCars] = useState(false);

  const loadCars = async () => {
    try {
      const response = await axios.get("http://localhost:2020/locationvoiture/v1/admin/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Failed to load cars:", error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleShowCars = () => {
    setShowCars(true);
    setShowForm(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowCars(false);
  };

  const handleAddCar = async (formData) => {
    try {
      const carData = {
        marque: formData.marque,
        modele: formData.modele,
        anneemodele: parseInt(formData.anneemodele),
        carburant: formData.carburant,
        matricule: formData.matricule,
        transmission: formData.transmission,
        dateExpAssurance: formData.dateExpAssurance,
        dateExpVignette: formData.dateExpVignette,
        dateExpVisite: formData.dateExpVisite,
        fraisLocation: parseFloat(formData.fraisLocation),
      };
      const formDataApi = new FormData();
      formDataApi.append('car', JSON.stringify(carData));
      if (formData.photos.length > 5) {
        alert("You can upload up to 5 photos only.");
        return;
      }
      console.log(formData.photos)
      formDataApi.append('images', formData.photos);

      const response = await axios.post('http://localhost:2020/locationvoiture/v1/cars/ajouter', formDataApi, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setCars(prevCars => [...prevCars, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add car:', error);
      // Handle error appropriately, e.g., show error message
    }
  };

  const handleCarModification = (id) => {
    alert(`Modifying item with ID: ${id}`);
  };
  const getDaysDiff=(date)=>{
    const today = new Date();
    const dueDate = new Date(date);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }
  const getStatusColor = (daysDiff) => {
    return(daysDiff < 0)?'red':(daysDiff <= 30)?'orange':'green';
  };
  const formFields = [
    { name: 'marque', label: 'Marque', type: 'text', placeholder: 'VW/Mercedes/BMW', required: true },
    { name: 'modele', label: 'Modèle', type: 'text', placeholder: 'Golf6/GLA-4Matic', required: true },
    { name: 'anneemodele', label: 'Date de Début de Circulation', type: 'number',min:'1900',max:new Date().getFullYear().toString(), placeholder: 'Année', required: true },
    { name: 'carburant', label: 'Carburant', type: 'text', placeholder: 'Essence/Hybrid/Electric/Gasoil', required: false },
    { name: 'matricule', label: 'Numéro d\'immatriculation', type: 'text', placeholder: '78945-TUN-120', required: true },
    { name: 'transmission', label: 'Transmission', type: 'text', placeholder: 'Auto/Mannuelle', required: true },
    { name: 'dateExpAssurance', label: 'Date d\'échéance de l\'assurance', type: 'date', required: false },
    { name: 'dateExpVignette', label: 'Date d\'échéance du Vignette', type: 'date', required: false },
    { name: 'dateExpVisite', label: 'Date d\'échéance du Visite', type: 'date', required: false },
    { name: 'fraisLocation', label: 'Prix Par Nuit/D.T', type: 'number', placeholder: '65',step:'0.01', required: true },
    { name: 'photos', label: 'Photos', type: 'file', accept: 'image/*' }
  ];

  return (
    <Suspense fallback={<Page404 />}>
      <div className="cars-container">
        <div className="cars__buttons-container">
          <button onClick={handleShowCars}>Afficher toutes les voitures</button>
          <button onClick={handleShowForm}>Ajouter nouvelle voiture</button>
        </div>

        {showCars && (
          <div className="cars-list">
            {cars.length === 0 ? (
              <div className='cars-list__notfound'>
                <p style={{fontSize:"20px",fontWeight:"700"}}>Aucune voiture trouvée.</p>
                <Page404 />
              </div>
            ) : (
              <div className='cars-list__exists'>
                <h2>Liste des voitures</h2>
                <InfoTable
                  columns={[
                    { Header: 'Marque', accessor: (row) => `${row.marque} - ${row.modele}` },
                    { Header: 'Date de début de circulation', accessor: 'anneemodele' },
                    { Header: 'Carburant', accessor: 'carburant' },
                    { Header: 'Matricule', accessor: 'matricule' },
                    { Header: 'Prix de location', accessor: 'fraisLocation' },
                    {
                      Header: 'Status de l\'assurance', accessor: 'dateExpAssurance',
                      Cell: ({ row }) => (
                        row.original.dateExpAssurance ? (
                          <p style={{ color: getStatusColor(getDaysDiff(row.original.dateExpAssurance)), fontSize: '2rem' }}>
                            {getStatusColor(getDaysDiff(row.original.dateExpAssurance)) === 'red'
                              ? 'Assurance en retard'
                              : getStatusColor(getDaysDiff(row.original.dateExpAssurance)) === 'orange'
                                ? 'Assurance proche de la date limite'
                                : 'Assurance à jour'}<p style={{fontSize: '1.3rem'}}>{'('+getDaysDiff(row.original.dateExpAssurance)+'Jours)'}</p>
                          </p>
                        ) : (
                          <span style={{ fontSize: '2rem', color: 'grey' }}>données inexistantes</span>
                        )
                      )
                    },
                    {
                      Header: 'Status du Vignette', accessor: 'dateExpVignette',
                      Cell: ({ row }) => (
                        row.original.dateExpVignette?(
                        <p style={{ color: getStatusColor(getDaysDiff(row.original.dateExpVignette)), fontSize: '2rem' }}>
                          {getStatusColor(getDaysDiff(row.original.dateExpVignette)) === 'red'
                            ? 'Vignette en retard'
                            : getStatusColor(getDaysDiff(row.original.dateExpVignette)) === 'orange'
                              ? 'Vignette proche de la date limite'
                              : 'Vignette à jour'}
                              <p style={{fontSize: '1.3rem'}}>{'('+getDaysDiff(row.original.dateExpVignette)+'Jours)'}</p>
                        </p>
                      ):(
                        <span style={{ fontSize: '2rem', color: 'grey' }}>données inexistantes</span>
                      )
                    )
                    },
                    {
                      Header: 'Status de la visite', accessor: 'dateExpVisite',
                      Cell: ({ row }) => (
                        row.original.dateExpVisite ?(
                        <p style={{ color: getStatusColor(getDaysDiff(row.original.dateExpVisite)), fontSize: '2rem' }}>
                          {getStatusColor(getDaysDiff(row.original.dateExpVisite)) === 'red'
                            ? 'Visite en retard'
                            : getStatusColor(getDaysDiff(row.original.dateExpVisite)) === 'orange'
                              ? 'Visite proche de la date limite'
                              : 'Visite à jour'}<p style={{fontSize: '1.3rem'}}>{'('+getDaysDiff(row.original.dateExpVisite)+'Jours)'}</p>

                        </p>
                      ) :(
                        <span style={{ fontSize: '2rem', color: 'grey' }}>données inexistantes</span>
                      ))
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
      </div>
    </Suspense>
  );
};

export default Cars;
