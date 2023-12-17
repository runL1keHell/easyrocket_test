import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TodosPage} from "./pages/TodosPage/TodosPage.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<TodosPage/>} />
        </Routes>
      </BrowserRouter>
  )
}
export default App