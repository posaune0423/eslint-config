// Triggers react-you-might-not-need-an-effect/no-empty-effect

import { useEffect } from "react";

export function BadComponent() {
  useEffect(() => {}, []);
  return <div>Bad</div>;
}
