import { useEffect, useRef, useState } from "react";

function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = "0%",
}) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect(); // Stop observing once the element has intersected
        }
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

  return [ref, hasIntersected];
}

export default useIntersectionObserver;
