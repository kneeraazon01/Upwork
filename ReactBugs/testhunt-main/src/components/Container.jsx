import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hamburger from "./Hamburger";

const Container = ({ children }) => {
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sliderButton = document.querySelector(".header__swt0"),
        hamburger = document.querySelector(".hamburger"),
        hamburgerLinks = document.querySelector(".hamburger__links");

      if (window.innerHeight < 669 && !hamburger.classList.contains("zzz")) {
        hamburger.classList.add("zzz");
        sliderButton.classList.add("kkk");
        hamburgerLinks.classList.add("ooo");
      } else if (
        window.innerHeight > 669 &&
        hamburger.classList.contains("zzz")
      ) {
        hamburger.classList.remove("zzz");
        sliderButton.classList.remove("kkk");
        hamburgerLinks.classList.remove("ooo");
      }
    }, 100);

    const onResize = () => {
      const sliderButton = document.querySelector(".header__swt0"),
        hamburger = document.querySelector(".hamburger"),
        hamburgerLinks = document.querySelector(".hamburger__links"),
        rightArea = document.querySelector(".right-area"),
        footer = document.querySelector(".footer__block");

      if (
        window.innerWidth <= 768 &&
        window.innerWidth > 425 &&
        hamburger.classList.contains("closed") &&
        !rightArea.classList.contains("lwr")
      ) {
        hamburger.classList.remove("closed");
        hamburger.classList.remove("closedButton");
      }
      if (
        (window.innerWidth <= 425 || window.innerWidth > 768) &&
        hamburger.classList.contains("closed") &&
        !rightArea.classList.contains("lwr")
      ) {
        rightArea.classList.add("lwr");
        footer.classList.add("ccc");
      }
      if (window.innerHeight < 720 && !hamburger.classList.contains("zzz")) {
        hamburger.classList.add("zzz");
        sliderButton.classList.add("kkk");
        hamburgerLinks.classList.add("ooo");
      } else if (
        window.innerHeight > 720 &&
        hamburger.classList.contains("zzz")
      ) {
        hamburger.classList.remove("zzz");
        sliderButton.classList.remove("kkk");
        hamburgerLinks.classList.remove("ooo");
      }
    };

    const onScroll = () => {
      const hamburger = document.querySelector(".hamburger"),
        header = document.querySelector(".header");

      const scrollPosition = () =>
        window.pageYOffset || document.documentElement.scrollTop;

      if (
        scrollPosition() > lastScroll &&
        !hamburger.classList.contains("zzz-zzz")
      ) {
        hamburger.classList.add("zzz-zzz");
        header.classList.add("zzz-ooo");
      } else if (
        scrollPosition() < lastScroll &&
        hamburger.classList.contains("zzz-zzz")
      ) {
        hamburger.classList.remove("zzz-zzz");
        header.classList.remove("zzz-ooo");
      }
      setLastScroll(scrollPosition());
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [lastScroll, setLastScroll]);

  return (
    <>
      <Header />
      <section className="main">
        <Hamburger />
        <div className="container">
          <div className="right-area">{children}</div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Container;
