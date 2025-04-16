import React, { useState } from "react";
import { LogEntry } from "../types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLogData } from "../../hooks/useLogData";

interface LogEntryItemProps {
  item: LogEntry;
  updateLogItem: (log: LogEntry) => void;
}

const LogEntryItem: React.FC<LogEntryItemProps> = ({ item, updateLogItem }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<LogEntry>({ ...item });

  const { deleteLogItem } = useLogData(); // Custom hook to handle API calls

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateLogItem(formData);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    deleteLogItem(item.id);
  };

  return (
    <li>
      {isEditMode ? (
        <form onSubmit={handleUpdate}>
          <input name="user" value={formData.user} onChange={handleChange} />
          <input name="location" value={formData.location} onChange={handleChange} />
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <span>{item.user}</span>
          <p>{item.description}</p>
          <button onClick={() => setIsEditMode(true)}><FaEdit /></button>
          <button onClick={handleDelete}><MdDelete /></button>
        </div>
      )}
    </li>
  );
};

export default LogEntryItem;
