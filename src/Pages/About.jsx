import Footer from "../components/Footer";
import TemplatePage from "../components/TemplatePage";
import PlanTrip from "../components/PlanTrip";
import AboutMain from "../images/about/about-main.jpg";
import Box1 from "../images/about/icon1.png";
import Box2 from "../images/about/icon2.png";
import Box3 from "../images/about/icon3.png";
import Banner from "../components/Banner";
import PhoneBanner from "../components/PhoneBanner";
import NumberTicker from "../components/NumberTicker"; // Import the NumberTicker component
import "../dist/AboutModule.css";

function About() {
  return (
    <>
      <section className="about-page">
        <TemplatePage name="About" />
        <Banner />
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src={AboutMain}
              alt="car-renting"
            />
            <div className="about-main__text">
              <h3>A Propos de Nous</h3>
              <h2>Nous vous garantissons un service de qualité</h2>
              <p>
                Nous somme une agence de location voiture Tunisie agissant dans le domaine
                de location de véhicules depuis 2006. Nous fournissons à nos clients un service simple,
                efficace et rapide pour la location de voiture.
              </p>
              <div className="about-main__text__icons">
                <div className="about-main__text__icons__box">
                  <img src={Box1} alt="car-icon" />
                  <span>
                    <h4><NumberTicker value={20} /></h4> {/* Use NumberTicker for 20 */}
                    <p>Voitures</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box2} alt="car-icon" />
                  <span>
                    <h4><NumberTicker value={8500} /></h4> {/* Use NumberTicker for 8500 */}
                    <p>Client</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box3} alt="car-icon" className="last-fk" />
                  <span>
                    <h4><NumberTicker value={900} /></h4> {/* Use NumberTicker for 900 */}
                    <p>Reservation</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <PlanTrip />
        </div>
      </section>
      <PhoneBanner />
      <Footer />
    </>
  );
}

export default About;
