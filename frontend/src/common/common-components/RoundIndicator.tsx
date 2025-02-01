import React from "react";

const RoundIndicator = ({ color, label }: { color: string; label: string }) => {
  return (
    <div
      className="d-flex"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px", // Adds spacing between the items
        paddingRight: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          width: "10px",
          height: "10px",
          borderRadius: "50%", // Makes the div a perfect circle
        }}
      />
      <div style={{ fontSize: "11px", fontWeight: "500" }}>{label}</div>
    </div>
  );
};

export default RoundIndicator;
