//TODOs
//search bar button
//drop down menu [serch by cin /email /name]
//intially 3ena tableau yetl3 fih les clients lkol per pages kol 20 fi page [full name/cin/email/reservationsID]
//delete option --> retirive the email access 
import React, { useState,useMemo } from 'react';
import SearchInput from './SearchInput';
import "../dist/ClientsModule.css"
import InfoTable from './InfoTable';
const Clients = () => {
    const TestData=[
      {cin:'145263',nom:'moula',prenom:'el Bache',email:'moulaelbash1234@gmial.mj',reservations:['56464','45646','4646','45646','4646','45646','4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'44',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      {cin:'78989',nom:'7amouda',prenom:'el 8rab',email:'wa333@gmial.mj',reservations:['4646']},
      
    ];
    const memodata=useMemo(()=>TestData);
    const columns =useMemo(()=>[
      {
        Header: "CIN",
        accessor: "cin"
      },
      {
        Header: "Nom-Prenom",
        accessor:  (row) => `${row.nom} - ${row.prenom}`,

      },
      {
        Header: "E-mail",
        accessor: "email"
      },
      {
        Header: "Reservations",
        accessor: "reservations",
        Cell: ({ value }) => value.join(', ')
      },
      
    ],[])
    const [fieldSearchedBy, setFieldSearchedBy] = useState('Num de CIN');
    const handleopr=(id)=>{
      alert(`doing the opertation on  item with ID: ${id}`);
    }
    return (
        <>
            <div className='clients-container'>
                <div className="button-container">
                    <button className='cin' onClick={() => setFieldSearchedBy('Num de CIN')}>Chercher par CIN</button>
                    <button className='email' onClick={() => setFieldSearchedBy('Email')}>Chercher par Email</button>
                    <button className='nom' onClick={() => setFieldSearchedBy('Nom et/ou Prénom')}>Chercher par Nom et/ou Prénom</button>
                </div>
                <SearchInput fieldSearchedBy={fieldSearchedBy} />
                <div className="info-table-container">
                <InfoTable data={memodata} columns={columns} operation="Supprimer"opr={handleopr}/>
                </div>
            </div>
        </>
    );
};

export default Clients;
