import { Outlet } from "react-router-dom";
import Hero from "../../components/hero";
import Testimonial from "../../components/testimonial";

export default function Home() {
    return (
      <>
        <Hero />
        <Outlet/>
        <Testimonial />
      </>
    );
}