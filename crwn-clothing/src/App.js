import { Routes, Route } from 'react-router-dom';

import Home from './routs/home/home.component.jsx';

import Navigation from './routs/navigation/navigation.component.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  ) 
}

export default App;
