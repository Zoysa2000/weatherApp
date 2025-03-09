import React from 'react';
import './Style/style.css';
import Home from './Screen/Home';
import Data from './Screen/Data';
import {BrowserRouter as
    Router,
    Routes,
    Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
     <Routes>
     <Route exact path="/" element={<Home/>}></Route>
     <Route exact path="/Data" element={<Data/>}></Route>
     </Routes>
   </Router>
    </div> 
  );
}

export default App;