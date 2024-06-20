import SelectCar from "../images/plan/icon1.png";
import Contact from "../images/plan/icon2.png";
import Drive from "../images/plan/icon3.png";
import "../dist/PlanTripModule.css";

function PlanTrip() {
  return (
    <>
      <section className="plan-section">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Planifiez votre course dès maintenant</h3>
              <h2>Service Rapide et Facile</h2>
            </div>

            <div className="plan-container__boxes">
              <div className="plan-container__boxes__box">
                <img src={SelectCar} alt="icon_img" />
                <h3>Sélectionnez une voiture</h3>
                <p>Nous proposons une large gamme de véhicules pour tous vos besoins.</p> 
              </div>

              <div className="plan-container__boxes__box">
                <img src={Contact} alt="icon_img" />
                <h3>Contacter Nos Opérateurs</h3>
                <p>
                Nos opérateurs sont toujours prêts à vous aider avec toutes vos questions.
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src={Drive} alt="icon_img" />
                <h3>Let's Drive</h3>
                <p>
                Une procédure simple et facile pour réserver votre voiture
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
