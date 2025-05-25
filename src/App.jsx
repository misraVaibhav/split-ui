import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import GroupPage from "./pages/GroupPage.jsx";

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/groups/:groupId" element={<GroupPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
