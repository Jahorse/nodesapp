import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width }}>
      {children}
    </viewportContext.Provider>
  );
};

export const breakpoint = 620;

export const useViewport = () => {
  const { width } = useContext(viewportContext);
  return { width };
}

export default ViewportProvider;