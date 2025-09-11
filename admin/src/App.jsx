import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Categories from "./pages/Categories.jsx";
import Laws from "./pages/Laws.jsx";
import UserView from "./pages/UserView.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <Router>
      <Header />
      <div className="flex">
        <Sidebar/>
        <main className="w-4/5 p-6">
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/laws" element={<Laws />} />
            <Route path="/user" element={<UserView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
