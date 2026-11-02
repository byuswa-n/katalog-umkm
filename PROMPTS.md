# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Membuat koneksi Supabase di `lib/supabase/server.js` (dan re-export di `lib/supabase/index.js`) menggunakan `@supabase/supabase-js` dengan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`.
- Memperbarui `app/page.jsx` agar mengambil daftar produk dari tabel "produk" di Supabase secara asynchronous di sisi server.
- Menampilkan setiap produk dengan komponen `KartuProduk` tanpa mengubah styling yang sudah ada.
- Menampilkan pesan error yang jelas jika pengambilan data gagal.
- Menampilkan tulisan "Belum ada produk" jika tabel produk kosong.
- Menghapus komponen `CatatanBelumAktif` dari halaman beranda.

**Perbaikan:**
- Menambahkan sanitasi pada `SUPABASE_URL` untuk otomatis membuang path `/rest/v1/` atau trailing slash jika ada kesalahan pengisian pada environment variable.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02. Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Memperbarui `app/produk/[id]/page.jsx` menjadi Server Component asinkron yang mengambil satu produk dari tabel "produk" di Supabase menggunakan `.eq("id", id).single()`. Jika produk tidak ditemukan atau query error, memanggil `notFound()`. Tampilan tidak diubah, `CatatanBelumAktif` dihapus, `TombolWhatsApp` dibiarkan.

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)". Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Mengubah `components/TombolWhatsApp.jsx` dari `<button>` menjadi `<a>` yang mengarah ke `https://wa.me/{nomorWhatsApp}?text={pesan}`. Nomor diambil dari `lib/toko.js`, pesan berisi nama dan harga produk (format rupiah), di-encode dengan `encodeURIComponent`, dibuka di tab baru dengan `target="_blank"`. Tampilan kelas CSS tidak berubah. Halaman detail produk sudah bersih dari CatatanBelumAktif sejak US-02.

**Perbaikan:**

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04. Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
- Membuat `lib/supabase/session.js`: koneksi Supabase sesi admin menggunakan `@supabase/ssr` + cookie, dengan `SUPABASE_PUBLISHABLE_KEY`.
- Membuat `app/admin/actions.js` dengan Server Action `actionLogin` (login dengan email+password, redirect ke /admin jika berhasil, return error jika gagal) dan `actionKeluar` (signOut lalu redirect ke /admin/login).
- Memperbarui `app/admin/login/page.jsx` menjadi Client Component dengan `useActionState` yang menyambungkan form ke `actionLogin` dan menampilkan pesan error.
- Memperbarui `components/NavAdmin.jsx`: tombol Keluar dibungkus `<form action={actionKeluar}>` agar berfungsi sebagai Server Action.

**Perbaikan:**

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05. Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Menambahkan Server Action `actionGantiPassword` di `app/admin/actions.js`: validasi panjang minimal 8 karakter dan kecocokan konfirmasi di server, memeriksa sesi login sebelum memanggil `supabase.auth.updateUser`, mengembalikan `{ error }` atau `{ sukses }`.
- Memperbarui `app/admin/password/page.jsx` menjadi Client Component dengan `useActionState` yang menampilkan pesan error (merah) atau pesan berhasil (hijau). Tampilan dan struktur form tidak berubah. `CatatanBelumAktif` dihapus.

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
