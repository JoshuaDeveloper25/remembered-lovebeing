import { useEffect, useRef, useState } from "react";

function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = "0%",
}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, root, rootMargin]);

  return [ref, isIntersecting];
}

export default useIntersectionObserver;
