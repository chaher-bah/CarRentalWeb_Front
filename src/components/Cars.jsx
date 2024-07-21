import React, { Suspense, lazy, useState, useEffect } from 'react';
import "../dist/CarsModule.css";
import Page404 from "../Pages/Page404";
import CarsBg from '../components/CarsBg'
import axios from "axios";
import toast,{Toaster} from 'react-hot-toast';
import {IconAlertTriangle} from '@tabler/icons-react';
const InfoTable = lazy(() => import('./InfoTable'));
const Form = lazy(() => import('../components/Form'));
const Cars = () => {
  const [cars, setCars] = useState([]);//state to retrive cars data
  const [showForm, setShowForm] = useState(false);//state for the form to add car
  const [showCars, setShowCars] = useState(true);  //state for list cars
  const [selectedCar, setSelectedCar] = useState(null); // state for selected car
  const [formMode, setFormMode] = useState('Ajouter'); // State for form mode

  //loading cars from  the backend
  const loadCars = async () => {
    try {
      const response = await axios.get("http://localhost:2020/locationvoiture/v1/admin/cars");
      setCars(response.data);
    } catch (error) {
      toast.error("Problem lors de l'acces au BD",{
        style:{
          fontSize:'2rem',
          fontWeight:'700',
          fontFamily:'Roboto,sansSerif',
          border:'2px solid red'

        },
        duration:7000
      })
      console.error("Failed to load cars:", error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);
  //handeling the state of the cars list
  const handleShowCars = () => {
    setShowCars(true);
    setShowForm(false);
    setSelectedCar(null);
  };
  //handeling the state of the form for adding the car
  const handleShowForm = () => {
    setShowForm(true);
    setShowCars(false);
    setSelectedCar(null);
    setFormMode('Ajouter')
  };
  //handeling the input form
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
        fraisLocation: parseFloat(formData.fraisLocation)
      };
      const formDataApi = new FormData();
      formDataApi.append('car', JSON.stringify(carData));
      const photos = formData.photos;
      console.log(photos)

      if (photos.length > 6) {
        toast.error('Vous ne pouvez utiliser que 6 photos maximum.',{
        style:{
          border: '2px solid #E0A75E',
          fontSize:'3rem',
          fontWeight:'700',
          backgroundColor:"#F9D689",
          color:'#973131',
          width:'100rem',
          fontFamily:'Roboto,sansSerif',
        },
        icon:<IconAlertTriangle/>,
        duration:5000,
        
      })
        return;
    }
    console.log(photos.length)

    for (let i = 0; i < photos.length; i++) {
      formDataApi.append('images', photos[i]);
    }
    //adding the modifying logic
    let response;
    if(selectedCar){
      response=await axios.put(`http://localhost:2020/locationvoiture/v1/cars/update/${selectedCar.id}`,formDataApi,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      });
      setCars(prevCars => prevCars.map(car => car.id === selectedCar.id ? response.data : car));
    }else{
      const response = await axios.post('http://localhost:2020/locationvoiture/v1/cars/ajouter', formDataApi, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCars(prevCars => [...prevCars, response.data]);
    }
      toast.success(`Les donnes du voitures ${formMode} avec success.`, {
        style: {
          border: '2px solid #1A5319',
          fontSize:'2.5rem',
          fontWeight:'700',
          width:'100rem',
          fontFamily:'Roboto,sansSerif',
        },
        iconTheme: {
          primary: '#80AF81',
          secondary: '#FFFAEE',
        },
        duration:8000
      });
      setShowForm(false);

    } catch (error) {
      toast.error("Problem lors l'ajout du voiture Verifier Tous les Donnes",{
        style:{
          fontSize:'2rem',
          fontWeight:'700',
          fontFamily:'Roboto,sansSerif',
          border:'2px solid red'

        },
        duration: 7000
      })
      console.error('Failed to add car:', error);
    }
  };
  //TO DO handele the button action
  const handleCarModification = (id) => {
    const res=window.confirm(`Modifier Voiture avec ID: ${id}`);
    if(res){
    const carToEdit=cars.find(car=>car.id===id);
    console.log(carToEdit)
    setSelectedCar(carToEdit);
    setShowForm(true);
    setShowCars(false);
    setFormMode("Modifier")}
  };
  const handleDeleteOperation = async (id) => {
    try {
        const answer= window.confirm(`Voulais-Vous supprimer la Voiture avec l'id ${id}`)
        if(answer){
        await axios.delete(`http://localhost:2020/locationvoiture/v1/cars/${id}`);
        setCars(prevCars => prevCars.filter(car => car.id !== id));
        toast.success("Voiture supprimé avec succès", {
            style: {
                fontSize: '2rem',
                fontWeight: '700',
                fontFamily: 'Roboto, sans-serif',
                border: '2px solid green'
            },
            duration: 7000
        });}
    } catch (error) {
        console.error(`Failed to delete Car with ID ${id}:`, error);
        toast.error("Erreur lors de la suppression de la Voiture", {
            style: {
                fontSize: '2rem',
                fontWeight: '700',
                fontFamily: 'Roboto, sans-serif',
                border: '2px solid red'
            },
            duration: 7000
        });
    }
};

  const operations = [
    { name: "Modifier", action: handleCarModification },
    {name:"Supprimer", action:handleDeleteOperation }]

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
  //the form fields to input the data
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
    { name: 'photos', label: 'Photos [Max:6]', type: 'file', accept: 'image/*' }
  ];

  return (
    <Suspense fallback={<Page404 />}>    <Toaster containerStyle={{
      top: 100,
      left: 320,
      inset:'50px 16px 16px 12px'
      
    }}/>

      <div className="cars-container">
        <div className="cars__buttons-container">
          <button onClick={handleShowCars}>Afficher toutes les voitures</button>
          <button onClick={handleShowForm}>Ajouter nouvelle voiture</button>
          <CarsBg/>
        </div>
        {showCars && (
          <div className="cars-list">
            {cars.length === 0 ? (
              <div className='cars-list__notfound'>
                <p style={{fontSize:"40px",fontWeight:"700"}}>Aucune voiture trouvée.</p>
              </div>
            ) : (
              <div className='cars-list__exists'>
                <h2>Liste des voitures</h2>
                <InfoTable
                  columns={[
                    { Header: 'Id Voiture', accessor: 'id' },
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
                  operations={operations}
                />
              </div>
            )}
          </div>
        )}

        {showForm && (
          <div className="add-car-form">
            <h2> {formMode} une voiture</h2>
            <Form
              fields={formFields}
              buttonLabel={formMode}
              onSubmit={handleAddCar}
              initialValues={selectedCar?{
                marque: selectedCar.marque,
                modele: selectedCar.modele,
                anneemodele: selectedCar.anneemodele,
                carburant: selectedCar.carburant,
                matricule: selectedCar.matricule,
                transmission: selectedCar.transmission,
                dateExpAssurance: selectedCar.dateExpAssurance,
                dateExpVignette: selectedCar.dateExpVignette,
                dateExpVisite: selectedCar.dateExpVisite,
                fraisLocation: selectedCar.fraisLocation,
                photos:[selectedCar.imageUrls]
              }:null}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Cars;
