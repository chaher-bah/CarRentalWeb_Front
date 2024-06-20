import HomeComponent from "../components/HomeComponent";
import BookCar from "../components/BookCar";
import PlanTrip from "../components/PlanTrip";
import PickCar from "../components/PickCar";
import Banner from "../components/Banner";
import ChooseUs from "../components/ChooseUs";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HomeComponent />
      <BookCar />
      <PlanTrip />
      <PickCar />
      <Banner />
      <ChooseUs />
      <Footer />
    </>
  );
}

export default Home;
