import React, { useState, useEffect,lazy, Suspense, useRef } from 'react';
import axios from 'axios';
import {IconUsers,IconCar, IconFileSignal, IconWritingSignOff, IconWritingSign ,IconInfoCircleFilled} from "@tabler/icons-react";
import "../dist/ReservationModule.css";
import toast,{Toaster} from 'react-hot-toast';
import Page404 from '../Pages/Page404';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-free';
import logoPath from '../images/logo/logo.png'; 

import { saveAs } from 'file-saver';


const ReservationBg= lazy(()=>import ('./ReservationBg'));
const Form = lazy(() => import('../components/Form'));
const InfoTable = lazy(() => import('../components/InfoTable'));
const SearchInput=lazy(()=>import('../components/SearchInput'))

const Reservation = () => {
  
  const [expanded, setExpanded] = useState(null); // State to manage expanded dropdown
  const [reservations, setReservations] = useState([]);
  const [resNumber, setResNumber] = useState([]); // State for reservation numbers
  const [showForm, setShowForm] = useState(false);//state for the form to add res
  const [showRes, setShowRes] = useState(true);  //state for list res
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRes, setSelectedRes] = useState(null); // state for selected res
  const [formMode, setFormMode] = useState('Ajouter'); // State for form mode
  



  // Function to load reservations from the API
  const loadReservations = async () => {
    try {
      const response = await axios.get("http://localhost:2020/locationvoiture/v1/reservation");
      const data = response.data;
      console.log(response)
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
      toast.error("Problem lors de l'acces au BD",{
        style:{
          fontSize:'2rem',
          fontWeight:'700',
          fontFamily:'Roboto,sansSerif',
          border:'2px solid red'

        },
        duration:7000
      })
      console.error("Failed to load reservations:", error);
    }
  };
  useEffect(() => {
    loadReservations();
  }, []);
  //handeling the res 
  const handleShowRes = () => {
    window.location.reload();
    setShowRes(true);
    setShowForm(false);
    setShowSearch(false);
    setSelectedRes(null);
  };
  //handeling the form
  const handleShowForm = () => {
    setShowForm(true);
    setShowRes(false);
    setShowSearch(false);
    setSelectedRes(null);
    setFormMode('Ajouter');
  };
  //handeling the search
  const handleShowSearch=()=>{
    setShowForm(false);
    setShowRes(false);
    setShowSearch(true);
  }
  //handeling the input
  const handleAddRes= async (formData) => {
   try {
    const resData = {
      startDate: formData.date_Debut,
      endDate: formData.date_Fin,
      reservationStatus: formData.statusRes,
      client: {
        id: formData.idClient,
      },
      car: {
        id: formData.idVoiture,
      }
    };
     if (selectedRes){
      const response=await axios.put(`http://localhost:2020/locationvoiture/v1/reservation/update/${selectedRes.id}`,resData)
      console.log(resData)
     setReservations(prevRes => prevRes.map(Reservation => Reservation.id === selectedRes.id ? response.data : Reservation));
    }else{
      const response = await axios.post("http://localhost:2020/locationvoiture/v1/reservation/ajouter", resData);
      setReservations(prevReservations=>[...prevReservations,response.data])
    }
      toast.success(`Les donnes de Reservation ${formMode} avec success.`, {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto,sansSerif',
          border: '2px solid green'
        },
        duration: 7000
      });
      setShowForm(false);
    } catch (error) { 
      toast.error(`Problem lors ${formMode} de reservation Verifier Tous les Donnes`,{
        style:{
          fontSize:'2rem',
          fontWeight:'700',
          fontFamily:'Roboto,sansSerif',
          border:'2px solid red'
        },
        duration: 7000
      })
      console.error('Failed to add res:', error);
    }
  };
  //handeling the search
  const handleSearchRes = async () => {
    try {
      const response = await axios.get(`http://localhost:2020/locationvoiture/v1/reservation/${searchTerm}`);
      const data = response.data;
      setReservations([data]);
      setSearchTerm('')
    } catch (error) {
      toast.error("Réservation non trouvée. Vérifiez l'ID.", {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto,sansSerif',
          border: '2px solid red'
        },
        duration: 7000
      });
      setSearchTerm('')
      console.error('Failed to search reservation:', error);
    }
  };
  //the form fields
  const formFields = [
    { name: 'date_Debut', label: 'Date Début De Location', type: 'datetime-local', required: true },
    { name: 'date_Fin', label: 'Date Fin De Location', type: 'datetime-local', required: true },
    { name: 'idClient', label: 'ID de Client', type: 'text', required: true },
    { name: 'statusRes', label: 'Status de Réservation', type: 'select', optionNumber: '3', options: ['EN_COUR', 'ACCEPTEE', 'REFUSEE'], required: false },
    { name: 'idVoiture', label: 'ID de Voiture', type: 'text', required: true },
  ];


  // Dropdown handling
  const handleToggle = (index) => {
    if (expanded === index) {
      setExpanded(null); // Collapse if already expanded
    } else {
      setExpanded(index); // Expand if not expanded
    }
  };

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
  
    // Function to handle the PATCH request for the status
  const handleOperation = async (id, newStatus) => {
    try {
      let res=window.confirm(`Chnager la Status du Reservation avec ID ${id}???`)
      if (res){const response = await axios.patch(`http://localhost:2020/locationvoiture/v1/reservation/status/${id}`, { status: newStatus });
      if (response.status === 200) {
        loadReservations(); // Reload reservations to reflect changes
        toast.success(`La status du reservation ${id} est changer a ${newStatus}`, {
          style: {
            border: '2px solid #1A5319',
            fontSize:'2.2rem',
            fontWeight:'700',
            width:'100rem',
            fontFamily:'Roboto,sansSerif',
          },
          iconTheme: {
            primary: '#80AF81',
            secondary: '#FFFAEE',
          },
          duration:8000
        });}
      }
    } catch (error) {
      alert(`Error lors de changant staus du reservation ${id} `);
      toast.error(`Problem lors mise a jour du status du reservation${id}`,{
        style:{
          fontSize:'2rem',
          fontWeight:'700',
          fontFamily:'Roboto,sansSerif',
          border:'2px solid red'

        },
        duration:7000
      })
      console.error(`Failed to update reservation status for ID: ${id}`, error);
    }
  };
  //Function to handle the PATCH request for the whole reservation
  const handleModifRes=(id)=>{
    let res=window.confirm(`modifier la Reservation avec l'id${id}`)
    if (res){
    const resToEdit=reservations.find(res=>res.id===id);
      console.log(resToEdit)
      setSelectedRes(resToEdit);
      setShowForm(true);
      setShowSearch(false);
      setShowRes(false);
      setFormMode("Modifier")}
  }
  //Function to handle the delete option
  const handleDeleteRes=async(id)=>{
    try {
      const answer = window.confirm(`Voulais-Vous supprimer la Reservation avec l'id ${id}`);
      if (answer) {
          await axios.delete(`http://localhost:2020/locationvoiture/v1/reservation/${id}`);
          setReservations(prevRes => prevRes.filter(res => res.id !== id));
          toast.success("Reservation supprimé avec succès", {
              style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  fontFamily: 'Roboto, sans-serif',
                  border: '2px solid green'
              },
              duration: 7000
          });
      }
  } catch (error) {
      console.error(`Failed to delete client with ID ${id}:`, error);
      toast.error("Erreur lors de la suppression", {
          style: {
              fontSize: '2rem',
              fontWeight: '700',
              fontFamily: 'Roboto, sans-serif',
              border: '2px solid red'
          },
          duration: 7000
      });
  }
  }
  //Function to handle the contrat
