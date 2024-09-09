import { useState, useEffect } from "react";

export default function useMediaQuery(mediaQuery: string) {
  const [matches, setMatches] = useState(window.matchMedia(mediaQuery).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    function handleMediaQueryChange() {
      setMatches(mediaQueryList.matches);
    }

    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, [mediaQuery]);

  return matches;
}
