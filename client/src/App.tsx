import { useEffect } from "react";
import LogEntryComponent from "./components/LogEntryComponent";
import { useMain } from "./context/MainContext";
import { fetchLogs } from "./services/logService"; import "./App.scss";

function App() { 
  const { setLogEntries } = useMain();
  useEffect(() => { 
    const getLogs = async () => {
      const logs = await fetchLogs(); 
      setLogEntries(logs);
    }; 
  
    getLogs();
  }, []);

return <LogEntryComponent />; }

export default App;