import Footer from "../components/Footer";
import TemplatePage from "../components/TemplatePage";
import PhoneBanner from "../components/PhoneBanner.jsx"
import {CAR_DATA} from "../components/CarData.js"
import { Link } from "react-router-dom";
import { IconCar,IconSnowflake } from "@tabler/icons-react";
import "../dist/ModelsModule.css"
function Models() {
  return (
    <>
    <section className="models-section">
      <TemplatePage name="Vehicle Models" />
      <div className="container">
        <div className="models-div">
          {CAR_DATA.map((carArray, index) => {
            const car = carArray[0];
            return (
              <div className="models-div__box" key={index}>
                <div className="models-div__box__img">
                  <img src={car.img[0]} alt="car_img" />
                  <div className="models-div__box__descr">
                    <div className="models-div__box__descr__name-price">
                      <div className="models-div__box__descr__name-price__name">
                        <p>{car.name}</p>
                      </div>
                      <div className="models-div__box__descr__name-price__price">
                        <h4>D.T {car.price}</h4>
                        <p>per day</p>
                      </div>
                    </div>
                    <div className="models-div__box__descr__name-price__details">
                      <span>
                        <IconCar /> &nbsp; {car.mark}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {car.air} &nbsp; <IconSnowflake />
                      </span>
                      <span>
                        <IconCar /> &nbsp; {car.transmission}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {car.fuel} &nbsp; <IconCar />
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__btn">
                      <Link onClick={() => window.scrollTo(0, 0)} to="/">
                        Reserver
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <PhoneBanner/>
    <Footer/>
  </>
  );
}

export default Models;
