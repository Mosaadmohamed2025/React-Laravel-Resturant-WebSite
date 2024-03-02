import React, { createContext, useContext, useReducer, useState } from 'react';
import { initialState } from './AddReducer';
import AddReducer from './AddReducer';

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentMode, setCurrentMode] = useState('Light');
    const [activeMenu, setActiveMenu] = useState(false);
    const [profile, setProfile] = useState(false);
    const [state, dispatch] = useReducer(AddReducer, initialState);


    return (
      <StateContext.Provider value={{ user: state.user, dispatch: dispatch , currentMode, setCurrentMode , activeMenu, setActiveMenu,profile,setProfile, screenSize, setScreenSize }}>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);