import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Rocket,
  RotateCcw,
  Send,
  Settings2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Header } from "../components/Header";
import type { Order, VolumeFormState } from "../types";

interface VolumeBoosterProps {
  onOrderCreated: (order: Omit<Order, "id" | "timestamp">) => void;
}

const DEX_OPTIONS = ["Raydium", "Jupiter", "Orca", "Meteora", "Phoenix"];

const TELEGRAM_BOT_URL = "https://t.me/ChartUpSolanaVolume_bot";

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

function StepDot({ n, current }: { n: number; current: number }) {
  const done = n < current;
  const active = n === current;
  return (
    <div
      className="flex items-center gap-1"
      style={{
        color:
          done || active ? "oklch(0.83 0.155 175)" : "oklch(0.40 0.015 200)",
      }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          background: done
            ? "oklch(0.83 0.155 175 / 0.25)"
            : active
              ? "oklch(0.83 0.155 175 / 0.18)"
              : "transparent",
          border:
            done || active
              ? "1px solid oklch(0.83 0.155 175 / 0.5)"
              : "1px solid oklch(0.30 0.018 195)",
        }}
      >
        {done ? <CheckCircle2 size={12} /> : n}
      </div>
    </div>
  );
}

export function VolumeBooster({ onOrderCreated }: VolumeBoosterProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<VolumeFormState>({
    token: "",
    dex: "Raydium",
    amount: "",
    speed: "balanced",
    duration: 24,
    minOrder: "0.01",
    maxOrder: "0.05",
  });

  function setField<K extends keyof VolumeFormState>(
    key: K,
    val: VolumeFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setError("");
  }

  function validateStep1() {
    if (form.token.length < 32) {
      setError("Token address must be at least 32 characters.");
      return false;
    }
    return true;
  }

  function validateStep2() {
    if (
      !form.amount ||
      Number.isNaN(Number(form.amount)) ||
      Number(form.amount) <= 0
    ) {
      setError("Please enter a valid SOL amount.");
      return false;
    }
    return true;
  }

  function handleNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setError("");
    setStep((s) => s + 1);
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleConfirm() {
    const durationMap: Record<string, number> = {
      slow: 60000,
      balanced: 30000,
      fast: 15000,
    };
    const durationMs = durationMap[form.speed] ?? 45000;

    onOrderCreated({
      token: form.token,
      service: "Volume Booster",
      speed: form.speed,
      status: "running",
      amount: Number(form.amount),
      startedAt: new Date(),
      durationMs,
    });
    setSubmitted(true);
  }

  function handleReset() {
    setForm({
      token: "",
      dex: "Raydium",
      amount: "",
      speed: "balanced",
      duration: 24,
      minOrder: "0.01",
      maxOrder: "0.05",
    });
    setStep(1);
    setSubmitted(false);
    setError("");
  }

  const reviewRows = [
    ["Token", `${form.token.slice(0, 8)}...${form.token.slice(-6)}`],
    ["DEX", form.dex],
    ["Amount", `${form.amount} SOL`],
    ["Speed", `${form.speed.charAt(0).toUpperCase()}${form.speed.slice(1)}`],
    ["Duration", `${form.duration}h`],
    ["Order Range", `${form.minOrder} – ${form.maxOrder} SOL`],
  ];

  if (submitted) {
    return (
      <div data-ocid="volume.success_state" className="animate-slide-up">
        <Header title="Volume Booster" subtitle="Order confirmed" />
        <div className="max-w-xl mx-auto">
          <div className="panel-modal p-8 flex flex-col items-center gap-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.83 0.155 175 / 0.15)",
                border: "2px solid oklch(0.83 0.155 175)",
                boxShadow: "0 0 24px oklch(0.83 0.155 175 / 0.4)",
              }}
            >
              <Rocket size={32} style={{ color: "oklch(0.83 0.155 175)" }} />
            </div>
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "oklch(0.93 0.012 200)" }}
              >
                Volume Boost Active!
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.67 0.024 200)" }}
              >
                {form.amount} SOL over {form.duration}h — running on{" "}
                {form.token.slice(0, 8)}...
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="volume.telegram_button"
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
                data-ocid="volume.primary_button"
                onClick={handleReset}
                className="btn-teal px-6 py-2.5 rounded-lg text-sm flex items-center gap-2"
              >
                <RotateCcw size={14} /> New Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="volume.page" className="animate-slide-up">
      <Header
        title="Volume Booster"
        subtitle="Amplify trading volume across Solana DEXes"
      />

      {/* Telegram Bot Banner */}
      <div className="max-w-2xl mx-auto mb-5">
        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="volume.telegram_banner"
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
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-1">
              <StepDot n={n} current={step} />
              {n < 3 && (
                <ChevronRight
                  size={14}
                  style={{
                    color:
                      n < step
                        ? "oklch(0.83 0.155 175)"
                        : "oklch(0.30 0.018 195)",
                  }}
                />
              )}
            </div>
          ))}
          <span
            className="ml-2 text-xs"
            style={{ color: "oklch(0.50 0.020 200)" }}
          >
            Step {step} of 3
          </span>
        </div>

        {/* Step panels */}
        <div className="panel-modal p-8 space-y-6">
          {/* Error */}
          {error && (
            <div
              data-ocid="volume.error_state"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
              style={{
                background: "oklch(0.577 0.245 27.325 / 0.15)",
                border: "1px solid oklch(0.577 0.245 27.325 / 0.4)",
                color: "oklch(0.80 0.12 30)",
              }}
            >
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          {/* Step 1 — Token & DEX */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.83 0.155 175 / 0.15)" }}
                >
                  <Rocket
                    size={18}
                    style={{ color: "oklch(0.83 0.155 175)" }}
                  />
                </div>
                <h2
                  className="text-base font-bold"
                  style={{ color: "oklch(0.93 0.012 200)" }}
                >
                  Token & DEX
                </h2>
              </div>

              <div>
                <label htmlFor="volume-token" style={labelStyle}>
                  Token Contract Address
                </label>
                <input
                  id="volume-token"
                  data-ocid="volume.input"
                  type="text"
                  placeholder="Enter Solana token address..."
                  value={form.token}
                  onChange={(e) => setField("token", e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <p style={labelStyle}>Select DEX</p>
                <div className="flex flex-wrap gap-2">
                  {DEX_OPTIONS.map((dex) => (
                    <button
                      key={dex}
                      type="button"
                      data-ocid={`volume.dex.${dex.toLowerCase()}.toggle`}
                      onClick={() =>
                        setField("dex", dex as VolumeFormState["dex"])
                      }
                      className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                      style={
                        form.dex === dex
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
                      {dex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Volume Parameters */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.83 0.155 175 / 0.15)" }}
                >
                  <Settings2
                    size={18}
                    style={{ color: "oklch(0.83 0.155 175)" }}
                  />
                </div>
                <h2
                  className="text-base font-bold"
                  style={{ color: "oklch(0.93 0.012 200)" }}
                >
                  Volume Parameters
                </h2>
              </div>

              <div>
                <label htmlFor="volume-amount" style={labelStyle}>
                  Total SOL Amount
                </label>
                <input
                  id="volume-amount"
                  data-ocid="volume.amount.input"
                  type="number"
                  placeholder="e.g. 5"
                  value={form.amount}
                  onChange={(e) => setField("amount", e.target.value)}
                  style={inputStyle}
                  min="0.1"
                  step="0.1"
                />
              </div>

              <div>
                <p style={labelStyle}>Speed </p>
                <div className="flex gap-3">
                  {(["slow", "balanced", "fast"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-ocid={`volume.speed.${s}.toggle`}
                      onClick={() => setField("speed", s)}
                      className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all duration-200"
                      style={
                        form.speed === s
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
                      {s === "slow" ? "🐢" : s === "fast" ? "⚡" : "⚖️"}{" "}
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                <p
                  className="text-xs mt-1.5"
                  style={{ color: "oklch(0.50 0.020 200)" }}
                >
                  {form.speed === "fast"
                    ? "High frequency — completes in ~15s"
                    : form.speed === "slow"
                      ? "Low frequency — completes in ~60s"
                      : "Balanced frequency — completes in ~30s"}
                </p>
              </div>

              <div>
                <label htmlFor="volume-duration" style={labelStyle}>
                  Duration (hours): {form.duration}h
                </label>
                <input
                  id="volume-duration"
                  data-ocid="volume.duration.input"
                  type="range"
                  min="1"
                  max="72"
                  value={form.duration}
                  onChange={(e) => setField("duration", Number(e.target.value))}
                  className="w-full mt-1"
                  style={{ accentColor: "oklch(0.83 0.155 175)" }}
                />
                <div
                  className="flex justify-between text-xs mt-1"
                  style={{ color: "oklch(0.50 0.020 200)" }}
                >
                  <span>1h</span>
                  <span>72h</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="volume-min-order" style={labelStyle}>
                    Min Order (SOL)
                  </label>
                  <input
                    id="volume-min-order"
                    data-ocid="volume.min_order.input"
                    type="number"
                    placeholder="0.01"
                    value={form.minOrder}
                    onChange={(e) => setField("minOrder", e.target.value)}
                    style={inputStyle}
                    step="0.001"
                  />
                </div>
                <div>
                  <label htmlFor="volume-max-order" style={labelStyle}>
                    Max Order (SOL)
                  </label>
                  <input
                    id="volume-max-order"
                    data-ocid="volume.max_order.input"
                    type="number"
                    placeholder="0.05"
                    value={form.maxOrder}
                    onChange={(e) => setField("maxOrder", e.target.value)}
                    style={inputStyle}
                    step="0.001"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Review */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.83 0.155 175 / 0.15)" }}
                >
                  <Zap size={18} style={{ color: "oklch(0.83 0.155 175)" }} />
                </div>
                <h2
                  className="text-base font-bold"
                  style={{ color: "oklch(0.93 0.012 200)" }}
                >
                  Review & Confirm
                </h2>
              </div>

              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.23 0.018 195)" }}
              >
                {reviewRows.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between px-5 py-3"
                    style={{
                      borderBottom: "1px solid oklch(0.23 0.018 195 / 0.5)",
                    }}
                  >
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.50 0.020 200)" }}
                    >
                      {k}
                    </span>
                    <span
                      className="text-sm font-medium font-mono"
                      style={{ color: "oklch(0.83 0.155 175)" }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-xs"
                style={{
                  background: "oklch(0.83 0.155 175 / 0.08)",
                  border: "1px solid oklch(0.83 0.155 175 / 0.20)",
                  color: "oklch(0.67 0.024 200)",
                }}
              >
                <Zap size={12} style={{ color: "oklch(0.83 0.155 175)" }} />
                Order will start immediately upon confirmation
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              data-ocid="volume.secondary_button"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200"
              style={{
                opacity: step === 1 ? 0.3 : 1,
                background: "oklch(0.14 0.012 195)",
                border: "1px solid oklch(0.23 0.018 195)",
                color: "oklch(0.67 0.024 200)",
                cursor: step === 1 ? "not-allowed" : "pointer",
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                data-ocid="volume.primary_button"
                onClick={handleNext}
                className="btn-teal flex items-center gap-2 px-5 py-2 rounded-lg text-sm"
              >
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                data-ocid="volume.submit_button"
                onClick={handleConfirm}
                className="btn-teal flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              >
                <Rocket size={14} /> Launch Boost
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
