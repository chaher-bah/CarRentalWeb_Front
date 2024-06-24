<<<<<<< HEAD
import Footer from "../components/Footer";
import TemplatePage from "../components/TemplatePage";
=======
import { IconPhone } from "@tabler/icons-react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
import PlanTrip from "../components/PlanTrip";
import AboutMain from "../images/about/about-main.jpg";
import Box1 from "../images/about/icon1.png";
import Box2 from "../images/about/icon2.png";
import Box3 from "../images/about/icon3.png";
<<<<<<< HEAD
import Banner from "../components/Banner"
import PhoneBanner from "../components/PhoneBanner";
import "../dist/AboutModule.css"
=======

>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
function About() {
  return (
    <>
      <section className="about-page">
<<<<<<< HEAD
        <TemplatePage name="About" />
        <Banner/>
=======
        <HeroPages name="About" />
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src={AboutMain}
              alt="car-renting"
            />
            <div className="about-main__text">
<<<<<<< HEAD
              <h3>A Propos de Nous</h3>
              <h2>Nous vous garantissons un service de qualité</h2>
              <p>
              Nous somme une agence de location voiture Tunisie agissant dans le domaine 
              de location de véhicules depuis 2006. Nous fournissons à nos clients un service simple, 
              efficace et rapide pour la location de voiture.
=======
              <h3>About Company</h3>
              <h2>You start the engine and your adventure begins</h2>
              <p>
                Certain but she but shyness why cottage. Guy the put instrument
                sir entreaties affronting. Pretended exquisite see cordially the
                you. Weeks quiet do vexed or whose. Motionless if no to
                affronting imprudence no precaution. My indulged as disposal
                strongly attended.
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
              </p>
              <div className="about-main__text__icons">
                <div className="about-main__text__icons__box">
                  <img src={Box1} alt="car-icon" />
                  <span>
                    <h4>20</h4>
<<<<<<< HEAD
                    <p>Voitures</p>
=======
                    <p>Car Types</p>
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box2} alt="car-icon" />
                  <span>
<<<<<<< HEAD
                    <h4>8500</h4>
                    <p>Client</p>
=======
                    <h4>85</h4>
                    <p>Rental Outlets</p>
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box3} alt="car-icon" className="last-fk" />
                  <span>
<<<<<<< HEAD
                    <h4>900</h4>
                    <p>Reservation</p>
=======
                    <h4>75</h4>
                    <p>Repair Shop</p>
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
                  </span>
                </div>
              </div>
            </div>
          </div>
          <PlanTrip />
        </div>
      </section>
<<<<<<< HEAD
      <PhoneBanner/>

=======
      <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2>Book a car by getting in touch with us</h2>
            <span>
              <IconPhone width={40} height={40} />
              <h3>(123) 456-7869</h3>
            </span>
          </div>
        </div>
      </div>
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
      <Footer />
    </>
  );
}

export default About;
