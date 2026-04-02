import { useEffect, useRef, useState } from "react";
import type { Order } from "../types";

interface OrdersTableProps {
  orders: Order[];
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<
    Order["status"],
    { bg: string; color: string; label: string }
  > = {
    running: {
      bg: "oklch(0.83 0.155 175 / 0.15)",
      color: "oklch(0.83 0.155 175)",
      label: "Running",
    },
    completed: {
      bg: "oklch(0.72 0.13 175 / 0.12)",
      color: "oklch(0.72 0.13 175)",
      label: "Completed",
    },
    paused: {
      bg: "oklch(0.65 0.18 65 / 0.15)",
      color: "oklch(0.72 0.18 65)",
      label: "Paused",
    },
  };
  const s = styles[status];
  return (
    <span
      className="text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

function OrderProgressBar({
  startedAt,
  durationMs,
}: {
  startedAt: Date;
  durationMs: number;
}) {
  const [progress, setProgress] = useState(() => {
    const elapsed = Date.now() - startedAt.getTime();
    return Math.min(elapsed / durationMs, 1);
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt.getTime();
      const pct = Math.min(elapsed / durationMs, 1);
      setProgress(pct);
      if (pct >= 1 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startedAt, durationMs]);

  const pct = Math.round(progress * 100);

  return (
    <div
      className="w-full h-1 rounded-full overflow-hidden mt-1.5"
      style={{ background: "oklch(0.23 0.018 195)" }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${pct}%`,
          background:
            pct > 75
              ? "oklch(0.83 0.155 175)"
              : pct > 40
                ? "oklch(0.78 0.14 175)"
                : "oklch(0.70 0.10 175)",
          boxShadow: pct > 80 ? "0 0 6px oklch(0.83 0.155 175 / 0.6)" : "none",
          opacity: 0.3 + progress * 0.7,
        }}
      />
    </div>
  );
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const allOrders: Order[] =
    orders.length > 0
      ? orders
      : [
          {
            id: "1",
            token: "7xKXt...9mW2",
            service: "Volume Booster",
            speed: "fast",
            status: "running" as const,
            timestamp: new Date(Date.now() - 3600000),
            amount: 2.5,
          },
          {
            id: "2",
            token: "4nPqR...8vB1",
            service: "Makers Booster",
            speed: "balanced",
            status: "completed" as const,
            timestamp: new Date(Date.now() - 7200000),
            amount: 1.2,
          },
          {
            id: "3",
            token: "9mKLp...3xA5",
            service: "Volume Booster",
            speed: "slow",
            status: "running" as const,
            timestamp: new Date(Date.now() - 1800000),
            amount: 5.0,
          },
        ];

  return (
    <div className="panel overflow-hidden">
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: "oklch(0.23 0.018 195)" }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: "oklch(0.93 0.012 200)" }}
        >
          Recent Orders
        </span>
      </div>
      <div data-ocid="orders.table">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid oklch(0.23 0.018 195)" }}>
              {[
                "Token",
                "Service",
                "Speed",
                "Amount (SOL)",
                "Status / Progress",
                "Time",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "oklch(0.50 0.020 200)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, i) => (
              <tr
                key={order.id}
                data-ocid={`orders.item.${i + 1}`}
                className="transition-colors"
                style={{
                  borderBottom: "1px solid oklch(0.23 0.018 195 / 0.5)",
                }}
              >
                <td
                  className="px-5 py-3.5 font-mono text-xs"
                  style={{ color: "oklch(0.83 0.155 175)" }}
                >
                  {order.token.length > 12
                    ? `${order.token.slice(0, 6)}...${order.token.slice(-4)}`
                    : order.token}
                </td>
                <td
                  className="px-5 py-3.5 text-sm"
                  style={{ color: "oklch(0.83 0.012 200)" }}
                >
                  {order.service}
                </td>
                <td
                  className="px-5 py-3.5 text-sm capitalize"
                  style={{ color: "oklch(0.67 0.024 200)" }}
                >
                  {order.speed ?? "—"}
                </td>
                <td
                  className="px-5 py-3.5 text-sm font-medium"
                  style={{ color: "oklch(0.93 0.012 200)" }}
                >
                  {order.amount ?? "—"}
                </td>
                <td className="px-5 py-3.5" style={{ minWidth: "140px" }}>
                  <StatusBadge status={order.status} />
                  {order.status === "running" &&
                    order.startedAt &&
                    order.durationMs && (
                      <OrderProgressBar
                        startedAt={order.startedAt}
                        durationMs={order.durationMs}
                      />
                    )}
                </td>
                <td
                  className="px-5 py-3.5 text-xs"
                  style={{ color: "oklch(0.50 0.020 200)" }}
                >
                  {order.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allOrders.length === 0 && (
          <div
            data-ocid="orders.empty_state"
            className="px-5 py-12 text-center"
            style={{ color: "oklch(0.50 0.020 200)" }}
          >
            No orders yet. Start a boost to see your orders here.
          </div>
        )}
      </div>
    </div>
  );
}
