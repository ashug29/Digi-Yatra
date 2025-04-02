import { createContext, useState } from "react";

const AppContext = createContext(null);
const Toggle=createContext(null);

const AppProvider = ({ children }) => {
  const [hide, sethide] = useState(true);
  const [toggle,setToggle]=useState(true)

  return (
    <AppContext.Provider value={{ hide, sethide }}>
      <Toggle.Provider value={[toggle,setToggle]}>
      {children}
      </Toggle.Provider>
    </AppContext.Provider>
  );
};
export {AppProvider,AppContext,Toggle};
