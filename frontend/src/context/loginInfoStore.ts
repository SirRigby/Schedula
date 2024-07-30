import { create } from "zustand";

interface LoginInfo {
  username: string;
  userid: string;
  login: (a: string, b: string) => void;
  logout: () => void;
}

const LoginInfoStore = create<LoginInfo>((set) => ({
  username: "Guest",
  userid: "none",
  login: (a, b) => set(() => ({ username: a, userid: b })),
  logout: () => set(() => ({ username: "Guest", userid: "none" })),
}));

export default LoginInfoStore;
