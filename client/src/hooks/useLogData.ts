import { useState } from "react";
import { LogEntry } from "../types";

export const useLogData = () => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/logs");
      const data = await response.json();
      setLogEntries(data.items);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    }
  };

  const deleteLogItem = async (id: number | undefined) => {
    try {
      await fetch(`http://localhost:3000/logs/${id}`, { method: "DELETE" });
      setLogEntries(logEntries.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete log", error);
    }
  };

  return { logEntries, setLogEntries, deleteLogItem, fetchLogs };
};
