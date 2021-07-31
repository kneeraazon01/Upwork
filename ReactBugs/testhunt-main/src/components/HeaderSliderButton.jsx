import React from "react";

const HeaderSliderButton = ({ second = false }) => {
  const onClickButtonHandler = () => {
    const sliderButton = document.querySelector(".header__swt0"),
      sliderButton0 = document.querySelector(".header__swt000"),
      hamburger = document.querySelector(".hamburger"),
      rightArea = document.querySelector(".right-area"),
      footer = document.querySelector(".footer__block"),
      subLinksto = document.getElementById("nftList"),
      subLinksto2 = document.getElementById("bitDiamond_list");

    if (window.innerWidth >= 425 && window.innerWidth <= 768) {
      if (!hamburger.classList.contains("closed")) {
        rightArea.classList.add("lwr");
        footer.classList.add("ccc");
      } else {
        rightArea.classList.remove("lwr");
        footer.classList.remove("ccc");
      }
    }

    hamburger.classList.toggle("closed");
    hamburger.classList.toggle("closedButton");
    rightArea.classList.toggle("closedMain");
    footer.classList.toggle("closedMain");
    sliderButton.classList.toggle("obb");
    sliderButton0.classList.toggle("obb");

    subLinksto.classList.remove("oo");
    subLinksto2.classList.remove("oo");
  };

  const onClickSecondButtonHandler = () => {
    const sliderButton = document.querySelector(".header__swt0"),
      sliderButton0 = document.querySelector(".header__swt000"),
      hamburger = document.querySelector(".hamburger"),
      rightArea = document.querySelector(".right-area"),
      footer = document.querySelector(".footer__block");

    if (window.innerWidth >= 425 && window.innerWidth <= 768) {
      if (!hamburger.classList.contains("closed")) {
        rightArea.classList.add("lwr");
        footer.classList.add("ccc");
      } else {
        rightArea.classList.remove("lwr");
        footer.classList.remove("ccc");
      }
    }
    hamburger.classList.toggle("closed");
    hamburger.classList.toggle("closedButton");
    rightArea.classList.toggle("closedMain");
    footer.classList.toggle("closedMain");
    sliderButton.classList.toggle("obb");
    sliderButton0.classList.toggle("obb");
  };

  return !second ? (
    <div className="header__swt0 obb" onClick={onClickButtonHandler}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.3194 3.75H0.347232C0.155566 3.75 0 3.93668 0 4.16668C0 4.39668 0.155566 4.58336 0.347232 4.58336H16.3194C16.5111 4.58336 16.6667 4.39668 16.6667 4.16668C16.6667 3.93668 16.5111 3.75 16.3194 3.75Z" />
        <path d="M11.4236 9.58325H0.243063C0.108896 9.58325 0 9.76993 0 9.99994C0 10.2299 0.108896 10.4166 0.243063 10.4166H11.4236C11.5578 10.4166 11.6667 10.2299 11.6667 9.99994C11.6667 9.76993 11.5577 9.58325 11.4236 9.58325Z" />
        <path d="M16.3194 15.4167H0.347232C0.155566 15.4167 0 15.6034 0 15.8334C0 16.0634 0.155566 16.2501 0.347232 16.2501H16.3194C16.5111 16.2501 16.6667 16.0634 16.6667 15.8334C16.6666 15.6034 16.5111 15.4167 16.3194 15.4167Z" />
        <path
          d="M18.3334 5.83325L14.1667 9.99992L18.3334 14.1666"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ) : (
    <div className="header__swt000" onClick={onClickSecondButtonHandler}>
      <svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.5 0.5H0.500016C0.224016 0.5 0 0.724016 0 1.00002C0 1.27602 0.224016 1.50003 0.500016 1.50003H23.5C23.776 1.50003 24 1.27602 24 1.00002C24 0.724016 23.776 0.5 23.5 0.5Z"
          fill="#7346D7"
        />
        <path
          d="M23.5 7.5H0.500016C0.224016 7.5 0 7.72402 0 8.00002C0 8.27603 0.224016 8.50005 0.500016 8.50005H23.5C23.776 8.50005 24 8.27603 24 8.00002C24 7.72402 23.776 7.5 23.5 7.5Z"
          fill="#7346D7"
        />
        <path
          d="M23.5 14.5H0.500016C0.224016 14.5 0 14.724 0 15C0 15.276 0.224016 15.5 0.500016 15.5H23.5C23.776 15.5 24 15.276 24 15C24 14.724 23.776 14.5 23.5 14.5Z"
          fill="#7346D7"
        />
      </svg>
    </div>
  );
};

export default HeaderSliderButton;
