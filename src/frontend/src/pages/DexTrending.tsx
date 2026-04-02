import { ExternalLink, TrendingUp } from "lucide-react";
import { Header } from "../components/Header";

const platforms = [
  {
    name: "Raydium",
    desc: "AMM-based trending with volume and liquidity metrics",
    accentL: "0.72",
    accentC: "0.18",
    accentH: "280",
    tokens: ["SOL/USDC", "RAY/SOL", "BONK/SOL"],
    volume: "$2.4M",
  },
  {
    name: "Jupiter",
    desc: "Aggregator-based trending across all Solana DEXes",
    accentL: "0.75",
    accentC: "0.18",
    accentH: "65",
    tokens: ["JUP/SOL", "PYTH/USDC", "WIF/SOL"],
    volume: "$5.1M",
  },
  {
    name: "Orca",
    desc: "Concentrated liquidity trending with whale activity",
    accentL: "0.83",
    accentC: "0.155",
    accentH: "175",
    tokens: ["ORCA/SOL", "mSOL/SOL", "USDT/USDC"],
    volume: "$1.8M",
  },
];

export function DexTrending() {
  return (
    <div data-ocid="dex.page" className="animate-slide-up">
      <Header
        title="DEX Trending"
        subtitle="Trending services across Solana DEXes"
      />

      <div
        className="panel p-6 mb-6 flex items-center gap-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.83 0.155 175 / 0.1), oklch(0.14 0.012 195))",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "oklch(0.83 0.155 175 / 0.15)",
            border: "1px solid oklch(0.83 0.155 175 / 0.3)",
          }}
        >
          <TrendingUp size={24} style={{ color: "oklch(0.83 0.155 175)" }} />
        </div>
        <div>
          <h3
            className="font-semibold"
            style={{ color: "oklch(0.93 0.012 200)" }}
          >
            DEX Trending Services
          </h3>
          <p className="text-sm" style={{ color: "oklch(0.67 0.024 200)" }}>
            Get your token trending on all major Solana DEX platforms
          </p>
        </div>
        <span
          className="ml-auto text-xs px-3 py-1.5 rounded-full font-medium"
          style={{
            background: "oklch(0.65 0.18 65 / 0.15)",
            color: "oklch(0.72 0.18 65)",
            border: "1px solid oklch(0.72 0.18 65 / 0.4)",
          }}
        >
          Coming Soon
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((p, i) => {
          const accent = `oklch(${p.accentL} ${p.accentC} ${p.accentH})`;
          const accentBg = `oklch(${p.accentL} ${p.accentC} ${p.accentH} / 0.15)`;
          const accentBorder = `oklch(${p.accentL} ${p.accentC} ${p.accentH} / 0.4)`;
          return (
            <div
              key={p.name}
              data-ocid={`dex.item.${i + 1}`}
              className="panel p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: accentBg,
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    <TrendingUp size={16} style={{ color: accent }} />
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.93 0.012 200)" }}
                  >
                    {p.name}
                  </span>
                </div>
                <ExternalLink
                  size={14}
                  style={{ color: "oklch(0.50 0.020 200)" }}
                />
              </div>
              <p className="text-xs" style={{ color: "oklch(0.67 0.024 200)" }}>
                {p.desc}
              </p>
              <div>
                <p
                  className="text-xs mb-2"
                  style={{ color: "oklch(0.50 0.020 200)" }}
                >
                  Top Pairs
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tokens.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "oklch(0.23 0.018 195)",
                        color: "oklch(0.67 0.024 200)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="flex items-center justify-between pt-2"
                style={{ borderTop: "1px solid oklch(0.23 0.018 195)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.50 0.020 200)" }}
                >
                  24h Volume
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.83 0.155 175)" }}
                >
                  {p.volume}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
