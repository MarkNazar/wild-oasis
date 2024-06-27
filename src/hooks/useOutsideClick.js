import { useEffect, useRef } from "react";

const useOutsideClick = (handlerclose, listenCapturing = true) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handlerclose();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handlerclose, listenCapturing]);

  return { ref };
};

export default useOutsideClick;
