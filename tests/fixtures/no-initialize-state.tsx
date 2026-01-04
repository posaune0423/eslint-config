// Triggers react-you-might-not-need-an-effect/no-initialize-state
// Setting initial state in useEffect instead of useState initializer.

import { useEffect, useState } from "react";

export function BadComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(1);
  }, []);

  return <div>{count}</div>;
}
