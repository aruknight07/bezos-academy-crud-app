import { createContext, useContext, useState, ReactNode } from 'react';
import { LogEntry } from '../types';

interface MainContextType {
  username: string;
  setUsername: (name: string) => void;
  location: string;
  setLocation: (name: string) => void;
  logEntries: LogEntry[];
  setLogEntries: (logEntries: LogEntry[]) => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  return (
    <MainContext.Provider value={{ username, setUsername, location, setLocation, logEntries, setLogEntries }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error('useMain must be used within MainProvider');
  return context;
};
