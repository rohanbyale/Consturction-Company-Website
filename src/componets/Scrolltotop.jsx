import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We wrap it in a small timeout if you have exit animations 
    // to ensure the scroll happens after the transition starts.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" if you prefer a sliding effect
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;