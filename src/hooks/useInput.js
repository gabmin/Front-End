import { useState, useCallback } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter];
};
