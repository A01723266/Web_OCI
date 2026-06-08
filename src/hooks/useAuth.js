import { useState } from "react";
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  hasSession,
} from "../utils/session";

export function useAuth() {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());

  const refreshSession = () => {
    setUser(getStoredUser());
    setToken(getStoredToken());
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setToken(null);
  };

  return {
    user,
    token,
    isAuthenticated: hasSession(),
    refreshSession,
    logout,
  };
}
