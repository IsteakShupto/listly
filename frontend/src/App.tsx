import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { Todos } from "./components/Todos";
import { RecoilRoot } from "recoil";
import { SingleTodo } from "./components/SingleTodo";
import { AddTask } from "./components/AddTask";
import { EditTask } from "./components/EditTask";

function App() {
  return (
    <RecoilRoot>
      <div className="bg-zinc-900 min-h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/todos/:id" element={<SingleTodo />} />
            <Route path="/addTask" element={<AddTask />} />
            <Route path="/editTask/:id" element={<EditTask />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
