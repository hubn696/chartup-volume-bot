import { useCallback, useEffect, useState } from "react";

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isConnected: boolean;
      publicKey: { toString(): string } | null;
      connect(): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
      on(event: string, handler: () => void): void;
      off(event: string, handler: () => void): void;
    };
  }
}

export interface WalletState {
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  walletAvailable: boolean;
  connect: () => void;
  disconnect: () => void;
}

export function useWallet(): WalletState {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const walletAvailable =
    typeof window !== "undefined" && !!window.solana?.isPhantom;

  useEffect(() => {
    if (!walletAvailable || !window.solana) return;

    // Check if already connected on mount
    if (window.solana.isConnected && window.solana.publicKey) {
      setConnected(true);
      setPublicKey(window.solana.publicKey.toString());
    }

    const handleConnect = () => {
      if (window.solana?.publicKey) {
        setConnected(true);
        setConnecting(false);
        setPublicKey(window.solana.publicKey.toString());
      }
    };

    const handleDisconnect = () => {
      setConnected(false);
      setConnecting(false);
      setPublicKey(null);
    };

    window.solana.on("connect", handleConnect);
    window.solana.on("disconnect", handleDisconnect);

    return () => {
      window.solana?.off("connect", handleConnect);
      window.solana?.off("disconnect", handleDisconnect);
    };
  }, [walletAvailable]);

  const connect = useCallback(async () => {
    if (!window.solana || connecting || connected) return;
    setConnecting(true);
    try {
      const res = await window.solana.connect();
      setPublicKey(res.publicKey.toString());
      setConnected(true);
    } catch {
      // User rejected or error
    } finally {
      setConnecting(false);
    }
  }, [connecting, connected]);

  const disconnect = useCallback(async () => {
    if (!window.solana || !connected) return;
    try {
      await window.solana.disconnect();
    } catch {
      // ignore
    }
    setConnected(false);
    setPublicKey(null);
  }, [connected]);

  return {
    connected,
    connecting,
    publicKey,
    walletAvailable,
    connect,
    disconnect,
  };
}
