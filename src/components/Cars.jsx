import React, { Suspense, lazy, useState, useEffect } from 'react';
import "../dist/CarsModule.css";
import Page404 from "../Pages/Page404";
import CarsBg from '../components/CarsBg'
import axios from "axios";
import toast,{Toaster} from 'react-hot-toast';
import {IconAlertTriangle,IconInfoCircleFilled} from '@tabler/icons-react';
const InfoTable = lazy(() => import('./InfoTable'));
const Form = lazy(() => import('../components/Form'));
const Cars = () => {
  const [cars, setCars] = useState([]);//state to retrive cars data
  const[charges,setCharges]=useState([]);
  const [showForm, setShowForm] = useState(false);//state for the form to add car
  const [showCars, setShowCars] = useState(true);  //state for list cars
  const [showCharges, setShowCharges] = useState(false);  //state for charges
  const [selectedCar, setSelectedCar] = useState(null); // state for selected car
  const [formMode, setFormMode] = useState('Ajouter'); // State for form mode
  const [showChargeForm, setShowChargeForm] = useState(false); // state for charge form

  //loading cars from  the backend
  const loadCars = async () => {
    try {
      const response = await axios.get("http://localhost:2020/locationvoiture/v1/admin/cars");
      const carsWithTotalCharges = response.data.map(car => ({
        ...car,
        totalCharges: car.charges.reduce((sum, charge) => sum + charge.charge, 0)
      }));
      setCars(carsWithTotalCharges);    } catch (error) {
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
    setShowCharges(false);
    setSelectedCar(null);
  };
  //handeling the state of the form for adding the car
  const handleShowForm = () => {
    setShowForm(true);
    setShowCars(false);
    setShowCharges(false);
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
  const handleCharge=(id)=>{
    const car = cars.find((car) => car.id === id);
    setSelectedCar(car);
    
    if (car) {
    setCharges(car.charges);
    setShowCars(false);
    setShowCharges(true);
    setShowForm(false);
    console.log(charges)
  }

  };

  const handleAddCharge = async (formData) => {
    try{
    const newCharge = {
      id:Math.random(),
      label: formData.labelle,
      charge: parseFloat(formData.montant),
    };
    await axios.patch(`http://localhost:2020/locationvoiture/v1/cars/${selectedCar.id}/charge`, [newCharge]);

    setCharges(prevCharges => [...prevCharges, newCharge]);
    setShowChargeForm(false);

    toast.success("Charge ajoutée avec succès", {
      style: {
        fontSize: '2rem',
        fontWeight: '700',
        fontFamily: 'Roboto, sans-serif',
        border: '2px solid green'
      },
      duration: 7000
    });
  } catch (error) {
    toast.error('Erreur lors de l\'ajout de la charge.', {
        style: {
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: 'Roboto, sans-serif',
            border: '2px solid red'
        },
        duration: 7000
    });
    console.error('Failed to add charge:', error);
}
  };
  const handleDeleteCharge = async (chargeId) => {
    try {
      let res=window.confirm("Voulais-Vous supprimer Cette Charge")
      if (res){
      await axios.delete(`http://localhost:2020/locationvoiture/v1/cars/${selectedCar.id}/charge/${chargeId}`);

      // Remove charge from local state
      setCharges(prevCharges => prevCharges.filter(charge => charge.id !== chargeId));
      toast.success("Charge supprimée avec succès", {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid green'
        },
        duration: 7000
      });}
    } catch (error) {
      toast.error('Erreur lors de la suppression de la charge.', {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid red'
        },
        duration: 7000
      });
      console.error('Failed to delete charge:', error);
    }
  };
  
  const operations = [
    { name: "Modifier", action: handleCarModification },
    { name:"Supprimer", action:handleDeleteOperation },
    { name:"Afficher Details Charges",action:handleCharge}
  ]
  const operationsCharge=[
    {name:"Supprimer",action:handleDeleteCharge}
  ];

  const getDaysDiff=(date)=>{
    const today = new Date();
    const dueDate = new Date(date);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }
  const getStatusColor = (daysDiff) => {
    return(daysDiff <= 0)?'red':(daysDiff <= 30)?'orange':'green';
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
    { name: 'photos', label: 'Photos [Min:1 Max:6]', type: 'file', accept: 'image/*' }
  ];
  const chargeFormFields = [
    { name: 'labelle', label: 'Labelle', type: 'text', required: true },
    { name: 'montant', label: 'Montant', type: 'number',step:'0.01', required: true }
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
                    { Header: 'Marque', accessor: (row) => `${row.anneemodele} -${row.marque}  ${row.modele}` },
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
                    },
                    {Header:'Total de Charges',accessor: (row)=>`${row.totalCharges} DT`}
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
            <div className="add-car__message">
                        <h3>
                            <i><IconInfoCircleFilled /> </i> Pour Ajouter une voiture, Il faut remplir les champs nécessaires<b style={{color:'red'}}> *</b>
                        </h3>
                        <p >Notez que vous pouvez ajouter max <i>6</i> Photos</p>
                    </div>
            <h2 className='add-car-form__title'> {formMode} une voiture</h2>
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
        {showCharges &&(
          <div className='show-car-charge'>
            <h2 className='show-car-charge__title'>Liste des Charges </h2>
            <div className='show-car-charge__table'>
            <InfoTable
            columns={[
                {Header:'Labelle',accessor:(row)=>`${row.label}`},
                {Header:'Montant',accessor:(row)=>`${row.charge}`},
                
              ]}
              data={charges}
              operations={operationsCharge}
            />
            {!showChargeForm&&(<button onClick={() => setShowChargeForm(true)} className='show-car-charge__table__button'>Ajouter une nouvelle charge</button>)}
            {showChargeForm && (
              <Form
              onSubmit={handleAddCharge}
              buttonLabel='Ajouter Charge'
              fields={chargeFormFields}
              />
            )}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Cars;
