import { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";

function App() {
  const router = useRoutes(routes);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const changeMode = (mode) => {
    setDarkMode(mode);
  };
  return (
    <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header changeTaskMode={changeMode} />
      {router}
    </div>
  );
}

export default App;
