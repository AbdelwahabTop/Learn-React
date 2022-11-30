import { Routes, Route } from 'react-router-dom';

import Home from './routs/home/home.component.jsx';
import Navigation from './routs/navigation/navigation.component.jsx';
import Authentication from './routs/authentication/authentication.component.jsx';
import Shop from './routs/shop/shop.component.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  ) 
}

export default App;
