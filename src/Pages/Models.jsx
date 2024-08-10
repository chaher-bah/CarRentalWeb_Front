// src/pages/Models.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconCar, IconCalendarStats, IconManualGearbox, IconGasStation } from "@tabler/icons-react";
import "../dist/ModelsModule.css";
import "../dist/PreBookingModule.css"
import TemplatePage from "../components/TemplatePage";
import { toast,Toaster } from 'react-hot-toast';
import PhoneBanner from "../components/PhoneBanner";
import Footer from "../components/Footer";
import ReservationModal from '../components/ReservationModal';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import{BASE_URL} from '../Const/API_url.js'

const Models = () => {
  const [cars, setCars] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [resDate, setResDate] = useState({ pickTime: '', pickHour: '12:00', dropTime: '', dropHour: '13:00' });
  const [formFields, setFormFields] = useState({
    cin: '',
    nom: '',
    prenom: '',
    numTel:'',
    email:''
  });

  const loadCars = async () => {
    try {
      const response = await axios.get(BASE_URL+"cars");
      const carsData = Array.isArray(response.data) ? response.data : [];

      setCars(carsData);
    } catch (error) { 
      console.error("Failed to load cars:", error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleShowModal = (id) => {
    const carToRes=cars.find(car=>car.id===id)
    setModal(true);
    setSelectedCar(carToRes);
  };

  const handleCloseModal = () => {
    setModal(false);
    setSelectedCar(null);
  };

  const handleDateChange = (e, field) => {
    const newResDate = { ...resDate, [field]: e.target.value };
    setResDate(newResDate);
  };

  const handleFormChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value
    });
  };

  const confirmBooking = async () => {
    const reservationData = {
      startDate: `${resDate.pickTime}T${resDate.pickHour}:00`,
      endDate: `${resDate.dropTime}T${resDate.dropHour}:00`,
      reservationStatus: "EN_COUR",
      client: formFields,
      car: { id: selectedCar.id }
    };

    try {
      await axios.post(BASE_URL+'reservation/ajouter', reservationData);
      toast.success("Réservation réussie!", {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid green'
        },
        duration: 7000
      });
      handleCloseModal();
    } catch (error) {
      toast.error(`Erreur lors de la réservation, Verifier E-mail / Dates`, {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid red'
        },
        duration: 7000
      });
      console.error('Failed to make reservation:', error);
    }
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };
  return (
    <>
      <section className="models-section">
      <Toaster containerStyle={{
                top: 100,
                left: 320,
                inset: '50px 16px 16px 12px'
            }} />
        <TemplatePage name="Vehicle Models" />
        <div className="cars-container">
          <div className="models-div">
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <div className="models-div__box" key={index}>
                  <div className="models-div__box__img">
                    {car.imageUrls && (
                      <Carousel responsive={responsive} autoPlay autoPlaySpeed={2500} infinite keyBoardControl centerMode={false}   pauseOnHover>
                      {car.imageUrls.map((img, index) => (
                       
                          <img
                            key={index}
                            // style={{ display: carLoad ? "none" : "block" }}
                            src={img}
                            alt={`car_img_${index}`}
                          />
                      ))}
                    </Carousel>
                      // <img src={car.imageUrls[0]} alt={`car_img_${index}`} />
                    )}
                    <div className="models-div__box__descr">
                      <div className="models-div__box__descr__name-price">
                        <div className="models-div__box__descr__name-price__name">
                          <p>{car.modele}</p>
                        </div>
                        <div className="models-div__box__descr__name-price__price">
                          <h4>D.T {car.fraisLocation}</h4>
                          <p>per day</p>
                        </div>
                      </div>
                      <div className="models-div__box__descr__name-price__details">
                        <span>
                          <IconCar /> &nbsp; {car.marque}
                        </span>
                        <span style={{ textAlign: "right" }}>
                          {car.anneemodele} &nbsp; <IconCalendarStats />
                        </span>
                        <span>
                          <IconManualGearbox /> &nbsp; {car.transmission}
                        </span>
                        <span style={{ textAlign: "right" }}>
                          {car.carburant} &nbsp; <IconGasStation />
                        </span>
                      </div>
                      <div className="models-div__box__descr__name-price__btn">
                        <button onClick={()=>{handleShowModal(car.id)}}>
                          Reserver
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "black", fontSize: "40px", fontFamily: "Roboto, sans-serif" }}>Voitures En Attente...</p>
            )}
          </div>
        </div>
      </section>
      <PhoneBanner />
      <Footer />
        {modal&&(<ReservationModal 
          isOpen={modal}
          onClose={handleCloseModal}
          carType={`${selectedCar.anneemodele}-${selectedCar.marque} ${selectedCar.modele}`}
          carImg={selectedCar.imageUrls[0]}
          resDate={resDate}
          handleDateChange={handleDateChange}
          formFields={formFields}
          handleFormChange={handleFormChange}
          confirmBooking={confirmBooking}
        />)}
    </>
  );
};

export default Models;
