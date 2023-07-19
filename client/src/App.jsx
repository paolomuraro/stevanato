import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Admin, Login, Results } from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
