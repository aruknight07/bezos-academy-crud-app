import { LogEntry } from "../types";

const API_URL = 'http://localhost:3000/logs';

export const fetchLogs = async (): Promise<LogEntry[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const createLog = async (logEntry: LogEntry): Promise<LogEntry> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry),
  });
  return await response.json();
};

export const updateLog = async (logEntry: LogEntry): Promise<LogEntry> => {
  const response = await fetch(`${API_URL}/${logEntry.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry),
  });
  return await response.json();
};

export const deleteLog = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
