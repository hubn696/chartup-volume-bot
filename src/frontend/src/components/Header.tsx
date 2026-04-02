import { Bell, Settings, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const iconButtons = [
  { icon: Settings, label: "Settings" },
  { icon: Bell, label: "Notifications" },
  { icon: User, label: "Profile" },
];

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ color: "oklch(0.93 0.012 200)" }}
        >
          {title}
        </h1>
        <p className="text-sm mt-1" style={{ color: "oklch(0.67 0.024 200)" }}>
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {iconButtons.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{
              background: "oklch(0.16 0.014 195)",
              border: "1px solid oklch(0.23 0.018 195)",
              color: "oklch(0.67 0.024 200)",
            }}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </header>
  );
}
