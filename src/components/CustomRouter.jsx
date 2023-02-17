import Home from '../pages/Home';
import Page404 from '../pages/Page404';
import APropos from '../pages/APropos';
import Rental from '../pages/Rental';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const CustomRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<Page404 />} />
                <Route path="/" element={<Home />} />
                <Route path="/apropos" element={<APropos />}/>
                <Route path="/hebergement/:id" element={<Rental />}/>
            </Routes>
        </Router>
    )
}

export default CustomRouter