import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Overview from './pages/Overview';
import Parameters from './pages/Parameters';
  
export interface properties {
  listActive: number;
  setListActive: Function;
  searchQuery: string;
  setSearchQuery: Function;
}

function App() {
return (
    <Router>
    <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/parameters' element={<Parameters/>} />
    </Routes>
    </Router>
);
}
  
export default App;