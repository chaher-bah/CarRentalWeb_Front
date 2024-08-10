import React, { Suspense, lazy, useState, useEffect } from "react";
import axios from "axios";
import { IconSparkles } from "@tabler/icons-react";
import Page404 from "../Pages/Page404";
import "../dist/PickCarModule.css";
import{BASE_URL} from '../Const/API_url.js'

import { Link } from "react-router-dom";
const CarBox = lazy(() => import("./CarBox"));

function PickCar() {
  const [active, setActive] = useState(null);
  const [activeButtonId, setActiveButtonId] = useState(null);
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(BASE_URL+"cars");
        const carsData = response.data;
        setCarData(carsData);
        setLoading(false);
        if (carsData.length > 0) {
          setActive(carsData[0].id.toString() + "Car");
          setActiveButtonId(`btn${carsData[0].id}`);
        }
      } catch (error) {
        console.error("Failed to load cars:", error);
      }
    };

    fetchCarData();
  }, []);

  const btnID = (id) => {
    setActiveButtonId(id);
  };

  const coloringButton = (id) => {
    return activeButtonId === id ? "colored-button" : "";
  };

  const carButtons = carData.slice(0, 5).map(car => ({
    id: `btn${car.id}`,
    label: `${car.marque} ${car.modele}`,
    activeKey: car.id.toString() + "Car",
  }));

  return (
    <section className="pick-section">
      <div className="container">
        <div className="pick-container">
          <div className="pick-container__title">
            <h3>Véhicule Models</h3>
            <h2>Notre flotte de véhicules</h2>
            <h1><IconSparkles />les plus reservees<IconSparkles /></h1>
            <p>
              Choisissez parmi une variété de nos véhicules à louer pour votre
              prochaine aventure ou voyage d'affaires.
            </p>
          </div>
          <div className="pick-container__car-content">
            <div className="pick-box">
              {carButtons.map((button) => (
                <button
                  key={button.id}
                  className={`${coloringButton(button.id)}`}
                  onClick={() => {
                    setActive(button.activeKey);
                    btnID(button.id);
                  }}
                >
                  {button.label}
                </button>
              ))}
              <Link to="/models" onClick={() => window.scrollTo(0, 0)}>
              <button className="decouvrir-btn">Découvrer Plus</button>
              </Link>
            </div>
            {loading ? (
              <p style={{color: "black", fontSize: "40px",flexBasis: 'min-content'}}>Voitures En Attente...</p>
            ) : (
              carButtons.map((button) => (
                <React.Fragment key={button.activeKey}>
                  <Suspense fallback={<Page404 />}>
                    {active === button.activeKey && (
                      <CarBox
                        car={carData.find(car => car.id.toString() + "Car" === button.activeKey)}
                      />
                    )}
                  </Suspense>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PickCar;
