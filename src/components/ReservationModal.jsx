import React from 'react';
import { IconX, IconInfoCircleFilled, IconMapPinFilled } from "@tabler/icons-react";
import Form from '../components/Form';
import { toast } from "react-hot-toast";

const ReservationModal = ({ 
  isOpen, 
  onClose, 
  carType, 
  carImg, 
  resDate, 
  handleDateChange,  
  handleFormChange, 
  confirmBooking 
}) => {
  if (!isOpen) return null;
  const formFields = [
    { name: 'cin', label: 'Cin', type: 'text', required: true },
    { name: 'nom', label: 'Nom', type: 'text', required: true },
    { name: 'prenom', label: 'Prénom', type: 'text', required: true },
    { name: 'numTel', label: 'Numéro de Téléphone', type: 'text', placeholder: '+21695077703', pattern: '^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$', required: true },
    { name: 'email', label: 'Email de Client', type: 'email', placeholder: 'test1234@gmail.com', required: false },
  ];  
  
  
  
  
  const validateDates = (pickTime, dropTime) => {
    if (new Date(pickTime) > new Date(dropTime)) {
      toast.error("La date de début doit être avant la date de retour", {
        style: {
          fontSize: '1.5rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid red',
        },
        duration: 5000
      });
      return false;
    }
    return true;
  };

  const handleDateChangeWithValidation = (e, field) => {
    handleDateChange(e, field);
    const updatedDate = { ...resDate, [field]: e.target.value };
    if (field === 'pickTime' || field === 'dropTime') {
      validateDates(updatedDate.pickTime, updatedDate.dropTime);
    }
  };;

  return (
    <div className="booking-modal active-modal">
      <div className="booking-modal__title">
        <h2>Completer Reservation</h2>
        <i><IconX onClick={onClose} /></i>
      </div>
      <div className="booking-modal__message">
        <h4>
          <i><IconInfoCircleFilled /> </i> Pour completer votre reservation, merci de creer une compte dans notre platforme ou Complétez le formulaire ci dessous
        </h4>
        <p>
          Notez que pour que la réservation soit bien confirmée, un membre de notre équipe vous contactera par email et par téléphone.
        </p>
      </div>
      <div className="booking-modal__car-info">
        <div className="dates-div">
          <div className="booking-modal__car-info__dates">
            <h5>Date et Heure</h5>
            <span>
              <i><IconMapPinFilled /></i>
              <div>
                <h6>Date de début <b> *</b></h6>
                <p>
                  <input type="date" className="input-date" value={resDate.pickTime} required onChange={(e) => handleDateChangeWithValidation(e, 'pickTime')}></input>{" / "}
                  <input type="time" className="input-time" required value={resDate.pickHour} onChange={(e) => handleDateChangeWithValidation(e, 'pickHour')}></input>
                </p>
              </div>
            </span>
          </div>
          <div className="booking-modal__car-info__dates">
            <span>
              <i><IconMapPinFilled /></i>
              <div>
                <h6>Date de Retour<b> *</b></h6>
                <p>
                  <input type="date" className="input-date" value={resDate.dropTime} required onChange={(e) => handleDateChangeWithValidation(e, 'dropTime')}></input>{" / "}
                  <input type="time" className="input-time" required value={resDate.dropHour} onChange={(e) => handleDateChangeWithValidation(e, 'dropHour')}></input>
                </p>
              </div>
            </span>
          </div>
        </div>
        <div className="booking-modal__car-info__model">
          <h5>
            <span>Voiture -</span> {carType}
          </h5>
          {carImg && <img src={carImg} alt="car_img" />}
        </div>
      </div>
      <div className="booking-modal__user-info">
        <h5>Données Personelle</h5>
        <Form
          fields={formFields}
          buttonLabel="Reserver Maintenaint"
          onSubmit={confirmBooking}
          onChanger={handleFormChange}
        />
      </div>
    </div>
  );
};

export default ReservationModal;
