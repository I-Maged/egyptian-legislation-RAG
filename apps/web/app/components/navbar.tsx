"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type NavbarAction = {
  onClick: () => void;
  disabled?: boolean;
} | null;

const NavbarSetterContext = createContext<(action: NavbarAction) => void>(
  () => {},
);

const NavbarActionContext = createContext<NavbarAction>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<NavbarAction>(null);

  return (
    <NavbarActionContext.Provider value={action}>
      <NavbarSetterContext.Provider value={setAction}>
        {children}
      </NavbarSetterContext.Provider>
    </NavbarActionContext.Provider>
  );
}

/**
 * Lets a page control the navbar's action button (e.g. "new chat").
 * Pass null to fall back to the default link behavior.
 */
export function useNavbarAction(action: NavbarAction) {
  const setAction = useContext(NavbarSetterContext);
  const onClick = action?.onClick;
  const disabled = action?.disabled;

  useEffect(() => {
    if (!onClick) return;

    setAction({ onClick, disabled });

    return () => setAction(null);
  }, [setAction, onClick, disabled]);
}

export default function Navbar() {
  const action = useContext(NavbarActionContext);

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">ق</div>
        <div>
          <div className="brand-title">المساعد القانوني المصري</div>
          <div className="brand-subtitle">
            محادثة تجريبية للتشريعات المصرية
          </div>
        </div>
      </div>
      {action ? (
        <button
          className="new-chat"
          onClick={action.onClick}
          disabled={action.disabled}
        >
          محادثة جديدة
        </button>
      ) : (
        <Link href="/" className="new-chat">
          محادثة جديدة
        </Link>
      )}
    </header>
  );
}
