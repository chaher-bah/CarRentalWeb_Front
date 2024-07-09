import React, { useState, useEffect } from "react";

function CarBox({ car }) {
  const [carLoad, setCarLoad] = useState(true);
  const [bigCar, setBigCar] = useState(null);

  const makeitbigger = (index) => {
    setBigCar(bigCar === index ? null : index);
  };

  useEffect(() => {
    let timer;
    if (bigCar !== null) {
      timer = setTimeout(() => {
        setBigCar(null);
      }, 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [bigCar]);

  return (
    <div className="box-cars">
      {/* car images */}
      {car.imageUrls.length >0 ?(
      console.log(car),
      <div className={`pick-car ${car.imageUrls.length > 1 ? 'image-grid' : ''}`}>
        {carLoad && <span className="loader"></span>}
        {car.imageUrls.map((img, index) => (
          <div
            key={index}
            className={`image-container ${bigCar === index ? 'enlarged' : ''}`}
            onClick={() => makeitbigger(index)}
          >
            <img
              key={index}
              style={{ display: carLoad ? "none" : "block" }}
              src={img}
              alt={`car_img_${index}`}
              onLoad={() => setCarLoad(false)}
            />
          </div>
        ))}
      </div>):(
        <p style={{color:"black",fontFamily:"Roboto,sansSerif",fontSize:"40px",alignSelf:"center"}}>Images Inexistants</p>
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
        <a className="cta-btn" href="#booking-section">
          Reserver Maintenant
        </a>
      </div>
    </div>
  );
}

export default CarBox;
