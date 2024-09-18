import { useState } from "react";
import { useOutlet } from "react-router-dom";

export default function AnimatedOutlet() {
  const [outlet] = useState(useOutlet());
  return <>{outlet}</>;
}
