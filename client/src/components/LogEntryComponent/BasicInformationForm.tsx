import React, { useState } from "react";

interface BasicInformationFormProps {
  username: string;
  setUsername: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  toggleEdit: () => void;
}

const BasicInformationForm: React.FC<BasicInformationFormProps> = ({ username, setUsername, location, setLocation, toggleEdit }) => {
  const [newUserName, setNewUserName] = useState(username);
  const [newLocation, setNewLocation] = useState(location);

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    setUsername(newUserName);
    setLocation(newLocation);
    toggleEdit();
  };

  return (
    <form id="set-name-and-location" onSubmit={handleUpdate}>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Update username"
      />
      <input
        type="text"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
        placeholder="Update location"
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default BasicInformationForm;
