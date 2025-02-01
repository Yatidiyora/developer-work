
const VolumeStatCard = ({
    label,
    bgColor,
    border,
  }: {
    label: string;
    bgColor: string;
    border?: string | undefined;
  }) => {
    return (
      <div
        className="volume-stat-card"
        style={{
          background: bgColor,
          padding: "7px",
          borderRadius: "5px",
          color: "#fff",
          margin: "5px",
          ...(border && {border}),
        }}
      >
        <p className="volume-stat-value">{label}</p>
      </div>
    );
  };

export default VolumeStatCard
