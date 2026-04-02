export function ActivityChart() {
  const bars = [
    { height: 45, active: false, id: "b1" },
    { height: 62, active: false, id: "b2" },
    { height: 38, active: false, id: "b3" },
    { height: 75, active: false, id: "b4" },
    { height: 55, active: false, id: "b5" },
    { height: 88, active: true, id: "b6" },
    { height: 67, active: false, id: "b7" },
    { height: 92, active: false, id: "b8" },
    { height: 71, active: false, id: "b9" },
    { height: 83, active: true, id: "b10" },
    { height: 59, active: false, id: "b11" },
    { height: 97, active: false, id: "b12" },
  ];

  return (
    <div className="panel p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-semibold"
          style={{ color: "oklch(0.93 0.012 200)" }}
        >
          Activity Feed
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.83 0.155 175 / 0.15)",
            color: "oklch(0.83 0.155 175)",
          }}
        >
          Live
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-24">
        {bars.map((bar) => (
          <div
            key={bar.id}
            className="flex-1 rounded-sm transition-all duration-300"
            style={{
              height: `${bar.height}%`,
              background: bar.active
                ? "oklch(0.83 0.155 175)"
                : "oklch(0.72 0.13 175 / 0.4)",
              boxShadow: bar.active
                ? "0 0 8px oklch(0.83 0.155 175 / 0.7)"
                : "none",
            }}
          />
        ))}
      </div>
      <div
        className="flex items-center justify-between text-xs"
        style={{ color: "oklch(0.50 0.020 200)" }}
      >
        <span>Last 12 hrs</span>
        <span>Peak: 97%</span>
      </div>
    </div>
  );
}
