import { createContext } from 'react';
// i'll change it later , this is only for phase-1 
export const AppContext = createContext({
  user: null,
  setUser: () => {},
  setShowLogin: () => {},
  backendurl: '',
  setToken: () => {}
});
