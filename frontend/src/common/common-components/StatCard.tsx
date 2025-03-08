import React from "react";

const StatCard = ({
  value,
  label,
  gradient,
}: {
  value: string;
  label: string;
  gradient: string;
}) => {
  return (
    <div
      className="stat-card"
      style={{
        background: gradient,
        padding: "20px",
        borderRadius: "35px",
        color: "#fff",
        margin: "10px",
      }}
    >
      <h2 className="stat-value">{value}</h2>
      <p className="stat-label">{label}</p>
    </div>
  );
};

export default StatCard;
