import React, { useState } from 'react';
import { IconMail, IconMailOpened, IconPhone, IconLocation } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import PhonBanner from "../components/PhoneBanner";
import TemplatePage from "../components/TemplatePage";
import axios from 'axios';
import "../dist/ContactModule.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2020/locationvoiture/v1/contact', formData);
      alert('Votre message a été envoyé avec succès!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erreur lors de l\'envoi du message.');
    }
  };

  return (
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
            <a href="https://maps.app.goo.gl/TCge1Ae4Hj2FTuLW8" target="_blank" rel="noopener noreferrer">
              <IconLocation />
              &nbsp; Mobelite, Monastir
            </a>
          </div>
          <div className="contact-div__form">
            <form onSubmit={handleSubmit}>
              <label>
                Nom Et Prenom <b>*</b>
              </label>
              <input type="text" name="name" placeholder='E.x: "Chaher BAHRI"' value={formData.name} onChange={handleChange} required />

              <label>
                Email <b>*</b>
              </label>
              <input type="email" name="email" placeholder="youremail@example.com" value={formData.email} onChange={handleChange} required />

              <label>
                C'est quoi le Problème <b>*</b>
              </label>
              <textarea name="message" placeholder="Expliquer.." value={formData.message} onChange={handleChange} required />

              <button type="submit">
                <IconMailOpened />
                &nbsp; Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
      <Banner />
      <Footer />
    </section>
  );
}

export default Contact;
