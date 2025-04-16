import React, { useState } from "react";
import { useMain } from "../../context/MainContext";
import LogEntryItem from "../LogEntryItem";
import LogEntryForm from "./LogEntryForm";
import BasicInformationForm from "./BasicInformationForm";
import Header from "../Header";
import Footer from "../Footer";
import { deleteLog, updateLog, createLog } from "../../services/logService";
import { LogEntry } from "../../types";
import { FaGear } from "react-icons/fa6";

const LogEntryComponent: React.FC = () => {
  const { logEntries, setLogEntries, username, location, setUsername, setLocation } = useMain();
  const [isEditMode, setIsEditMode] = useState(false);


  const updateLogItem = async (logEntry: LogEntry) => {
    updateLog(logEntry)
    const logEntriesCopy = [...logEntries]
    const itemIndex = logEntriesCopy.findIndex((element) => element.id === logEntry.id);
    logEntriesCopy[itemIndex] = {...logEntry};
    setLogEntries(logEntriesCopy);
  }

  const deleteLogItem = async (id: number | undefined) => {
    if (!id) return;
  
    deleteLog(id);
    const updatedLogs = logEntries.filter((entry) => entry.id !== id);
    setLogEntries(updatedLogs);
  };
  
  const showBasicInformationForm = () => {
    if(!location && !username || isEditMode) {
      return (
        <BasicInformationForm username={username} setUsername={setUsername} location={location} setLocation={setLocation} toggleEdit={() => setIsEditMode(false)}/>
      );
    }
    return null;
  }

  const createLogHandler = async (description: string) => {
    if(!description) return;
    const newLog: LogEntry = {
      user: username,
      description,
      date: new Date(),
      location: location
    };

    const data = await createLog(newLog);
    newLog.id = data.id;
    setLogEntries([...logEntries, newLog]);
    
  }

  const showLogEntryForm = () => {
    if(location && username && !isEditMode) {
      return (
        <>
          <span id="edit-user-information" onClick={() => setIsEditMode(!isEditMode)}><FaGear /></span>
          <LogEntryForm createLogHandler={createLogHandler} />
        </>
      );
    }
    return null;
  }

  return (
    <div>
      <Header />
      <main>
        <ul>
          {logEntries.map((entry) => (
            <LogEntryItem key={entry.id} item={entry} updateLogItem={updateLogItem} deleteLogItem={deleteLogItem}/>
          ))}
        </ul>
      </main>
      <Footer>
        {showBasicInformationForm()}
        {showLogEntryForm()}
      </Footer>
    </div>
  );
};

export default LogEntryComponent;
