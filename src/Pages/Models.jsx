import Footer from "../components/Footer";
import TemplatePage from "../components/TemplatePage";
import PhoneBanner from "../components/PhoneBanner.jsx";
import { Link } from "react-router-dom";
import { IconCar, IconCalendarStats, IconManualGearbox, IconGasStation } from "@tabler/icons-react";
import "../dist/ModelsModule.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Models = () => {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    try {
      const response = await axios.get("http://localhost:2020/locationvoiture/v1/cars");
      const carsData = response.data;
      setCars(carsData);
      console.log(response.data)
    } catch (error) { 
      console.error("Failed to load cars:", error);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <>
      <section className="models-section">
        <TemplatePage name="Vehicle Models" />
        <div className="container">
          <div className="models-div">
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <div className="models-div__box" key={index}>
                  <div className="models-div__box__img">
                    {car.imageUrls && (
                      <img
                      src={car.imageUrls[0]}
                      alt={`car_img_${index}`}
                      />
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
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                          Reserver
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading Cars......</p>
            )}
          </div>
        </div>
      </section>
      <PhoneBanner />
      <Footer />
    </>
  );
};

export default Models;
