import { Link } from "react-router-dom";
import BgShape from "../images/homeComponent/bg-home.png";
import HeroCar from "../images/homeComponent/bg-car.png";
import { useEffect, useState } from "react";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";
import "../dist/HomeModule.css";
function HomeComponent() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  const bookBtn = () => {
    document
      .querySelector("#booking-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  return (
    <>
      <section id="home" className="homeComponent-section">
        <div className="container">
          <img className="bg-shape" src={BgShape} alt="bg-shape" />
          <div className="home-content">
            <div className="home-content__text">
              <h4>Planifiez votre voyage dès maintenant</h4>
              <h1>
              Économisez <span>Gros</span> avec notre agence de location
              </h1>
              <p>
              Louez la voiture de vos rêves. Prix imbattables, kilomètres illimités, options de prise en charge flexibles et bien plus encore..
              </p>
              <div className="home-content__text__btns">
                <Link
                  onClick={bookBtn}
                  className="home-content__text__btns__reservation"
                  to="/"
                >
                  Reserver &nbsp; <IconCircleCheck />
                </Link>
                <Link className="home-content__text__btns__learn-more" to="/contact">
                  Contacter Nous &nbsp; <IconChevronRight />
                </Link>
              </div>
            </div>

            {/* img */}
            <img
              src={HeroCar}
              alt="car-img"
              className="home-content__car-img"
            />
          </div>
        </div>

        {/* page up */}
        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          ^
        </div>
      </section>
    </>
  );
}

export default HomeComponent;
