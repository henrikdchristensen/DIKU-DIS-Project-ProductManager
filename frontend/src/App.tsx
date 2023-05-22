import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Overview from './pages/Overview';
import Product_template from './pages/Product_template';

function App() {
return (
    <Router>
    <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/produced_product' element={<Product_template device='UVC-8120'/>} />
    </Routes>
    </Router>
);
}
  
export default App;