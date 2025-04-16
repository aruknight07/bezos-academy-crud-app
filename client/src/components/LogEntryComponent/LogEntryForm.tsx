import React, { useState } from "react";

interface LogEntryFormProps {
  createLogHandler: (description: string) => void;
}

const LogEntryForm: React.FC<LogEntryFormProps> = ({ createLogHandler }) => {
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    createLogHandler(textAreaValue);
    setTextAreaValue('');
  };

  return (
    <form id="create-log" onSubmit={handleUpdate}>
        <textarea value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} placeholder="Enter information"></textarea>
        <button>Send log</button>
      </form>
  );
};

export default LogEntryForm;
