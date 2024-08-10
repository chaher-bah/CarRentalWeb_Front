import React, { useState, useEffect, lazy, Suspense } from "react";
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import{BASE_URL} from '../Const/API_url.js'

const ReservationModal = lazy(() => import('./ReservationModal'));

function CarBox({ car }) {
  const [carLoad, setCarLoad] = useState(true);
  const [bigCar, setBigCar] = useState(null);
  const [modal, setModal] = useState(false);

  const [resDate, setResDate] = useState({
    pickTime: "",
    pickHour: "12:00",
    dropTime: "",
    dropHour: "12:00"
  });

  const [formData, setFormData] = useState({
    cin: "",
    nom: "",
    prenom: "",
    numTel: "",
    email: ""
  });

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const confirmBooking = async () => {
    const reservationData = {
      startDate: `${resDate.pickTime}T${resDate.pickHour}:00`,
      endDate: `${resDate.dropTime}T${resDate.dropHour}:00`,
      reservationStatus: "EN_COUR",
      client: formData,
      car: { id: car.id }
    };
    try {
      const response = await axios.post(BASE_URL+"reservation/ajouter", reservationData);
      toast.success("Réservation réussie!", {
        style: {
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid green'
        },
        duration: 7000
      });
      console.log(response.data);
      setModal(false);
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
      console.error("Failed to book the car:", error);
    }
  };

  const handleDateChange = (e, field) => {
    const newResDate = { ...resDate, [field]: e.target.value };
    setResDate(newResDate);
  };
  

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

  const makeitbigger = (index) => {
    setBigCar(bigCar === index ? null : index);
  };

  useEffect(() => {
    let timer;
    if (bigCar !== null) {
      timer = setTimeout(() => {
        setBigCar(null);
      }, 7000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [bigCar]);

  return (
    <div className="box-cars">
      <Toaster containerStyle={{
        top: 100,
        left: 320,
        inset: '50px 16px 16px 12px',
        zIndex:'999999'
      }} />
      {/* car images */}
      {car.imageUrls.length > 0 ? (
        <div className={`pick-car ${car.imageUrls.length > 1 ? 'image-grid' : ''}`}>
          {carLoad && <span className="loader"></span>}
          <Carousel className="carousel-cars" autoPlay autoFocus infiniteLoop interval={2000} showStatus={false} width={'120%'}>
            {car.imageUrls.map((img, index) => (
              <div
                key={index}
                className={`image-container ${bigCar === index ? 'enlarged' : ''}`}
                onClick={() => makeitbigger(index)}
              >
                <img
                  key={index}
                  // style={{ display: carLoad ? "none" : "block" }}
                  src={img}
                  alt={`car_img_${index}`}
                  onLoad={() => setCarLoad(false)}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p style={{ color: "black", fontFamily: "Roboto, sans-serif", fontSize: "40px", alignSelf: "center" }}>Images Inexistants</p>
      )}

      {/* description */}
      <div className="pick-description">
        <div className="pick-description__price">
          <span>D.T {car.fraisLocation}</span>/ Frais par Jour
        </div>
        <div className="pick-description__table">
          <div className="pick-description__table__col">
            <span>Modèle</span>
            <span>{car.modele}</span>
          </div>
          <div className="pick-description__table__col">
            <span>Marque</span>
            <span>{car.marque}</span>
          </div>
          <div className="pick-description__table__col">
            <span>Année début circulation</span>
            <span>{car.anneemodele}</span>
          </div>
          <div className="pick-description__table__col">
            <span>Transmission </span>
            <span>{car.transmission}</span>
          </div>
          <div className="pick-description__table__col">
            <span>Carburant</span>
            <span>{car.carburant}</span>
          </div>
          <div className="pick-description__table__col">
            <span>Disponible</span>
            <span>{car.disponibilite ? "Oui" : "Non"}</span>
          </div>
        </div>
        {/* btn cta */}
        <button className="cta-btn" onClick={openModal} type="submit">
          Reserver Maintenant
        </button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationModal
          isOpen={modal}
          onClose={closeModal}
          carType={`${car.anneemodele}-${car.marque} ${car.modele}`}
          carImg={car.imageUrls[0]}
          resDate={resDate}
          handleDateChange={handleDateChange}
          handleFormChange={handleFormChange}
          confirmBooking={confirmBooking}
        />
      </Suspense>
    </div>
  );
}

export default CarBox;
