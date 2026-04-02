import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Rocket,
  Send,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { WalletState } from "../hooks/useWallet";
import type { NavItem } from "../types";

interface SidebarProps {
  active: NavItem;
  onNav: (item: NavItem) => void;
  wallet: WalletState;
}

const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { id: "volume", label: "Volume Booster", icon: <Rocket size={16} /> },
  { id: "dex", label: "DEX Trending", icon: <TrendingUp size={16} /> },
  { id: "makers", label: "Makers Booster", icon: <Zap size={16} /> },
  { id: "holders", label: "Holders Booster", icon: <Users size={16} /> },
];

function WalletPill({ wallet }: { wallet: WalletState }) {
  if (!wallet.walletAvailable) {
    return (
      <a
        href="https://phantom.app"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="wallet.link"
        className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
        style={{
          background: "oklch(0.14 0.012 195)",
          border: "1px solid oklch(0.23 0.018 195 / 0.6)",
          color: "oklch(0.67 0.024 200)",
        }}
      >
        <span>Install Phantom</span>
        <span style={{ fontSize: "0.65rem", opacity: 0.6 }}>↗</span>
      </a>
    );
  }

  if (wallet.connecting) {
    return (
      <div
        className="flex items-center justify-center px-3 py-2 rounded-lg text-xs"
        style={{ color: "oklch(0.50 0.020 200)" }}
      >
        <span className="animate-pulse">Connecting...</span>
      </div>
    );
  }

  if (wallet.connected && wallet.publicKey) {
    const pk = wallet.publicKey;
    const truncated = `${pk.slice(0, 4)}...${pk.slice(-4)}`;
    return (
      <div
        className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200"
        style={{
          background: "oklch(0.83 0.155 175 / 0.08)",
          border: "1px solid oklch(0.83 0.155 175 / 0.25)",
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: "oklch(0.75 0.18 145)",
              boxShadow: "0 0 6px oklch(0.75 0.18 145 / 0.6)",
            }}
          />
          <span className="truncate" style={{ color: "oklch(0.83 0.155 175)" }}>
            {truncated}
          </span>
        </div>
        <button
          type="button"
          data-ocid="wallet.toggle"
          onClick={wallet.disconnect}
          aria-label="Disconnect wallet"
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          style={{ color: "oklch(0.60 0.020 200)" }}
        >
          <LogOut size={12} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      data-ocid="wallet.button"
      onClick={wallet.connect}
      className="w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
      style={{
        background: "transparent",
        border: "1px solid oklch(0.83 0.155 175 / 0.35)",
        color: "oklch(0.83 0.155 175)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "oklch(0.83 0.155 175 / 0.10)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      Connect Wallet
    </button>
  );
}

export function Sidebar({ active, onNav, wallet }: SidebarProps) {
  return (
    <aside
      className="sidebar-bg flex flex-col w-52 min-h-screen fixed left-0 top-0 bottom-0 z-30"
      style={{ borderRight: "1px solid oklch(0.23 0.018 195)" }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-4 py-4 border-b"
        style={{ borderColor: "oklch(0.23 0.018 195)" }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.83 0.155 175), oklch(0.65 0.13 175))",
          }}
        >
          <BarChart3 size={18} style={{ color: "oklch(0.10 0.016 195)" }} />
        </div>
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: "oklch(0.93 0.012 200)" }}
        >
          ChartUp
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-2 py-3 flex-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              data-ocid={`nav.${item.id}.link`}
              onClick={() => onNav(item.id)}
              className="flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 w-full text-left"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.83 0.155 175 / 0.2), oklch(0.72 0.13 175 / 0.12))",
                      border: "1px solid oklch(0.83 0.155 175 / 0.4)",
                      color: "oklch(0.83 0.155 175)",
                      boxShadow: "0 0 12px oklch(0.83 0.155 175 / 0.2)",
                    }
                  : {
                      background: "transparent",
                      border: "1px solid transparent",
                      color: "oklch(0.67 0.024 200)",
                    }
              }
            >
              <span
                style={{
                  color: isActive
                    ? "oklch(0.83 0.155 175)"
                    : "oklch(0.50 0.020 200)",
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Telegram Bot Link */}
        <a
          href="https://t.me/ChartUpSolanaVolume_bot"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.telegram.link"
          className="flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 mt-2"
          style={{
            background: "rgba(42,171,238,0.1)",
            border: "1px solid rgba(42,171,238,0.3)",
            color: "#2AABEE",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(42,171,238,0.18)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 12px rgba(42,171,238,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(42,171,238,0.1)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          <span style={{ color: "#2AABEE" }}>
            <Send size={16} />
          </span>
          <span>Start Volume Bot</span>
        </a>
      </nav>

      {/* Settings */}
      <div
        className="px-2 pb-2 border-t"
        style={{ borderColor: "oklch(0.23 0.018 195)", paddingTop: "0.75rem" }}
      >
        <button
          type="button"
          data-ocid="nav.settings.link"
          onClick={() => onNav("settings")}
          className="flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 w-full text-left"
          style={
            active === "settings"
              ? {
                  background:
                    "linear-gradient(135deg, oklch(0.83 0.155 175 / 0.2), oklch(0.72 0.13 175 / 0.12))",
                  border: "1px solid oklch(0.83 0.155 175 / 0.4)",
                  color: "oklch(0.83 0.155 175)",
                  boxShadow: "0 0 12px oklch(0.83 0.155 175 / 0.2)",
                }
              : {
                  background: "transparent",
                  border: "1px solid transparent",
                  color: "oklch(0.67 0.024 200)",
                }
          }
        >
          <Settings
            size={16}
            style={{
              color:
                active === "settings"
                  ? "oklch(0.83 0.155 175)"
                  : "oklch(0.50 0.020 200)",
            }}
          />
          <span>Settings</span>
        </button>
      </div>

      {/* Wallet status pill */}
      <div className="px-2 pb-3">
        <WalletPill wallet={wallet} />
      </div>

      {/* Footer */}
      <div className="px-4 py-2">
        <p className="text-xs" style={{ color: "oklch(0.40 0.015 200)" }}>
          Solana DEX Tools
        </p>
      </div>
    </aside>
  );
}
