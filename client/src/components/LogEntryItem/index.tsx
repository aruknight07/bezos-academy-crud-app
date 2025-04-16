import React, { useState } from "react";
import { LogEntry } from "../../types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface LogEntryItemProps {
  item: LogEntry;
  updateLogItem: (log: LogEntry) => void;
  deleteLogItem: (id: number|undefined) => void;
}

const LogEntryItem: React.FC<LogEntryItemProps> = ({ item, updateLogItem, deleteLogItem}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<LogEntry>({ ...item });

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
    // Call a function to delete log item from the API
    deleteLogItem(item.id);
  };

  const date = new Date(item.date);

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
          <span className="log-entry-title">{item.user}</span>
          <p>{item.description}</p>
          <span>Location: {item.location} - </span>
          <span>
            Date Posted: {date.toLocaleDateString("en-US")} - {date.toLocaleTimeString("en-US")}
          </span>
          <div>
            <button onClick={() => setIsEditMode(true)}><FaEdit /></button>
            <button onClick={handleDelete}><MdDelete /></button>
          </div>
        </div>
      )}
    </li>
  );
};

export default LogEntryItem;
