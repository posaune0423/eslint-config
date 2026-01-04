// Triggers react-hooks/rules-of-hooks
// Hooks should not be called conditionally.

import { useEffect } from "react";

export function BadComponent({ condition }: { condition: boolean }) {
  if (condition) {
    useEffect(() => {}, []);
  }
  return <div>Bad</div>;
}
