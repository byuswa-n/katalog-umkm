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

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
