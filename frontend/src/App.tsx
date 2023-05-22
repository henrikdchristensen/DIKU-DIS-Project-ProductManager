import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Overview from './pages/Overview';
import Product_template from './pages/Product_template';

function App() {
return (
    <Router>
    <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/product_template' element={<Product_template />} /> {/* 'UVC-8120'  */}
    </Routes>
    </Router>
);
}
  
export default App;