import React, { useState } from "react";

const ToggleComponent = ({isOn, setIsOn}: {isOn: boolean, setIsOn: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <button
      className={`unique-toggle-button ${isOn ? "unique-toggle-on" : ""}`}
      onClick={handleToggle}
      aria-pressed={isOn}
    >
      <span className="unique-toggle-thumb" />
    </button>
  );
};

export default ToggleComponent;
