// Triggers react-you-might-not-need-an-effect/no-direct-set-state-in-use-effect
// Setting state directly in useEffect without cleanup or async operation.

import { useEffect, useState } from "react";

export function BadComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1);
  }, []);

  return <div>{count}</div>;
}
