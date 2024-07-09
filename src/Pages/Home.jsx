import HomeComponent from "../components/HomeComponent";

import { Suspense, lazy } from "react";
import Page404 from "./Page404";
const BookCar =lazy(()=>import( "../components/BookCar"));
const PlanTrip =lazy(()=>import( "../components/PlanTrip"));
const Footer =lazy(()=>import( "../components/Footer"));
const PickCar =lazy(()=>import( "../components/PickCar"));
const Banner =lazy(()=>import( "../components/Banner"));
const ChooseUs =lazy(()=>import( "../components/ChooseUs"));
function Home() {
  return (
    <>
      <HomeComponent />
      <Suspense fallback={<Page404/>}>
      <PickCar />
      <PlanTrip />
      <BookCar />
      <Banner />
      <ChooseUs />
      <Footer /></Suspense>
    </>
  );
}

export default Home;
