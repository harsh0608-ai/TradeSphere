import { useEffect } from 'react';

const KiteRedirect = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3001/login';
  }, []);

  return <div>Redirecting to login...</div>;
};

export default KiteRedirect;
