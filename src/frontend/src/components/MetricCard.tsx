interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export function MetricCard({
  label,
  value,
  subtext,
  icon,
  trend,
  trendUp,
}: MetricCardProps) {
  return (
    <div className="panel p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "oklch(0.67 0.024 200)" }}
        >
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: "oklch(0.83 0.155 175 / 0.12)",
            color: "oklch(0.83 0.155 175)",
          }}
        >
          {icon}
        </div>
      </div>
      <div>
        <div className="metric-value">{value}</div>
        {subtext && (
          <p
            className="text-xs mt-1"
            style={{ color: "oklch(0.67 0.024 200)" }}
          >
            {subtext}
          </p>
        )}
      </div>
      {trend && (
        <div
          className="text-xs font-medium"
          style={{
            color: trendUp ? "oklch(0.83 0.155 175)" : "oklch(0.65 0.18 25)",
          }}
        >
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </div>
  );
}
