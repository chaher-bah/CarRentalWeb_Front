import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconCar, IconInfoCircleFilled, IconX } from "@tabler/icons-react";
import { IconMapPinFilled } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import "../dist/PreBookingModule.css"
function BookCar() {
  const [modal, setModal] = useState(false); //  class - active-modal
  const [carOptions, setCarOptions] = useState([]);

  // booking car
  const [carType, setCarType] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:2020/locationvoiture/v1/cars/disponibilite=true");
        setCarOptions(response.data);
        console.log(carOptions)
      } catch (error) {
        console.error("Failed to fetch available cars:", error);
      }
    };

    fetchCars();
  }, []);



  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (pickTime === "" || dropTime === "" || carType === "") {
      errorMsg.textContent = "Sélectionnez les paramètres !";
      errorMsg.style.display = "flex";
    } else if (new Date(dropTime) <= new Date(pickTime)) {
      errorMsg.textContent = "La date de retour doit être après la date de début !";
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };
  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // confirm modal booking
  const confirmBooking = (e) => {
    e.preventDefault();
    setModal(!modal);
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";
  };

  // taking value of booking inputs
  const handleCar = (e) => {
    const selectedCar = carOptions.find(car => `${car.anneemodele}-${car.marque} ${car.modele}` === e.target.value);
    setCarType(e.target.value);
    setCarImg(selectedCar ? selectedCar.imageUrls[0] : "");
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // hide message

  const hideEMessage = () => {
    const doneMsg = document.querySelector(".error-message");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Reservez Votre Voiture</h2>

              <p className="error-message">
              Sélectionnez les paramètres !<i><IconX width={25} height={20} onClick={hideEMessage}/></i>
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
                    value={pickTime}
                    onChange={handlePickTime}
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
                    value={dropTime}
                    onChange={handleDropTime}
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

      {/* modal ------------------------------------ */}

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Completer Reservation</h2>
          <i><IconX onClick={openModal} /></i>
        </div>
        {/* message */}
        <div className="booking-modal__message">
          <h4>
            <i><IconInfoCircleFilled /> </i> Pour completer votre reservation, merci de creer une compte dans notre platforme ou "SignIn" dans votre compte exictant
          </h4>
          <p >
          Notez que pour que la réservation soit bien confirmée, un membre de notre équipe vous contactera par email et par téléphone. </p>
        </div>
        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Date et Heure</h5>
              <span>
                <i><IconMapPinFilled /></i>
                <div>
                  <h6>Date de début de la location</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i><IconMapPinFilled /></i>
                <div>
                  <h6>Date de Retour</h6>
                  <p>
                    {dropTime} /{"  "}
                    <input type="time" className="input-time"></input>
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
        <div className="activemodal__buttons">
            <Link className="activemodal__buttons__sign-in" to="/"target="/">
              Sign In
            </Link>
            <Link className="activemodal__buttons__register" to="/">
              Register
            </Link>
          </div>
      </div> 
    </>
  );
}

export default BookCar;
