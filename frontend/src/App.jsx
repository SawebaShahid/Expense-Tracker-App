import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Dashboard />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}

export default App;