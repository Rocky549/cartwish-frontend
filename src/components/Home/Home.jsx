import React from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import iPhone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  return (
    <div>
    <HeroSection
      title="Buy iPhone 14 Pro"
      subTitle="Experience The Power Of latest iPhone 14 with our most powerfull camara"
      link="/product/6679195633be487e9c079b74"
      image={iPhone}
    />
    <FeaturedProducts/>
    <HeroSection
      title="Build The Ultimate Setup"
      subTitle="You can add Studio Display and color-matched Magic accesseries to your bag after configure your mac mini."
      link="/product/6679195633be487e9c079b7b"
      image={mac}
    />
    </div>
  );
};

export default Home;
