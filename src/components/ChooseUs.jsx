import MainImg from "../images/chooseUs/main.png";
import Box1 from "../images/chooseUs/icon1.png";
import Box2 from "../images/chooseUs/icon2.png";
import "../dist/ChooseUsModule.css"
import { Link } from "react-router-dom";
function ChooseUs() {
  return (
    <>
      <section className="choose-section">
        <div className="container">
          <div className="choose-container">
            <img
              className="choose-container__img"
              src={MainImg}
              alt="car_img"
            />
            <div className="text-container">
              <div className="text-container__left">
                <h4>Pourqoi Louer Avec Nous?</h4>
<<<<<<< HEAD
                <h2>Les Prix Les <span><Link onClick={() => window.scrollTo(0, 0)} to="/models">Moins Cher</Link></span> En Tunisie.</h2>
=======
                <h2>Les Prix Les <span><Link onClick={window.scrollTo({top: 0,behavior: "smooth"})} to="/models">Moins Cher</Link></span> En Tunisie.</h2>
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
              </div>
              <div className="text-container__right">
                <div className="text-container__right__box">
                  <img src={Box1} alt="car-img" />
                  <div className="text-container__right__box__text">
                    <h4>Une Flotte De véhicules Neuf</h4>
                    <p>
                    Nous offrons à nos clients des voitures à louer neufs, bien entretenues avec zéro défaut pour que vous n’ayez pas de surprises lors de vos déplacements
                    </p>
                  </div>
                </div>
                <div className="text-container__right__box">
                  {" "}
                  <img src={Box2} alt="coin-img" />
                  <div className="text-container__right__box__text">
                    <h4>Prix Tous Inclus</h4>
                    <p>
                    Profitez de la tranquillité d'esprit avec notre politique sans frais cachés. Nous croyons en une tarification transparente et honnête.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChooseUs;
