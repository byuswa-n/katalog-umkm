import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

/**
 * proxy.js — pengganti middleware.js untuk Next.js 16.
 * Melindungi semua rute /admin kecuali /admin/login.
 * Admin yang belum login dialihkan ke /admin/login.
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Biarkan /admin/login lewat tanpa pemeriksaan
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Untuk semua rute /admin lainnya, periksa sesi
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next();

    const url = process.env.SUPABASE_URL?.trim()
      .replace(/\/rest\/v1\/?$/, "")
      .replace(/\/+$/, "");
    const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();

    if (!url || !key) {
      // Konfigurasi env belum ada — arahkan ke login agar tidak mengekspos halaman admin
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    // getUser() memvalidasi token ke Supabase Auth — lebih aman dari getSession()
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
