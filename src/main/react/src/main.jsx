import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import BasvuruFormu from "./BasvuruFormu.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<BasvuruFormu />} />
        </Routes>
    </BrowserRouter>
);
