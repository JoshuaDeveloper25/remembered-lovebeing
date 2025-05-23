import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";


const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }

  return (
    showButton && (
      <div
        className={`
        to-top  scale-95 animation-fade fixed left-3 bottom-3 border rounded-full border-white shadow shadow-white z-[5]`}
      >
        <a
          className="bg-primary-color text-white shadow-primary-color rounded-full hover:opacity-55 hover:scale-105 animation-fade font-bold block px-3 py-3 shadow-md"
          type="button"
          href="#top"
        >
          <IoIosArrowUp size={24} />
        </a>
      </div>
    )
  );
};

export default BackToTop;