// Function to generate the DOCX document
const HandleContrat = async (reservationId) => {
  try {
    // Fetch reservation details from the API
    const reservationResponse = await axios.get(`http://localhost:2020/locationvoiture/v1/reservation/${reservationId}`);
    const reservation = reservationResponse.data;

    // Load the DOCX file as binary content
    const response = await axios.get('/templates/contrat_location_108.docx', { responseType: 'arraybuffer' });
    const content = new Uint8Array(response.data);

    const zip = new PizZip(content);

    // Configure the image module
    const imageModule = new ImageModule({
      centered: true,
      getImage: (tagValue, tagName) => {
        if (tagName === 'logo') {
          return logoPath;  // Use the imported logo path
        }
        return null;
      },
      getSize: (img, tagValue, tagName) => {
        if (tagName === 'logo') {
          return [150, 150];
        }
        return [0, 0];
      },
    })
    const doc = new Docxtemplater(zip, { modules: [imageModule], paragraphLoop: true, linebreaks: true });
    // Calculate the time differences
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    const timeDiff = Math.abs(endDate - startDate);

    const heures = Math.floor(timeDiff / (1000 * 60 * 60));
    const jours = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const nbSemaines = Math.floor(jours / 7);

    // Extracting dates and hours
    const formatDate = (date) => date.toISOString().split('T')[0];
    const formatTime = (date) => date.toTimeString().split(' ')[0];
    // Define the template variables with reservation data
    const data = {
      logo:'logo',
      marque: `${reservation.car.marque}-${reservation.car.modele}`,
      resId: reservation.id,
      HD: formatTime(startDate),
      DD: formatDate(startDate),
      HR: formatTime(endDate),
      DR: formatDate(endDate),
      nometprenom: `${reservation.client.nom} ${reservation.client.prenom}`,
      cin: reservation.client.cin,
      numTel: reservation.client.numTel,
      email: reservation.client.email,
      immatriculation: reservation.car.matricule,
      prix: reservation.car.fraisLocation,
      Heures: heures,
      Jours: jours,
      nbSemaines: nbSemaines,
      total: reservation.fraisAPayer,
    };

    // Set the data into the document
    doc.setData(data);

    try {
      // Render the document
      doc.render();
    } catch (error) {
      throw error;
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(out, `contrat_location_${reservation.id}.docx`);
  } catch (error) {
    console.error("Failed to generate DOCX:", error);
    toast.error("Erreur lors de la génération du contrat.", {
      style: {
        fontSize: '2rem',
        fontWeight: '700',
        fontFamily: 'Roboto,sansSerif',
        border: '2px solid red'
      },
      duration: 7000
    });
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
      <Toaster containerStyle={{
        top: 100,
        left: 320,
        inset: '50px 16px 16px 12px'
      }} />
      <div className="reservation__buttons-container">
        <button onClick={handleShowRes}>Afficher les Réservations</button>
        <button onClick={handleShowForm}>Ajouter Nouvelle Réservation</button>
        <button onClick={handleShowSearch}>Chercher Réservation par ID</button>
        <ReservationBg />
      </div>
      <Suspense fallback={<Page404 />}>
        {showRes && (reservations.length === 0 ? (
          <div className='res-list__notfound'>
            <p style={{ fontSize: "5rem", fontWeight: "700" }}>Pas de Réservations.</p>
          </div>
        ) : (
          Object.keys(groupedReservations).map((status, index) => (
            <div key={index} className={`reservation-section__${status}`}>
              <div className='reservation-header'>
                <h2>Réservations {status.charAt(0) + status.slice(1).toLowerCase()}</h2>
                <div className="dropdown">
                  <button onClick={() => handleToggle(index)} className="dropdown-btn">
                    <i>{getOperationIcon(status)} {getResNum(status)}</i> Voir plus
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
                          Cell: ({ value }) => <>CIN: {value.cin} <br/> nom: {value.nom}</>,
                        },
                        {
                          Header: 'Voiture',
                          accessor: 'car',
                          Cell: ({ value }) => <>{value.marque}-{value.modele} ({value.matricule}) <br/> ID:{value.id}</>,
                        },
                        {
                          Header: 'Période',
                          accessor: (row) => <>De : {row.startDate} <br/> jusqu'à : {row.endDate}</>,
                        },
                        { Header: 'Total de Réservation', accessor: 'fraisAPayer' },
                      ]}
                      data={groupedReservations[status]}
                      operations={[
                        { 
                          name: getOperationText(status), 
                          action: (id) => {
                            const newStatus = status === 'REFUSEE' ? 'ACCEPTEE' : status === 'ACCEPTEE' ? 'REFUSEE' : 'ACCEPTEE';
                            handleOperation(id, newStatus);
                          } 
                        },
                        { name: "Modifier", action: handleModifRes },
                        { name: "Supprimer", action: handleDeleteRes },
                        { name: "Exporter Contrat", action: (id) => HandleContrat(id) }
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ))}
        {showForm && (
          <div className="add-res-form">
            <div className="add-res__message">
              <h3>
                <i><IconInfoCircleFilled /> </i> Pour ajouter une réservation, il faut connaître l'exact ID du <i>Client</i> et l'exact ID de <i>Voiture</i>
              </h3>
              <p>
                Notez que vous pouvez avoir les codes des ID dans les tableaux de chaque <i>Entité</i> <IconCar />[<a href='./cars'>Voitures </a>]<IconUsers />[<a href='./clients'>Clients</a>]
              </p>
            </div>
            <h2 className='add-res-form__title'>{formMode} une Réservation</h2>
            <Form
              fields={formFields}
              buttonLabel={formMode}
              onSubmit={handleAddRes}
              initialValues={selectedRes ? {
                date_Debut: selectedRes.startDate,
                date_Fin: selectedRes.endDate,
                statusRes: selectedRes.reservationStatus,
                idClient: selectedRes.client.id,
                idVoiture: selectedRes.car.id
              } : null}
            />
          </div>
        )}
        {showSearch &&(
        <>
          <SearchInput
            fieldSearchedBy={'ID Réservation'}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            onSearch={handleSearchRes}
          /><div className='search_result'>
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
                Cell: ({ value }) => <>{value.marque}-{value.modele} ({value.matricule}) <br/> ID:{value.id}</>,
              },
              {
                Header: 'Période',
                accessor: (row) => <>De : {row.startDate} <br/> jusqu'à : {row.endDate}</>,
              },
              { Header: 'Total de Réservation', accessor: 'fraisAPayer' },
              { Header: 'Status Reservation', accessor: 'reservationStatus' },

            ]}
            data={reservations}
            operations={[
              {
                name: "Approuver/Annuler",
                action: (id) => {
                  const reservation = reservations.find(res => res.id === id);
                  const newStatus = reservation.reservationStatus === 'REFUSEE'
                    ? 'ACCEPTEE'
                    : reservation.reservationStatus === 'ACCEPTEE'
                    ? 'REFUSEE'
                    : 'ACCEPTEE';
                  handleOperation(id, newStatus);
                },
              },
              { name: "Modifier", action: handleModifRes },
              { name: "Supprimer", action: handleDeleteRes }
            ]}
          />
          </div>
          
        </>
      )}
      </Suspense>
    </div>
  );
};

export default Reservation;