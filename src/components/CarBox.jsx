import { useState } from "react";

function CarBox({ data, carID }) {
  const [carLoad, setCarLoad] = useState(true);
  return (
    <>
      {data[carID].map((car, id) => (
        <div key={id} className="box-cars">
          {/* car images*/}
          <div className="pick-car">
            {carLoad && <span className="loader"></span>}
            {car.img.map((img, index) => (
              <img
                key={index}
                style={{ display: carLoad ? "none" : "block" }}
                src={img}
                alt={`car_img_${index}`}
                onLoad={() => setCarLoad(false)}
              />
                </div>
            ))}
            ))}
            ))}
          </div>
          {/* description */}
          <div className="pick-description">
            <div className="pick-description__price">
              <span>D.T {car.price}</span>/ Frais par Jour
            </div>
            <div className="pick-description__table">
              <div className="pick-description__table__col">
                <span>Model</span>
                <span>{car.model}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Mark</span>
                <span>{car.mark}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Year</span>
                <span>{car.year}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Doors</span>
                <span>{car.doors}</span>
              </div>

              <div className="pick-description__table__col">
                <span>AC</span>
                <span>{car.air}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Transmission</span>
                <span>{car.transmission}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Fuel</span>
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
