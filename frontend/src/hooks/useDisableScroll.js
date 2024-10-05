// hooks/useDisableScroll.js
import { useEffect } from 'react';

const useDisableScroll = () => {
  useEffect(() => {
    // Disable scrolling by setting overflow to hidden
    document.body.style.overflow = 'hidden';

    // Restore scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
};

export default useDisableScroll;
