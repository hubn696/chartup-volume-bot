import {
  ArrowDownToLine,
  Bell,
  Check,
  Copy,
  ExternalLink,
  Globe,
  LogOut,
  Settings as SettingsIcon,
  Shield,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Header } from "../components/Header";
import type { WalletState } from "../hooks/useWallet";

const DEPOSIT_ADDRESS = "896ktWayJEkRWsMZKFQYWdEhJaAmv3HQDCn4CBPBofmF";

interface SettingsPageProps {
  wallet: WalletState;
}

function WalletSection({ wallet }: { wallet: WalletState }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!wallet.publicKey) return;
    navigator.clipboard.writeText(wallet.publicKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!wallet.walletAvailable) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs" style={{ color: "oklch(0.67 0.024 200)" }}>
          Phantom wallet not detected. Install it to connect your Solana wallet.
        </p>
        <a
          href="https://phantom.app"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="settings.wallet.link"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
          style={{
            border: "1px solid oklch(0.83 0.155 175 / 0.4)",
            color: "oklch(0.83 0.155 175)",
            background: "transparent",
          }}
        >
          <ExternalLink size={12} />
          Install Phantom
        </a>
      </div>
    );
  }

  if (wallet.connected && wallet.publicKey) {
    return (
      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.67 0.024 200)" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "oklch(0.75 0.18 145)",
              boxShadow: "0 0 6px oklch(0.75 0.18 145 / 0.6)",
            }}
          />
          <span>Connected</span>
        </div>

        {/* Public key box */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
          style={{
            background: "oklch(0.14 0.012 195)",
            border: "1px solid oklch(0.23 0.018 195)",
          }}
        >
          <code
            className="flex-1 text-xs font-mono break-all"
            style={{ color: "oklch(0.83 0.155 175)" }}
          >
            {wallet.publicKey}
          </code>
          <button
            type="button"
            data-ocid="settings.wallet.button"
            onClick={handleCopy}
            aria-label="Copy public key"
            className="flex-shrink-0 p-1.5 rounded transition-colors"
            style={{
              color: copied ? "oklch(0.75 0.18 145)" : "oklch(0.50 0.020 200)",
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        {/* SOL Balance placeholder */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
          style={{
            background: "oklch(0.14 0.012 195)",
            border: "1px solid oklch(0.23 0.018 195)",
          }}
        >
          <span style={{ color: "oklch(0.67 0.024 200)" }}>SOL Balance</span>
          <span style={{ color: "oklch(0.93 0.012 200)", fontWeight: 600 }}>
            -- SOL
          </span>
        </div>

        <button
          type="button"
          data-ocid="settings.wallet.secondary_button"
          onClick={wallet.disconnect}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 w-fit"
          style={{
            border: "1px solid oklch(0.577 0.245 27.325 / 0.35)",
            color: "oklch(0.80 0.12 30)",
            background: "transparent",
          }}
        >
          <LogOut size={12} />
          Disconnect Wallet
        </button>
      </div>
    );
  }

  // Not connected
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs" style={{ color: "oklch(0.67 0.024 200)" }}>
        Connect your Phantom wallet to fund orders and track your balance.
      </p>
      <button
        type="button"
        data-ocid="settings.wallet.button"
        onClick={wallet.connect}
        disabled={wallet.connecting}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 w-fit"
        style={{
          border: "1px solid oklch(0.83 0.155 175 / 0.4)",
          color: wallet.connecting
            ? "oklch(0.50 0.020 200)"
            : "oklch(0.83 0.155 175)",
          background: "transparent",
        }}
      >
        <Wallet size={12} />
        {wallet.connecting ? "Connecting..." : "Connect Wallet"}
      </button>
    </div>
  );
}

function DepositSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs" style={{ color: "oklch(0.67 0.024 200)" }}>
        Send SOL to this address to fund your ChartUp balance. Deposits are
        reflected within 1–2 confirmations.
      </p>

      {/* Address box */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg"
        style={{
          background: "oklch(0.14 0.012 195)",
          border: "1px solid oklch(0.83 0.155 175 / 0.25)",
        }}
      >
        <code
          className="flex-1 text-xs font-mono break-all select-all"
          style={{ color: "oklch(0.83 0.155 175)" }}
        >
          {DEPOSIT_ADDRESS}
        </code>
        <button
          type="button"
          data-ocid="settings.deposit.copy"
          onClick={handleCopy}
          aria-label="Copy deposit address"
          className="flex-shrink-0 p-1.5 rounded transition-colors"
          style={{
            color: copied ? "oklch(0.75 0.18 145)" : "oklch(0.50 0.020 200)",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      {copied && (
        <p className="text-xs" style={{ color: "oklch(0.75 0.18 145)" }}>
          Address copied to clipboard!
        </p>
      )}

      <div
        className="flex items-start gap-2 px-3 py-2 rounded-lg text-xs"
        style={{
          background: "oklch(0.83 0.155 175 / 0.06)",
          border: "1px solid oklch(0.83 0.155 175 / 0.15)",
          color: "oklch(0.67 0.024 200)",
        }}
      >
        <span style={{ color: "oklch(0.83 0.155 175)", marginTop: "1px" }}>
          ℹ
        </span>
        <span>
          Only send SOL (Solana) to this address. Sending other tokens may
          result in permanent loss.
        </span>
      </div>
    </div>
  );
}

export function SettingsPage({ wallet }: SettingsPageProps) {
  return (
    <div data-ocid="settings.page" className="animate-slide-up">
      <Header title="Settings" subtitle="Configure your ChartUp preferences" />
      <div className="max-w-2xl space-y-4">
        {/* Deposit Address */}
        <div data-ocid="settings.item.deposit" className="panel p-5">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.83 0.155 175 / 0.12)",
                color: "oklch(0.83 0.155 175)",
              }}
            >
              <ArrowDownToLine size={18} />
            </div>
            <div>
              <h3
                className="text-sm font-semibold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                Deposit Address
              </h3>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.67 0.024 200)" }}
              >
                Your ChartUp SOL funding address
              </p>
            </div>
          </div>
          <DepositSection />
        </div>

        {/* Wallet Configuration — real logic */}
        <div data-ocid="settings.item.1" className="panel p-5">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.83 0.155 175 / 0.12)",
                color: "oklch(0.83 0.155 175)",
              }}
            >
              <Wallet size={18} />
            </div>
            <div>
              <h3
                className="text-sm font-semibold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                Wallet Configuration
              </h3>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.67 0.024 200)" }}
              >
                Connect and manage your Solana funding wallet
              </p>
            </div>
          </div>
          <WalletSection wallet={wallet} />
        </div>

        {/* Other settings */}
        {(
          [
            {
              icon: <Bell size={18} />,
              title: "Notifications",
              desc: "Configure alerts for order status and completions",
              action: "Configure",
              ocid: "settings.item.2",
            },
            {
              icon: <Shield size={18} />,
              title: "API & Security",
              desc: "Manage API keys and security settings",
              action: "Manage",
              ocid: "settings.item.3",
            },
            {
              icon: <Globe size={18} />,
              title: "Network Settings",
              desc: "Configure RPC endpoints and network preferences",
              action: "Configure",
              ocid: "settings.item.4",
            },
          ] as const
        ).map((s) => (
          <div
            key={s.title}
            data-ocid={s.ocid}
            className="panel p-5 flex items-center gap-4"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "oklch(0.83 0.155 175 / 0.12)",
                color: "oklch(0.83 0.155 175)",
              }}
            >
              {s.icon}
            </div>
            <div className="flex-1">
              <h3
                className="text-sm font-semibold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.67 0.024 200)" }}
              >
                {s.desc}
              </p>
            </div>
            <button
              type="button"
              data-ocid={`${s.ocid}.button`}
              className="btn-ghost-teal px-4 py-1.5 rounded-lg text-xs font-medium"
            >
              {s.action}
            </button>
          </div>
        ))}

        <div className="panel p-5">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon
              size={18}
              style={{ color: "oklch(0.83 0.155 175)" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(0.93 0.012 200)" }}
            >
              App Info
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {(
              [
                ["Version", "v1.2.0"],
                ["Network", "Solana Mainnet"],
                ["Supported DEXes", "Raydium, Jupiter, Orca"],
                ["Pairs", "SOL, USDC, USD1"],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <span
                  style={{
                    color: "oklch(0.50 0.020 200)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {k}
                </span>
                <p
                  className="font-medium mt-0.5"
                  style={{ color: "oklch(0.93 0.012 200)" }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
