// BookCar.jsx
import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import { IconCar, IconX } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import "../dist/PreBookingModule.css"
import { Toaster, toast } from "react-hot-toast";
const ReservationModal = lazy(() => import('./ReservationModal'));

function BookCar() {
  const [modal, setModal] = useState(false);
  const [carOptions, setCarOptions] = useState([]);
  const [carType, setCarType] = useState("");
  const [resDate, setResDate] = useState({
    pickTime: "",
    pickHour: "12:00",
    dropTime: "",
    dropHour: "12:00"
  });
  const [carImg, setCarImg] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    cin: "",
    nom: "",
    prenom: "",
    numTel: "",
    email: ""
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:2020/locationvoiture/v1/cars/disponibilite=true");
        setCarOptions(response.data);
      } catch (error) {
        toast.error(`Erreur lors de la recherche`, {
          style: {
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: 'Roboto, sans-serif',
            border: '2px solid red'
          },
          duration: 7000
        });
        console.error("Failed to fetch available cars:", error);
      }
    };

    fetchCars();
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (resDate.pickTime === "" || resDate.dropTime === "" || carType === "") {
      errorMsg.textContent = "Sélectionnez les paramètres !";
      errorMsg.style.display = "flex";
    } else if (new Date(resDate.dropTime) <= new Date(resDate.pickTime)) {
      errorMsg.textContent = "La date de retour doit être après la date de début !";
      errorMsg.style.display = "flex";
    } else {
      setModal(true);
      errorMsg.style.display = "none";
    }
  };

  const closeModal = () => {
    setModal(false);
  };
  const handleDateChange = (e, field) => {
    const newResDate = { ...resDate, [field]: e.target.value };
    setResDate(newResDate);
  
    // Perform validation
    if (field === 'pickTime' || field === 'dropTime') {
      validateDates(newResDate.pickTime, newResDate.dropTime);
    }
  };
  
  // Validation function to be used in handleDateChange
  const validateDates = (pickTime, dropTime) => {
    if (new Date(pickTime) > new Date(dropTime)) {
      toast.error("La date de début doit être avant la date de retour", {
        style: {
          fontSize: '1.5rem',
          fontWeight: '700',
          fontFamily: 'Roboto, sans-serif',
          border: '2px solid red'
        },
        duration: 5000
      });
      return false;
    }
    return true;
  };
  
  const confirmBooking = async (e) => {
    const reservationData = {
      startDate: `${resDate.pickTime}T${resDate.pickHour}:00`,
      endDate: `${resDate.dropTime}T${resDate.dropHour}:00`,
      reservationStatus: "EN_COUR",
      client: formData,
      car: { id: selectedCar.id }
    };
    try {
      const response = await axios.post("http://localhost:2020/locationvoiture/v1/reservation/ajouter", reservationData);
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
      const doneMsg = document.querySelector(".booking-done");
      doneMsg.style.display = "flex";
    } catch (error) {
      toast.error(`Erreur lors de la réservation`, {
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

  const handleCar = (e) => {
    const selectedCar = carOptions.find(car => `${car.anneemodele}-${car.marque} ${car.modele}` === e.target.value);
    setCarType(e.target.value);
    setCarImg(selectedCar ? selectedCar.imageUrls[0] : "");
    setSelectedCar(selectedCar);
  };


  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  const hideEMessage = () => {
    const doneMsg = document.querySelector(".error-message");
    doneMsg.style.display = "none";
  };



  return (
    <>
      <Toaster containerStyle={{
        top: 100,
        left: 320,
        inset: '50px 16px 16px 12px'
      }} />
      <section id="booking-section" className="book-section">
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Reservez Votre Voiture</h2>

              <p className="error-message">
                Sélectionnez les paramètres !<i><IconX width={25} height={20} onClick={hideEMessage} /></i>
              </p>
              <p className="booking-done">
                Vérifiez votre email et Telephone pour confirmer une commande.{" "}
                <IconX width={20} height={20} onClick={hideMessage} />
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <IconCar className="input-icon" /> &nbsp; Choisiser La Modele<b>*</b>
                  </label>
                  <select value={carType} onChange={handleCar}>
                    <option>Sélectionnez votre voiture</option>
                    {carOptions.map((car, index) => (
                      <option key={index} value={`${car.anneemodele}-${car.marque} ${car.modele}`}>
                        {`${car.anneemodele}-${car.marque} ${car.modele}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <IconCalendarEvent className="input-icon" /> &nbsp; Date de début{" "}
                    <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={resDate.pickTime}
                    onChange={(e) => handleDateChange(e, "pickTime")}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <IconCalendarEvent className="input-icon" /> &nbsp; Date de retour{" "}
                    <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={resDate.dropTime}
                    onChange={(e) => handleDateChange(e, "dropTime")}
                    type="date"
                  ></input>
                </div>

                <button onClick={openModal} type="submit">
                  Reserver
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <ReservationModal
          isOpen={modal}
          onClose={closeModal}
          carType={carType}
          carImg={carImg}
          handleDateChange={handleDateChange}
          resDate={resDate}
          handleFormChange={handleFormChange}
          confirmBooking={confirmBooking}
        />
      </Suspense>
    </>
  );
}

export default BookCar;