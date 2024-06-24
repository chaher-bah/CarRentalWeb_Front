import { IconMail, IconPhoneCall,IconBrandFacebook,IconBrandMessenger,IconBrandWhatsapp } from "@tabler/icons-react";
import "../dist/FooterModule.css"
function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>Location</span> Voiture
              </li>
              <li>
                  Nous Fournissons à Nos Clients Un Service Simple, Efficace Et Rapide Pour La Location De Voiture 
              </li>
            </ul>
            <ul className="footer-content__2">
              <li>Heures De Travail</li>
              <li>Lun - Ven: 9:00AM - 9:00PM</li>
              <li>Sam: 9:00AM - 5:00PM</li>
              <li>Dim: Closed</li>
            </ul>
            <ul className="footer-content__3">
              <li>
                Contacter Nous
              </li>
              <li>
                <a href="tel:+21695077703">
                  <IconPhoneCall /> &nbsp; (+216) 95 077 703
                </a>
              </li>

              <li>
                <a
                  href="mailto: 
                bahrichaher.pro@gmail.com"
                >
                  <IconMail />
                  &nbsp; VoitureMobelite@gmail.com
                </a>
              </li>
              <li className="footer-socials">
                <a target="https://www.facebook.com/chaher.bahri.9/"
                href="https://www.facebook.com/chaher.bahri.9/">
                  <IconBrandFacebook/>&nbsp; 
                </a>
                <a target="https://www.messenger.com/"
                href="https://ww.messenger.com/">
                  <IconBrandMessenger/>&nbsp;
                </a>
                <a target="https://www.whatsapp.com/"
                href="https://www.whatsapp.com">
                  <IconBrandWhatsapp/>&nbsp;
                </a>
              </li>
              <li>
                <a
                  style={{ fontSize: "10px" }}
                  target="https://www.linkedin.com/in/chaher-bahri-415a19221"
                  href="https://www.linkedin.com/in/chaher-bahri-415a19221">
                  Design by Chaher BAHRI
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
