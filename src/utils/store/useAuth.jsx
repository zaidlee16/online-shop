import { create } from "zustand";
import supabase from "../supaClient";

export const useAuth = create((set, get) => ({
  user: null,
  auth: false,
  id: "",
  username: "",
  role: "",
  email: "",
  loading: true,

  register: async (username, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("Data pengguna null setelah pendaftaran");

      await supabase
        .from("profiles")
        .upsert([{ id: data.user.id, username, email }]);
      set({ user: data.user, auth: true, username, email, loading: false });
    } catch (error) {
      console.error("Kesalahan saat pendaftaran:", error.message);
    }
  },

  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id);
      if (profileError) throw profileError;
      if (!profileData.length) throw new Error("Tidak ada profil ditemukan");

      set({
        user: data.user,
        auth: true,
        username: profileData[0].username,
        email: profileData[0].email,
        loading: false,
      });
      console.log("Login berhasil!");
    } catch (error) {
      console.error("Kesalahan saat login:", error.message);
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, auth: false, username: "", email: "", loading: false });
      console.log("Logout berhasil!");
    } catch (error) {
      console.error("Kesalahan saat logout:", error.message);
    }
  },

  fetchUser: async () => {
    set({ loading: true });
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      await get().fetchUserData(data.user.id);
    } else {
      set({ loading: false });
    }
  },

  fetchUserData: async (userId) => {
    try {
      const { data: userData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);
      if (error) throw error;
      if (userData && userData.length > 0) {
        set({
          id: userData[0].id,
          username: userData[0].username,
          email: userData[0].email,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Kesalahan saat mengambil data pengguna:", error.message);
      set({ loading: false });
    }
  },
}));
