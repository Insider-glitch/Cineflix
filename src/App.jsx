import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import { SearchProvider } from './context/searchContext';
const App = () => {

  return (
    <BrowserRouter basename="/Cineflix">
      <Routes>
          {AppRoutes.map((route, index) => {
            const { element, path } = route; 
            return (
              <Route key={index} path={path} element={element} /> 
            );
          })}
      </Routes>
    </BrowserRouter>

  );
};

export default App;