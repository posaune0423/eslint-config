// Triggers react-hooks/exhaustive-deps
// Missing dependency in useEffect.

import { useEffect } from "react";

export function BadComponent({ count }: { count: number }) {
  useEffect(() => {
    console.log(count);
  }, []);
  return <div>{count}</div>;
}
