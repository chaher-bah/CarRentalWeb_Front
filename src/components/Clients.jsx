import React, { useState, useEffect, useMemo, lazy } from 'react';
import axios from 'axios';
import { IconAlertTriangle,IconInfoCircleFilled } from '@tabler/icons-react';
import SearchInput from './SearchInput';
import "../dist/ClientsModule.css";
import InfoTable from './InfoTable';
import toast, { Toaster } from 'react-hot-toast';
import ClientsBg from '../components/ClientsBg';
import{BASE_URL} from '../Const/API_url.json'

const Form=lazy(()=>import('../components/Form'));

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [fieldSearchedBy, setFieldSearchedBy] = useState('Num de CIN');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showClients, setShowClients] = useState(true);
    
    const [formMode, setFormMode] = useState('Ajouter'); // State for form mode
    const [selectedClient, setSelectedClient] = useState(); // state for selected Client
    const [showPhotos,setShowPhotos]=useState(false)
    // Fetch clients from the API wuth Reservations
    const loadClients = async() => {
        try {
            const response = await axios.get(BASE_URL+"client");
            const clientsData = response.data;
            setClients(clientsData);
            console.log(response)

            // Fetch reservations for each client
            const clientsWithReservations = await Promise.all(clientsData.map(async client => {
                const reservationsResponse = await axios.get(BASE_URL+`client/${client.id}/reservation`);
                return { ...client, reservations: reservationsResponse.data };
            }));

            setClients(clientsWithReservations);
        } catch (error) {
            console.error("Failed to load clients:", error);
            toast.error("Problem lors de l'acces au BD", {
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

    const loadAllClients = async () => {
        window.location.reload();
        setSearchTerm(''); // Clear search term
        await loadClients(); // Reload all clients
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleShowClients = () => {
        setShowClients(true);
        setShowForm(false);
        setSelectedClient(null);
    };

    const handleShowForm = () => {
        setShowClients(false);
        setShowForm(true);
        setSelectedClient(null);
    };

    //handeling the search logic
    const searchClients = async () => {
        let url;
        if (fieldSearchedBy === 'Num de CIN') {
            url = BASE_URL+`client/cin/${searchTerm}`;
        } else if (fieldSearchedBy === 'Email') {
            url = BASE_URL+`client/email/${searchTerm}`;
        } else if (fieldSearchedBy === 'Nom et/ou Prénom') {
            url = BASE_URL+`client/nom_prenom?nom=${searchTerm}&prenom=${searchTerm}`;
        }
        try {
            const response = await axios.get(url);
            const clientData = response.data;
            setSearchTerm('');
            toast.success("Client Trouvèe avec succès", {
                style: {
                    fontSize: '2rem',
                    fontWeight: '700',
                    fontFamily: 'Roboto, sans-serif',
                    border: '2px solid green'
                },
                duration: 7000
            });
            if (Array.isArray(clientData)) {
                setClients(clientData);
            } else {
                setClients([clientData]);
            }
        } catch (error) {
            console.error(`Failed to search client by ${fieldSearchedBy}:`, error);
            toast.error(`Erreur lors de la recherche par ${fieldSearchedBy}`, {
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

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "CIN",
            accessor: "cin"
        },
        {
            Header: "Nom-Prenom",
            accessor: (row) => `${row.nom} - ${row.prenom}`,
        },
        {
            Header: "Num Telephone",
            accessor: "numTel"
        },
        {
            Header: "E-mail",
            accessor: "email"
        },
        {
            Header: "Reservations",
            accessor: "reservations",
            Cell: ({ value }) => (value ? value.map(res => res.id).join(', ') : value)
        },
    ], []);

    const handleDeleteOpr = async (id) => {
        try {
            const answer = window.confirm(`Voulais-Vous supprimer le Client avec l'id ${id}`);
            if (answer) {
                await axios.delete(BASE_URL+`client/${id}`);
                setClients(prevClients => prevClients.filter(client => client.id !== id));
                toast.success("Client supprimé avec succès", {
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
            toast.error("Erreur lors de la suppression du client", {
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
    //the Form Fields
    const formFields = [
        { name: 'cin', label: 'Cin', type: 'text', required: true },
        { name: 'nom', label: 'Nom', type: 'text', required: true },
        { name: 'prenom', label: 'Prénom', type: 'text', required: true },
        { name: 'numTel', label: 'Numéro de Téléphone', type: 'text', placeholder: '+21695077703',pattern:'^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$', required: true },
        { name: 'email', label: 'Email de Client', type: 'email',placeholder:'test1234@gmail.com', required: false },
        { name: 'photos', label: 'Photos de Permis [Min:0 Max:4]', type: 'file', accept: 'image/*',required:false }

      ];
  //handeling the input
  const handleAddClient= async (formData) => {
    try {
     const clientData = {
       cin: formData.cin,
       nom: formData.nom,
       prenom: formData.prenom,
       email: formData.email,
       numTel:formData.numTel 
     };
     const formDataApi = new FormData();
     formDataApi.append('client', JSON.stringify(clientData));
    const photos = formData.photos;
    if (photos.length > 4) {
        toast.error('Vous ne pouvez utiliser que 4 photos maximum.',{
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
    for (let i = 0; i < photos.length; i++) {
      formDataApi.append('images', photos[i]);
    }
    let response;
      if (selectedClient){
        response=await axios.put(BASE_URL+`client/update/${selectedClient.id}`,formDataApi,{
            headers:{
              'Content-Type':'multipart/form-data'}});
      setClients(prevClient => prevClient.map(client => client.id === selectedClient.id ? response.data : client));
     }else{
        const response = await axios.post(BASE_URL+"client/ajouter", formDataApi,{
        headers:{
            'Content-Type':'multipart/form-data'}});
       setClients(prevClient=>[...prevClient,response.data])
     }
       toast.success(`Les donnes de Client ${formMode} avec success.`, {
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
       toast.error(`Problem lors ${formMode} de Client Verifier Tous les Donnes`,{
         style:{
           fontSize:'2rem',
           fontWeight:'700',
           fontFamily:'Roboto,sansSerif',
           border:'2px solid red'
         },
         duration: 7000
       })
       console.error('Failed to add client:', error);
     }
   };
   const handleClientModification = (id) => {
    const res=window.confirm(`Modifier Client avec ID: ${id}`);
    if (res){
    const clientToEdit=clients.find(client=>client.id===id);
    console.log(clientToEdit)
    setSelectedClient(clientToEdit);
    setShowForm(true);
    setShowClients(false);
    setFormMode("Modifier")}
  };
  const handleCLientPermis=(id)=>{
    const clientPhotos=clients.find(client=>client.id===id);
    setSelectedClient(clientPhotos);
    setShowClients(false);
    setShowClients(false);
    setShowPhotos(true);
  }

    const operations = [
        { name: "Modifier", action: handleClientModification },
        { name: "Supprimer", action: handleDeleteOpr },
        { name:"Afficher Permis",action:handleCLientPermis}
    ];

    return (
        <div className='clients-container'>
            <ClientsBg />
            <Toaster containerStyle={{
                top: 100,
                left: 320,
                inset: '50px 16px 16px 12px'
            }} />

            <div className="button-container">
                <button className='allClients' onClick={()=>{loadAllClients();handleShowClients();}}>Afficher Tous</button>
                <button className='cin' onClick={() => { handleShowClients(); setFieldSearchedBy('Num de CIN'); }}>Chercher par CIN</button>
                <button className='email' onClick={() => { handleShowClients(); setFieldSearchedBy('Email'); }}>Chercher par Email</button>
                <button className='nom' onClick={() => { handleShowClients(); setFieldSearchedBy('Nom et/ou Prénom'); }}>Chercher par Nom et/ou Prénom</button>
                <button className='addClient' onClick={handleShowForm}>Ajouter Un Client Manuellement</button>
            </div>
            {showClients && (
                <>
                    <SearchInput
                        fieldSearchedBy={fieldSearchedBy}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={searchClients}
                    />
                    <div className="info-table-container">
                        <InfoTable
                            data={clients}
                            columns={columns}
                            operations={operations} />
                    </div>
                </>
            )}
            {showForm &&(
                <div className='add-client-form'>
                    <div className="add-client__message">
                        <h3>
                            <i><IconInfoCircleFilled /> </i> Pour Ajouter un Client, Il faut respecter le condition du Numéro de Téléphone
                        </h3>
                        <p >Notez que vous pouvez ajouter max <i>4</i> Photos de Permis</p>
                    </div>
                    {formMode === "Modifier" && (
                    <div className="add-client__message">
                        <h3>
                            <i><IconInfoCircleFilled /> </i> Notez bien que lors de la modification d'un client, si vous choisissez d'ajouter des photos, les anciennes seront supprimées
                        </h3>
                    </div>
                    )}
                    <h2 className='add-client-form__title'> {formMode} un Client </h2>
                    <Form
                        fields={formFields}
                        buttonLabel={formMode}
                        onSubmit={handleAddClient}
                        initialValues={selectedClient?{
                        cin: selectedClient.cin,
                        nom: selectedClient.nom,
                        prenom: selectedClient.prenom,
                        numTel:selectedClient.numTel,
                        email:selectedClient.email,
                        photos:selectedClient.photoPermis}:null}
                    />
                </div>
            )}
            {showPhotos &&(
                <div className='photos-client'>
                    <h2 className='photos-client__title'>  Photos de Permis Pour {selectedClient?.nom ? selectedClient.nom : "client"} - {selectedClient?.prenom ? selectedClient.prenom : "client"}
                    </h2>
                    <div className='photos-client__img'>
                        {selectedClient.photoPermis.map((img,index)=>
                        (
                            <img
                            key={index}
                            src={img}
                            alt={`client_photo_${index}`}/>
                        ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;
