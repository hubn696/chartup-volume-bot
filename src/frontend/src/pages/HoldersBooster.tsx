import { CheckCircle2, Send, Users } from "lucide-react";
import { useState } from "react";
import { Header } from "../components/Header";
import type { Order } from "../types";

interface HoldersBoosterProps {
  onOrderCreated: (order: Omit<Order, "id" | "timestamp">) => void;
}

const TELEGRAM_BOT_URL = "https://t.me/ChartUpSolanaVolume_bot";

export function HoldersBooster({ onOrderCreated }: HoldersBoosterProps) {
  const [token, setToken] = useState("");
  const [targetHolders, setTargetHolders] = useState("500");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "oklch(0.14 0.012 195)",
    border: "1px solid oklch(0.23 0.018 195)",
    borderRadius: "0.5rem",
    color: "oklch(0.93 0.012 200)",
    padding: "0.625rem 0.875rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 500,
    marginBottom: "0.375rem",
    color: "oklch(0.67 0.024 200)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  function handleSubmit() {
    if (token.length < 32) {
      setError(
        "Please enter a valid Solana token address (min 32 characters).",
      );
      return;
    }
    if (
      !targetHolders ||
      Number.isNaN(Number(targetHolders)) ||
      Number(targetHolders) <= 0
    ) {
      setError("Please enter a valid target holders count.");
      return;
    }
    setError("");
    onOrderCreated({
      token,
      service: "Holders Booster",
      targetHolders: Number(targetHolders),
      status: "running",
      startedAt: new Date(),
      durationMs: 30000,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div data-ocid="holders.success_state" className="animate-slide-up">
        <Header title="Holders Booster" subtitle="Order confirmed" />
        <div className="max-w-xl mx-auto">
          <div className="panel-modal p-8 flex flex-col items-center gap-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.83 0.155 175 / 0.15)",
                border: "2px solid oklch(0.83 0.155 175)",
                boxShadow: "0 0 20px oklch(0.83 0.155 175 / 0.4)",
              }}
            >
              <CheckCircle2
                size={32}
                style={{ color: "oklch(0.83 0.155 175)" }}
              />
            </div>
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                Holders Boost Active!
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.67 0.024 200)" }}
              >
                Target: {targetHolders} holders — running on {token.slice(0, 8)}
                ...
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #2AABEE, #229ED9)",
                  color: "#fff",
                  boxShadow: "0 0 16px rgba(42, 171, 238, 0.4)",
                }}
              >
                <Send size={14} /> Track on Telegram
              </a>
              <button
                type="button"
                data-ocid="holders.primary_button"
                onClick={() => {
                  setToken("");
                  setTargetHolders("500");
                  setSubmitted(false);
                }}
                className="btn-teal px-6 py-2.5 rounded-lg text-sm"
              >
                New Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="holders.page" className="animate-slide-up">
      <Header
        title="Holders Booster"
        subtitle="Increase token holder count organically"
      />

      {/* Telegram Bot Banner */}
      <div className="max-w-2xl mx-auto mb-5">
        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="holders.telegram_banner"
          className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-200 group"
          style={{
            background:
              "linear-gradient(135deg, rgba(42,171,238,0.12), rgba(34,158,217,0.06))",
            border: "1px solid rgba(42,171,238,0.35)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 20px rgba(42,171,238,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(42,171,238,0.2)" }}
            >
              <Send size={15} style={{ color: "#2AABEE" }} />
            </div>
            <div>
              <span
                className="text-sm font-semibold block"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                ChartUp Solana Volume Bot
              </span>
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.020 200)" }}
              >
                @ChartUpSolanaVolume_bot — Start boosting directly on Telegram
              </span>
            </div>
          </div>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0 ml-4 group-hover:opacity-100 transition-opacity"
            style={{
              background: "rgba(42,171,238,0.2)",
              color: "#2AABEE",
              border: "1px solid rgba(42,171,238,0.4)",
            }}
          >
            Open Bot ↗
          </span>
        </a>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="panel-modal p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.83 0.155 175 / 0.15)" }}
            >
              <Users size={20} style={{ color: "oklch(0.83 0.155 175)" }} />
            </div>
            <div>
              <h2
                className="font-bold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                Holders Booster
              </h2>
              <p className="text-xs" style={{ color: "oklch(0.67 0.024 200)" }}>
                Grow your token&apos;s holder base
              </p>
            </div>
          </div>

          {error && (
            <div
              data-ocid="holders.error_state"
              className="px-4 py-3 rounded-lg text-sm"
              style={{
                background: "oklch(0.577 0.245 27.325 / 0.15)",
                border: "1px solid oklch(0.577 0.245 27.325 / 0.4)",
                color: "oklch(0.80 0.12 30)",
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="holders-token" style={labelStyle}>
              Token Contract Address
            </label>
            <input
              id="holders-token"
              data-ocid="holders.input"
              type="text"
              placeholder="Enter Solana token address..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="target-holders" style={labelStyle}>
              Target Holders Count
            </label>
            <input
              id="target-holders"
              data-ocid="holders.target.input"
              type="number"
              placeholder="e.g. 500"
              value={targetHolders}
              onChange={(e) => setTargetHolders(e.target.value)}
              style={inputStyle}
              min="1"
              step="10"
            />
            <p
              className="text-xs mt-1.5"
              style={{ color: "oklch(0.50 0.020 200)" }}
            >
              Current estimated holders: ~127
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["100", "500", "1000", "2500", "5000", "10000"].map((preset) => (
              <button
                key={preset}
                type="button"
                data-ocid="holders.preset.toggle"
                onClick={() => setTargetHolders(preset)}
                className="py-2 text-xs rounded-lg transition-all duration-200"
                style={
                  targetHolders === preset
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.83 0.155 175 / 0.25), oklch(0.72 0.13 175 / 0.15))",
                        border: "1px solid oklch(0.83 0.155 175 / 0.6)",
                        color: "oklch(0.83 0.155 175)",
                      }
                    : {
                        background: "oklch(0.14 0.012 195)",
                        border: "1px solid oklch(0.23 0.018 195)",
                        color: "oklch(0.67 0.024 200)",
                      }
                }
              >
                {Number(preset) >= 1000 ? `${Number(preset) / 1000}K` : preset}
              </button>
            ))}
          </div>

          <button
            type="button"
            data-ocid="holders.submit_button"
            onClick={handleSubmit}
            className="btn-teal w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Users size={16} /> Activate Holders Boost
          </button>
        </div>
      </div>
    </div>
  );
}
