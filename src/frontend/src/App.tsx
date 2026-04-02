import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { useWallet } from "./hooks/useWallet";
import { Dashboard } from "./pages/Dashboard";
import { DexTrending } from "./pages/DexTrending";
import { HoldersBooster } from "./pages/HoldersBooster";
import { MakersBooster } from "./pages/MakersBooster";
import { SettingsPage } from "./pages/Settings";
import { VolumeBooster } from "./pages/VolumeBooster";
import type { NavItem, Order } from "./types";

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>("volume");
  const [orders, setOrders] = useState<Order[]>([]);
  const wallet = useWallet();

  function addOrder(order: Omit<Order, "id" | "timestamp">) {
    setOrders((prev) => [
      ...prev,
      {
        ...order,
        id: Math.random().toString(36).slice(2),
        timestamp: new Date(),
      },
    ]);
  }

  const completeOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: "completed" as const } : o,
      ),
    );
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const order of orders) {
      if (order.status === "running" && order.startedAt && order.durationMs) {
        const elapsed = Date.now() - order.startedAt.getTime();
        const remaining = order.durationMs - elapsed;
        if (remaining > 0) {
          const timer = setTimeout(() => completeOrder(order.id), remaining);
          timers.push(timer);
        } else {
          completeOrder(order.id);
        }
      }
    }

    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [orders, completeOrder]);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "oklch(0.12 0.016 195)" }}
    >
      <Sidebar active={activeNav} onNav={setActiveNav} wallet={wallet} />

      {/* Main content */}
      <main
        className="flex-1 ml-64 min-h-screen tech-pattern"
        style={{ background: "oklch(0.11 0.015 195)" }}
      >
        <div className="max-w-6xl mx-auto px-8 py-8">
          {activeNav === "dashboard" && <Dashboard orders={orders} />}
          {activeNav === "volume" && (
            <VolumeBooster onOrderCreated={addOrder} />
          )}
          {activeNav === "dex" && <DexTrending />}
          {activeNav === "makers" && (
            <MakersBooster onOrderCreated={addOrder} />
          )}
          {activeNav === "holders" && (
            <HoldersBooster onOrderCreated={addOrder} />
          )}
          {activeNav === "settings" && <SettingsPage wallet={wallet} />}
        </div>

        {/* Footer */}
        <footer
          className="border-t px-8 py-5"
          style={{ borderColor: "oklch(0.23 0.018 195)" }}
        >
          <p
            className="text-center text-xs"
            style={{ color: "oklch(0.40 0.015 200)" }}
          >
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "oklch(0.67 0.024 200)",
                textDecoration: "underline",
              }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>

      <Toaster />
    </div>
  );
}
