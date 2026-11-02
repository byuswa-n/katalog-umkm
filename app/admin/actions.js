"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";

// ---------------------------------------------------------------------------
// US-04 — Login admin
// ---------------------------------------------------------------------------
export async function actionLogin(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau password salah. Coba lagi." };
  }

  redirect("/admin");
}

// ---------------------------------------------------------------------------
// US-04 — Keluar
// ---------------------------------------------------------------------------
export async function actionKeluar() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// US-05 — Ganti password
// ---------------------------------------------------------------------------
export async function actionGantiPassword(prevState, formData) {
  // Periksa login di server terlebih dahulu (aturan keamanan #3)
  const supabase = await createSessionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  const passwordBaru = formData.get("password_baru")?.toString();
  const konfirmasi = formData.get("konfirmasi_password")?.toString();

  // Validasi di server
  if (!passwordBaru || !konfirmasi) {
    return { error: "Semua kolom wajib diisi." };
  }
  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }
  if (passwordBaru !== konfirmasi) {
    return { error: "Password baru dan konfirmasi tidak sama." };
  }

  const { error } = await supabase.auth.updateUser({ password: passwordBaru });

  if (error) {
    return { error: `Gagal mengganti password: ${error.message}` };
  }

  return { sukses: "Password berhasil diganti." };
}

