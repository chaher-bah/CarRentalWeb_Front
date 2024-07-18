import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import "../dist/ClientsModule.css";
import InfoTable from './InfoTable';
import toast, { Toaster } from 'react-hot-toast';
import ClientsBg from '../components/ClientsBg';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [fieldSearchedBy, setFieldSearchedBy] = useState('Num de CIN');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showClients, setShowClients] = useState(true);

    // Fetch clients from the API
    const loadClients = async () => {
        try {
            const response = await axios.get("http://localhost:2020/locationvoiture/v1/client");
            const clientsData = response.data;
            setClients(clientsData);

            // Fetch reservations for each client
            const clientsWithReservations = await Promise.all(clientsData.map(async client => {
                const reservationsResponse = await axios.get(`http://localhost:2020/locationvoiture/v1/client/${client.id}/reservation`);
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
        setSearchTerm(''); // Clear search term
        await loadClients(); // Reload all clients
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleShowClients = () => {
        setShowClients(true);
        setShowForm(false);
    };

    const handleShowForm = () => {
        setShowClients(false);
        setShowForm(true);
    };

    const searchClients = async () => {
        let url;
        if (fieldSearchedBy === 'Num de CIN') {
            url = `http://localhost:2020/locationvoiture/v1/client/cin/${searchTerm}`;
        } else if (fieldSearchedBy === 'Email') {
            url = `http://localhost:2020/locationvoiture/v1/client/email/${searchTerm}`;
        } else if (fieldSearchedBy === 'Nom et/ou Prénom') {
            url = `http://localhost:2020/locationvoiture/v1/client/nom_prenom?nom=${searchTerm}&prenom=${searchTerm}`;
        }
        try {
            const response = await axios.get(url);
            const clientData = response.data;
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
            Header: "E-mail",
            accessor: "email"
        },
        {
            Header: "Reservations",
            accessor: "reservations",
            Cell: ({ value }) => (value ? value.map(res => res.id).join(', ') : value)
        },
    ], []);

    const handleOperation = async (id) => {
        try {
            const answer = window.confirm(`Voulais-Vous supprimer le Client avec l'id ${id}`);
            if (answer) {
                await axios.delete(`http://localhost:2020/locationvoiture/v1/client/${id}`);
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

    const operations = [
        { name: "Supprimer", action: handleOperation }
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
                <button className='addClient' onClick={handleShowForm}>Ajouter Une Client Manuellement</button>
            </div>
            {showClients && (
                <div>
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
                </div>
            )}
        </div>
    );
};

export default Clients;
