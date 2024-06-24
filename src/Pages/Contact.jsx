import { IconMail, IconMailOpened, IconPhone,IconLocation } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import PhonBanner from "../components/PhoneBanner"
import TemplatePage from "../components/TemplatePage";
import "../dist/ContactModule.css"
function Contact() {
  return (
    <>
      <section className="contact-page">
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
              </a>
            </div>
            <div className="contact-div__form">
              <form>
                <label>
                  Nom Et Prenom <b>*</b>
                </label>
                <input type="text" placeholder='E.x: "Chaher BAHRI"'></input>

                <label>
                  Email <b>*</b>
                </label>
                <input type="email" placeholder="youremail@example.com"></input>

                <label>
                  C'est quoi le Problème <b>*</b>
                </label>
                <textarea placeholder="Expliquer.."></textarea>

                <button type="submit">
                  <IconMailOpened />
                  &nbsp; Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
        <Banner/>
        <Footer />
      </section>
    </>
  );
}

export default Contact;
