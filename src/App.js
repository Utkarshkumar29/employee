import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import HomePage from "./page/homePage";
import Book from "./components/book";
import Saved from "./components/saved";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/:id" element={<Book/>}/>
                <Route path="/saved" element={<Saved/>}/>
            </Routes>
        </Router>
    )
}

export default App;
