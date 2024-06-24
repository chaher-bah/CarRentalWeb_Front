<<<<<<< HEAD
import { IconMail, IconMailOpened, IconPhone,IconLocation } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import PhonBanner from "../components/PhoneBanner"
import TemplatePage from "../components/TemplatePage";
import "../dist/ContactModule.css"
=======
import { IconMail, IconMailOpened, IconPhone } from "@tabler/icons-react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { IconLocation } from "@tabler/icons-react";

>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
function Contact() {
  return (
    <>
      <section className="contact-page">
<<<<<<< HEAD
        <TemplatePage name="Contact" />
        <PhonBanner />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Plus d'information?</h2>
              <p>
              Nous Fournissons à Nos Clients Un Service Simple, Efficace Et Rapide Pour La Location De Voiture .
              </p>
              <a href="tel:+21695077703">
                  <IconPhone /> &nbsp; (+216) 95 077 703
                </a>
                <a href="mailto: bahrichaher.pro@gmail.com">
                  <IconMail />&nbsp; VoitureMobelite@gmail.com
                </a>
              <a href="https://maps.app.goo.gl/TCge1Ae4Hj2FTuLW8" target="https://maps.app.goo.gl/TCge1Ae4Hj2FTuLW8">
                <IconLocation />
                &nbsp; Mobelite, Monastir
=======
        <HeroPages name="Contact" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Need additional information?</h2>
              <p>
                A multifaceted professional skilled in multiple fields of
                research, development as well as a learning specialist. Over 15
                years of experience.
              </p>
              <a href="/">
                <IconPhone /> &nbsp; (123) 456-7869
              </a>
              <a href="/">
                <IconMail /> &nbsp; carrental@carmail.com
              </a>
              <a href="/">
                <IconLocation />
                &nbsp; Belgrade, Serbia
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
              </a>
            </div>
            <div className="contact-div__form">
              <form>
                <label>
<<<<<<< HEAD
                  Nom Et Prenom <b>*</b>
                </label>
                <input type="text" placeholder='E.x: "Chaher BAHRI"'></input>
=======
                  Full Name <b>*</b>
                </label>
                <input type="text" placeholder='E.g: "Joe Shmoe"'></input>
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com"></input>

                <label>
<<<<<<< HEAD
                  C'est quoi le Problème <b>*</b>
                </label>
                <textarea placeholder="Expliquer.."></textarea>

                <button type="submit">
                  <IconMailOpened />
                  &nbsp; Envoyer
=======
                  Tell us about it <b>*</b>
                </label>
                <textarea placeholder="Write Here.."></textarea>

                <button type="submit">
                  <IconMailOpened />
                  &nbsp; Send Message
>>>>>>> b52d87e57ac1febc89a724d5245463503068c073
                </button>
              </form>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <Banner/>
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
      </section>
    </>
  );
}

export default Contact;
