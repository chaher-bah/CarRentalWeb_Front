import { useState,useEffect } from "react";
function CarBox({ data, carID }) {
  const [carLoad, setCarLoad] = useState(true);
  const [bigCar,setBigCAr]=useState(null);
  const makeitbigger=(index)=>{
    setBigCAr(bigCar===index ?null:index);
  };
  useEffect(() => {
    let timer;
    if (bigCar !== null) {
      timer = setTimeout(() => {
        setBigCAr(null);
      }, 800); 
    }

    return () => {
      clearTimeout(timer);
    };
  }, [bigCar]);
  return (
    <>
      {data[carID].map((car, id) => (
        <div key={id} className="box-cars">
          {/* car images*/}
          <div className={`pick-car ${car.img.length > 1 ? 'image-grid' : ''}`}>
            {carLoad && <span className="loader"></span>}
            {car.img.map((img, index) => (
              <div key={index}  className={`image-container ${bigCar === index ? 'enlarged' : ''}`} onClick={() => makeitbigger(index)}>  
                <img
                  key={index}
                  style={{ display: carLoad ? "none" : "block" }}
                  src={img}
                  alt={`car_img_${index}`}
                  onLoad={() => setCarLoad(false)}
                />
              </div>
            ))}
          </div>
          {/* description */}
          <div className="pick-description">
            <div className="pick-description__price">
              <span>D.T {car.price}</span>/ Frais par Jour
            </div>
            <div className="pick-description__table">
              <div className="pick-description__table__col">
                <span>Modèle</span>
                <span>{car.model}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Marque</span>
                <span>{car.mark}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Année début circulation</span>
                <span>{car.year}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Portes</span>
                <span>{car.doors}</span>
              </div>

              <div className="pick-description__table__col">
                <span>AC</span>
                <span>{car.air}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Transmission </span>
                <span>{car.transmission}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Carburant</span>
                <span>{car.fuel}</span>
              </div>
            </div>
            {/* btn cta */}
            <a className="cta-btn" href="#booking-section">
              Reserver Maintenant
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default CarBox;
