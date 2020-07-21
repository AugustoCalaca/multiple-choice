import React, { useEffect, useState, Suspense, Fragment } from 'react';

const SuspenseSSR = ({ children, ssr, fallback }) => {
  const [suspense, setSuspense] = useState(!ssr);
  useEffect(() => {
    if (!suspense) {
      setSuspense(true);
    }
  }, [ssr]);

  return suspense || !ssr ? <Suspense fallback={fallback}>{children}</Suspense> : <Fragment>{children}</Fragment>;
};

export default SuspenseSSR;
