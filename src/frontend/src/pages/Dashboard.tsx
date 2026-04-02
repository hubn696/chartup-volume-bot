import { Activity, BarChart2, CheckCircle, TrendingUp } from "lucide-react";
import { ActivityChart } from "../components/ActivityChart";
import { Header } from "../components/Header";
import { MetricCard } from "../components/MetricCard";
import { OrdersTable } from "../components/OrdersTable";
import type { Order } from "../types";

interface DashboardProps {
  orders: Order[];
}

export function Dashboard({ orders }: DashboardProps) {
  const runningOrders = orders.filter((o) => o.status === "running").length;
  const totalOrders = orders.length;

  return (
    <div data-ocid="dashboard.page" className="animate-slide-up">
      <Header
        title="ChartUp Dashboard"
        subtitle="Solana DEX Volume & Trending Tools"
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Active Tasks"
          value={String(runningOrders || 3)}
          subtext="Currently running"
          icon={<Activity size={16} />}
          trend="+2 today"
          trendUp
        />
        <MetricCard
          label="Total Volume"
          value="148.5K"
          subtext="SOL boosted today"
          icon={<BarChart2 size={16} />}
          trend="+12.4%"
          trendUp
        />
        <MetricCard
          label="Orders Today"
          value={String(totalOrders || 24)}
          subtext="Across all services"
          icon={<TrendingUp size={16} />}
          trend="+8 vs yesterday"
          trendUp
        />
        <MetricCard
          label="Success Rate"
          value="98.7%"
          subtext="Last 30 days"
          icon={<CheckCircle size={16} />}
          trend="+0.3% this week"
          trendUp
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="xl:col-span-2">
          <ActivityChart />
        </div>
        <div className="panel p-5 flex flex-col gap-4">
          <span
            className="text-sm font-semibold"
            style={{ color: "oklch(0.93 0.012 200)" }}
          >
            Recent Trends
          </span>
          {/* SVG line chart */}
          <svg
            role="img"
            aria-label="Recent volume trend chart"
            viewBox="0 0 200 80"
            className="w-full"
            style={{ height: "96px" }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="oklch(0.83 0.155 175)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.83 0.155 175)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[20, 40, 60].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="200"
                y2={y}
                stroke="oklch(0.23 0.018 195)"
                strokeWidth="0.5"
              />
            ))}
            {/* Area fill */}
            <path
              d="M0 70 L20 58 L40 50 L60 55 L80 38 L100 42 L120 30 L140 35 L160 22 L180 28 L200 15 L200 80 L0 80Z"
              fill="url(#lineGrad)"
            />
            {/* Line */}
            <path
              d="M0 70 L20 58 L40 50 L60 55 L80 38 L100 42 L120 30 L140 35 L160 22 L180 28 L200 15"
              fill="none"
              stroke="oklch(0.83 0.155 175)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 4px oklch(0.83 0.155 175 / 0.8))",
              }}
            />
          </svg>
          <div
            className="flex items-center justify-between text-xs"
            style={{ color: "oklch(0.50 0.020 200)" }}
          >
            <span>7d trend</span>
            <span style={{ color: "oklch(0.83 0.155 175)" }}>▲ +23.1%</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={orders} />
    </div>
  );
}
