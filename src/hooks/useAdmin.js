import { useAuth } from "./useAuth";

export function useAdmin() {
  const { user } = useAuth();
  const isAdmin = user?.username === "admin";

  return {
    isAdmin,
    adminRule: 'username === "admin"',
  };
}
