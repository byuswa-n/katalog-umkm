import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Koneksi Supabase sesi admin menggunakan SUPABASE_PUBLISHABLE_KEY + cookie.
 * Dipakai untuk: login, keluar, ganti password, dan aksi tambah/ubah/hapus produk.
 * Koneksi ini menghormati RLS; hanya data yang boleh diakses admin yang bisa dibaca/diubah.
 */
export async function createSessionClient() {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum diatur di environment variable."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll dipanggil dari Server Component; aman diabaikan jika middleware
          // menyegarkan cookie sesi.
        }
      },
    },
  });
}

