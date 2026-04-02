import { Slider } from "@/components/ui/slider";
import { CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";
import { Header } from "../components/Header";
import type { Order } from "../types";

interface MakersBoosterProps {
  onOrderCreated: (order: Omit<Order, "id" | "timestamp">) => void;
}

export function MakersBooster({ onOrderCreated }: MakersBoosterProps) {
  const [token, setToken] = useState("");
  const [intensity, setIntensity] = useState(50);
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
    setError("");
    onOrderCreated({
      token,
      service: "Makers Booster",
      intensity,
      status: "running",
      startedAt: new Date(),
      durationMs: 30000,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div data-ocid="makers.success_state" className="animate-slide-up">
        <Header title="Makers Booster" subtitle="Order confirmed" />
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
                Makers Boost Active!
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.67 0.024 200)" }}
              >
                Intensity: {intensity}% — running on {token.slice(0, 8)}...
              </p>
            </div>
            <button
              type="button"
              data-ocid="makers.primary_button"
              onClick={() => {
                setToken("");
                setIntensity(50);
                setSubmitted(false);
              }}
              className="btn-teal px-6 py-2.5 rounded-lg text-sm"
            >
              New Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="makers.page" className="animate-slide-up">
      <Header
        title="Makers Booster"
        subtitle="Increase unique makers for your token"
      />
      <div className="max-w-2xl mx-auto">
        <div className="panel-modal p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.83 0.155 175 / 0.15)" }}
            >
              <Zap size={20} style={{ color: "oklch(0.83 0.155 175)" }} />
            </div>
            <div>
              <h2
                className="font-bold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                Makers Booster
              </h2>
              <p className="text-xs" style={{ color: "oklch(0.67 0.024 200)" }}>
                Boost unique transaction makers count
              </p>
            </div>
          </div>

          {error && (
            <div
              data-ocid="makers.error_state"
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
            <label htmlFor="makers-token" style={labelStyle}>
              Token Contract Address
            </label>
            <input
              id="makers-token"
              data-ocid="makers.input"
              type="text"
              placeholder="Enter Solana token address..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <p style={labelStyle}>Boost Intensity: {intensity}%</p>
            <Slider
              data-ocid="makers.intensity.input"
              min={1}
              max={100}
              step={1}
              value={[intensity]}
              onValueChange={([v]) => setIntensity(v)}
              className="mt-3"
            />
            <div
              className="flex justify-between text-xs mt-1.5"
              style={{ color: "oklch(0.50 0.020 200)" }}
            >
              <span>Low (1%)</span>
              <span>High (100%)</span>
            </div>
          </div>

          <button
            type="button"
            data-ocid="makers.submit_button"
            onClick={handleSubmit}
            className="btn-teal w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Zap size={16} /> Activate Makers Boost
          </button>
        </div>
      </div>
    </div>
  );
}
