import { useState } from "react";
import CarBox from "./CarBox";
import { CAR_DATA } from "./CarData";
import React from "react";
import "../dist/PickCarModule.css"
function PickCar() {
  const [active, setActive] = useState("FirstCar");
  const [activeButtonId, setActiveButtonId] = useState("btn1");

  const carButtons = [
    { id: "btn1", label: "VW Golf 6", activeKey: "FirstCar" },
    { id: "btn2", label: "Audi A1 S-Line", activeKey: "SecondCar" },
    { id: "btn3", label: "Toyota Camry", activeKey: "ThirdCar" },
    { id: "btn4", label: "BMW 320 ModernLine", activeKey: "FourthCar" },
    { id: "btn5", label: "Mercedes-Benz GLK", activeKey: "FifthCar" },
    { id: "btn6", label: "VW Passat CC", activeKey: "SixthCar" },
  ];

  const btnID = (id) => {
    setActiveButtonId(id === activeButtonId ? "" : id);
  };

  const coloringButton = (id) => {
    return activeButtonId === id ? "colored-button" : "";
  };

  return (
    <section className="pick-section">
      <div className="container">
        <div className="pick-container">
          <div className="pick-container__title">
            <h3>Véhicule Models</h3>
            <h2>Notre flotte de véhicules</h2>
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
            </div>
            {carButtons.map((button) => (
              <React.Fragment key={button.activeKey}>
                {active === button.activeKey && (
                  <CarBox data={CAR_DATA} carID={parseInt(button.id.replace("btn", ""), 10) - 1} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PickCar;
