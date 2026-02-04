import { useEffect } from 'react';

const KiteRedirect = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3002/login';
  }, []);

  return <div>Redirecting to login...</div>;
};

export default KiteRedirect;
