Berkas ini berisi perintah lengkap untuk membangun sebuah aplikasi web. Baca seluruh isinya dan jalankan semuanya secara berurutan dari atas ke bawah tanpa melewatkan satu bagian pun. Bagian "Sinkronisasi ke Google Sheets" (di paling bawah) dikerjakan PALING AKHIR, setelah seluruh aplikasi selesai.

Buatkan aplikasi web website penjualan kelas online bernama "Guber Smart" dengan spesifikasi berikut.

PENTING: tampilan aplikasi harus bersih dan profesional seperti produk jadi, sempurna dan responsif di layar HP (menu, tombol, dan semua elemen rapi, proporsional, tidak ada yang tersembunyi), tanpa satu pun teks petunjuk, penjelasan fungsi, atau keterangan teknis (termasuk soal unggah file, Drive, Apps Script, atau spreadsheet). Hanya label, konten, pesan galat, dan notifikasi hasil aksi yang boleh tampil. Tombol, menu, dan kolom harus mudah dipakai dan dipahami lewat label yang jelas saja, tanpa ikon dekoratif dan tanpa badge atau chip berbentuk tombol palsu.

## 1. Tujuan dan Pengguna
Website ini menjual kelas Guber Smart: kelas belajar membuat aplikasi hanya bermodalkan ide, tanpa perlu paham koding. Pengunjung adalah calon peserta awam (guru, pelaku usaha, mahasiswa, pelajar, dan umum) yang ingin punya aplikasi atau website sendiri. Tujuan utama website: meyakinkan pengunjung lewat penjelasan kelas, contoh karya, dan testimoni, lalu mengarahkan mereka langsung ke halaman pendaftaran dan pembayaran di lynk.id. Website tidak memproses pendaftaran atau pembayaran sendiri. Pengelola (admin dan superadmin) mengubah seluruh isi, harga, tautan pendaftaran, dan gambar sendiri tanpa menyentuh kode.

## 2. Bahasa dan Nada
Bahasa Indonesia, ramah, meyakinkan, dan sederhana, mudah dipahami orang awam. Judul utama beranda: "Belajar Membuat Aplikasi Hanya Bermodalkan Ide". Sapaan italic di atasnya: "Selamat Datang di Guber Smart". Kalimat pendukung: "Tanpa perlu paham koding. Ceritakan idenya, kami pandu sampai aplikasinya jadi dan bisa dipakai." Tombol utama: "Daftar Sekarang" dan tombol kedua: "Lihat Kelas".

## 3. Tampilan dan Desain
Pertahankan identitas tampilan elegan bernuansa navy dan emas, sebagai berikut:
- Warna: navy #07142b (paling gelap), #0b1c38, #12284a, #1b365f; emas #c9a35a (utama), #e8cd8f (terang), #a77d36 (gelap); krem #f8f5ef (latar utama), #f1ece2 (latar bagian selang-seling); teks #1b2433, #4b5565, #6b7280; garis pembatas #e7e1d5; putih #ffffff; hijau WhatsApp #16a34a.
- Huruf: Lora (serif, untuk judul dan kutipan, termasuk italic) dan Inter (isi teks).
- Gaya: kartu bersudut membulat 18px, bayangan lembut, tombol berbentuk kapsul bulat penuh, lebar konten maksimal 1200px (1320px di layar sangat lebar), animasi hover halus (kartu naik sedikit, gambar zoom pelan), spasi lega.
- Tombol utama: gradasi emas (#e8cd8f ke #c9a35a ke #a77d36) dengan teks navy. Tombol kedua: transparan dengan garis tepi emas.
- Label kecil di atas judul bagian: teks biasa berhuruf kapital kecil, berjarak huruf lebar, berwarna emas gelap (emas terang di latar gelap), TANPA bingkai kapsul.
- Pola hiasan garis emas tipis bermotif bintang segi delapan (geometris Islami) sebagai lapisan samar yang memudar ke kiri pada kartu Visi, bagian Keunggulan (latar gelap), dan footer. Garis emas tipis sebagai aksen di bawah pita keunggulan dan di bawah kutipan.
- Header: sticky; di beranda awalnya transparan di atas foto hero dengan gradasi gelap tipis, setelah digulir lebih dari 40px berubah menjadi navy (#0b1c38, 96%) dengan blur dan bayangan. Kiri: logo bulat dan dua baris teks "GUBER" (kecil, putih) dan "SMART" (lebih besar, emas terang) dalam huruf Lora. Menu tengah di desktop dengan item aktif berwarna emas terang dan garis bawah emas, otomatis berganti sesuai bagian yang sedang terlihat saat digulir, klik menu menggulir halus ke bagiannya.
- Semua gambar berupa slot gambar (daftar di bagian Integrasi), dengan object-fit cover dan kerangka netral navy bergradasi bila belum diisi.

## Aturan Tampilan Profesional dan Responsif (WAJIB DIPATUHI, TANPA PENGECUALIAN)

Tampilan harus seperti produk jadi yang rapi dan profesional, bukan prototipe.

LARANGAN MUTLAK: TIDAK ADA SATU PUN teks petunjuk, penjelasan, atau keterangan fungsi di antarmuka. Ini berlaku untuk semua halaman, formulir, dialog, dan dashboard admin.

Contoh yang DILARANG tampil di UI (dan semua kalimat serupa):
- "Gunakan tombol ini untuk mengunggah gambar."
- "Gambar akan disimpan ke Drive melalui Apps Script." atau penyebutan Drive, Apps Script, base64, atau cara kerja teknis apa pun.
- "Format yang didukung: JPG, PNG. Maksimal 5 MB." (batas hanya diperiksa di kode; pesan muncul HANYA bila pengguna melanggar)
- "Isi kolom di bawah ini...", "Klik di sini untuk...", "Fitur ini digunakan untuk...", "Catatan:", "Tips:", "Perhatian:"
- Teks kecil abu-abu di bawah tombol, kolom, judul, atau kartu yang menjelaskan fungsinya.
- Tooltip, balon petunjuk, tur, onboarding, banner "Cara menggunakan", badge "Baru" atau "Demo", kata simulasi/demo/mock, dan komentar pengembang.
- Paragraf pengantar di atas formulir atau tabel.

HANYA teks berikut yang boleh tampil:
1. Konten asli aplikasi (isi berita, nama produk, data).
2. Judul halaman dan judul bagian (satu frasa singkat).
3. Label tombol dan menu (kata kerja singkat, 1-3 kata).
4. Label kolom isian (satu frasa singkat, tetap tampil di atas kolom, tanda * untuk yang wajib).
5. Pesan kesalahan validasi, hanya saat terjadi kesalahan.
6. Notifikasi singkat hasil aksi (misalnya "Berhasil disimpan", "Gagal mengunggah", "Berhasil dihapus") yang tampil hanya 0,5 detik lalu hilang sendiri, dan teks status biasa tanpa bingkai (misalnya "Offline" saat tidak ada internet, atau "Belum aktif" pada tab yang belum diaktifkan).
7. Judul singkat keadaan kosong (misalnya "Belum ada data"), tanpa kalimat penjelasan.
Placeholder kolom dikosongkan, atau berisi contoh isi murni (misalnya nama orang), tidak pernah berupa kalimat instruksi.

MUDAH DIGUNAKAN DAN DIPAHAMI TANPA PENJELASAN:
- Tombol berlabel kata kerja singkat yang langsung jelas (Simpan, Tambah Siswa, Unduh Laporan, Cari, Pilih Gambar). Ikon HANYA untuk kontrol interaktif fungsional (panah geser carousel, panah buka/tutup akordeon, tombol hapus dan edit, tombol WhatsApp, ikon hamburger pembuka sidebar) dan diberi aria-label tersembunyi, bukan tulisan tampil.
- Gunakan pola antarmuka yang sudah dikenal: kolom unggah berupa satu tombol "Pilih Gambar" atau "Pilih Dokumen"; setelah file dipilih tampilkan pratinjau (gambar kecil, atau nama file untuk dokumen) dan ikon hapus; saat mengunggah tampilkan indikator putar pada tombol, tanpa tulisan penjelasan.
- Satu aksi utama per layar: tombol utama berwarna aksen dan menonjol, aksi sekunder berbentuk garis tepi, aksi berbahaya berwarna merah dan meminta konfirmasi lewat dialog singkat (judul dan dua tombol saja).
- Posisi konsisten di seluruh aplikasi: tombol Tambah di kanan atas daftar; Simpan dan Batal di kanan bawah formulir; pencarian dan filter di atas tabel; menu selalu di tempat yang sama.
- SEMUA kolom edit atau input teks (kolom teks panjang, deskripsi, editor teks, dan sejenisnya) otomatis membesar ke bawah mengikuti isi yang diketik, tanpa bilah gulir internal dan tanpa perlu ditarik manual; tinggi awal ringkas (satu atau dua baris) dan tidak terbatas ke bawah. Berlaku di semua formulir, CMS, panel admin, HP, dan desktop.
- Formulir dikelompokkan dalam bagian berjudul singkat, urutan kolom mengikuti urutan pikiran pengguna, kolom pilihan memakai dropdown atau pilihan bertombol dengan label jelas.
- Menu dikelompokkan logis dan hanya berisi teks (tanpa ikon dekoratif), item aktif disorot jelas.
- Hierarki visual jelas: ukuran huruf konsisten untuk judul halaman, judul bagian, dan isi; kontras warna cukup; tabel dengan judul kolom jelas.

MENU, DROPDOWN, DAN PANEL MELAYANG (dropdown pilihan, sidebar, menu aksi baris tabel, menu profil, pemilih tanggal, notifikasi, popover):
- Selalu tampil penuh di dalam layar, termasuk di ponsel kecil: tidak terpotong, tidak tersembunyi di balik elemen lain, tidak membuat halaman bergeser ke samping. Menu tampil di lapisan paling atas sehingga tidak terpotong oleh kartu, kontainer, atau tabel yang bisa digulir.
- Posisi menyesuaikan ruang: bila tidak muat di bawah, tampil ke atas; bila tidak muat di kanan, geser ke kiri. Lebar maksimum = lebar layar dikurangi 16px; tinggi maksimum = tinggi layar dikurangi 32px dengan gulir di dalam menu. Di ponsel, menu panjang atau pemilih tampil sebagai panel dari bawah (bottom sheet).
- Menutup otomatis saat pengguna mengetuk atau mengklik di luar area menu, menekan Escape, memilih satu item, berpindah halaman, atau membuka menu lain. Hanya satu menu terbuka pada satu waktu.
- Area sentuh tiap item minimal 44px; item aktif jelas; navigasi keyboard (panah, Enter) berfungsi di desktop.
- Dialog (modal) juga responsif: lebar maksimum layar dikurangi 32px, isi bisa digulir, tombol aksi selalu terlihat, dan menutup bila lapisan gelap di luarnya diketuk (kecuali formulir yang sedang diisi, yang meminta konfirmasi singkat).

KERAPIAN VISUAL: spasi lega, grid konsisten, tidak penuh sesak, tidak ada elemen dekoratif tanpa fungsi, bayangan dan sudut membulat konsisten, tampilan bersih dan hemat ruang vertikal dengan mengandalkan tipografi murni, spasi lega, dan hierarki teks yang jelas.

TEMA: tidak ada tombol atau fitur pengalih tema terang/gelap. Aplikasi memakai satu tema yang mengikuti warna tema aplikasi.

NOTIFIKASI: semua notifikasi (misalnya berhasil disimpan, berhasil dihapus) tampil hanya 0,5 detik (500 ms) lalu hilang sendiri, tanpa tombol tutup.

LARANGAN PILL BADGE DAN TOMBOL PALSU: dilarang membungkus teks metadata, label fitur, atau kata penegas dalam bentuk kapsul lonjong, chip, badge, atau kotak berbingkai (pill badge atau rounded chip) yang menyerupai tombol tetapi tidak bisa diklik. Jangan buat elemen visual apa pun yang tampak seperti tombol jika elemen itu tidak memiliki fungsi klik atau aksi. Teks penegas hanya boleh berupa teks biasa tanpa bingkai, atau langsung dihilangkan. Teks status (misalnya "Belum aktif", "Offline") juga berupa teks biasa tanpa bingkai.

LARANGAN IKON DEKORATIF DAN ORNAMEN PENGHIAS: dilarang menempatkan ikon dekoratif tanpa fungsi di atas kartu, judul, atau blok teks (seperti ikon tanda seru di atas kartu masalah, ikon hiasan di atas kartu manfaat, atau ikon ilustrasi kecil di samping judul). Jangan gunakan ikon hanya sebagai pemanis visual atau pengisi ruang kosong. Tampilan, khususnya di layar HP, harus bersih, minimalis, dan hemat ruang vertikal dengan mengandalkan kekuatan tipografi murni, spasi lega, dan hierarki teks yang jelas. Ikon HANYA diperbolehkan untuk kontrol interaktif fungsional yang memerlukan aksi klik atau sentuh langsung (seperti tombol panah geser carousel, panah buka/tutup akordeon, tombol hapus dan edit, dan tombol kontak WhatsApp). Keadaan kosong hanya berupa judul singkat, tanpa ikon atau ilustrasi.

TAMPILAN HP ADALAH PRIORITAS UTAMA. Sebagian besar pengguna memakai HP, jadi semua menu, tombol, formulir, tabel, dialog, dan panel admin harus rapi, proporsional, mudah dipahami, dan mudah dioperasikan dengan satu jari di layar 360-430px. Desktop tetap rapi sebagai tampilan kedua. Tidak boleh ada tombol atau menu yang tersembunyi, berantakan, terpotong, tumpang tindih, atau tidak proporsional.

SIDEBAR TERSEMBUNYI DI HP (wajib persis seperti ini):
- Khusus tampilan HP, semua bilah menu (di tampilan publik maupun admin) berupa sidebar yang tersembunyi dan dimunculkan dengan tombol pembuka.
- Bilah atas (header) di HP HANYA berisi logo atau nama. HAPUS semua tombol menu atau hamburger dari header; tidak boleh ada tombol hamburger atau tombol lain untuk membuka sidebar di header.
- Tombol pembuka sidebar berada di tepi kiri layar, tepat di tengah tinggi layar, dan tidak ikut ter-scroll (tetap di tempat saat halaman digulir). Ukurannya tinggi 120px dan lebar 25px, sedikit membulat, warna mengikuti warna tema aplikasi yang sedang aktif dengan sedikit transparan agar tampil modern, dan hanya berisi satu ikon hamburger tanpa teks apa pun.
- Saat sidebar dibuka: layar di belakangnya terkunci sehingga saat isi sidebar digulir layar latar tidak ikut ter-scroll; ada lapisan gelap di belakang sidebar; mengetuk area di luar sidebar otomatis menutup sidebar; isi menu di dalam sidebar bisa digulir mandiri dengan rapi.
- SELURUH isi menu terlihat penuh di dalam layar, tidak terpotong dan tidak keluar layar. Item tersusun vertikal satu kolom, rata kiri, hanya teks (tanpa ikon), tinggi tiap item minimal 48px, huruf minimal 16px, jarak seragam, item aktif disorot. Submenu berupa akordeon di dalam sidebar.
- Item "Masuk" (login) adalah satu item biasa di daftar menu sidebar, item terakhir, bergaya sama dengan item lain, dan tidak boleh menggeser, menyembunyikan, atau memperkecil item menu lain. Di desktop, "Masuk" adalah item terakhir di deretan menu; bila deretan menu terlalu penuh, beralih ke sidebar pada lebar yang lebih besar daripada membiarkan menu bertumpuk atau terpotong.

TAMPILAN COMPACT DI HP UNTUK MENU DAN FITUR DI ISI HALAMAN: bila ada menu atau fitur yang berisi ikon dan teks, rapikan letaknya dan jangan memakan tempat. Jangan susun ikon di kiri dengan tulisan di bawahnya rata kiri karena memakan tempat dan kurang rapi. Ikon tidak penting; jangan fokus membuat ikon yang membuat tampilan tidak rapi dan mubazir. Gunakan teks ringkas yang compact.

STANDAR TAMPILAN HP LAINNYA:
- Tidak ada elemen yang lebih lebar dari layar dan tidak ada gulir ke samping.
- Semua tombol dan tautan minimal 44px dengan jarak cukup, tidak berhimpitan.
- Huruf isi minimal 16px; judul proporsional (tidak memenuhi layar); kolom isian setinggi minimal 48px dengan huruf 16px.
- Satu kolom; kartu penuh lebar dengan jarak samping sekitar 16px; tabel menjadi kartu bertumpuk.
- Formulir panjang memiliki bilah aksi di bawah layar (Simpan dan Batal) yang selalu terlihat; tombol aksi penuh lebar.
- Gambar dan video berukuran proporsional dengan rasio tetap dan tidak terpotong aneh; peta dan video profil penuh lebar.
- Banner utama tidak lebih tinggi dari satu layar dan teks di atasnya terbaca jelas.
- Dialog tampil sebagai panel dari bawah atau hampir penuh layar dengan tombol tutup yang jelas; tombol aksi dialog selalu terlihat.
- Menghormati area aman layar (lekukan kamera dan bilah gestur) sehingga tombol tidak tertutup.
- Panel admin di HP memakai sidebar tersembunyi yang sama; tabel data menjadi daftar kartu dengan menu aksi ringkas; grafik menyesuaikan lebar layar.
- Interaksi sentuh mulus: gulir halus tanpa tersendat, gestur geser (galeri, carousel, sidebar) mengikuti jari dan berhenti rapi, tidak ada gulir ganda atau halaman terkunci, tidak ada lonjakan tampilan saat memuat.
- Sebelum dianggap selesai, periksa setiap halaman di lebar 360px, 390px, dan 430px: tidak ada tombol tersembunyi, teks terpotong, tumpang tindih, atau elemen tidak proporsional.

TABLET DAN DESKTOP: tablet (768-1024px) dua kolom bila sesuai; desktop (di atas 1024px) navigasi atas atau sidebar untuk dashboard admin, grid beberapa kolom, lebar konten dibatasi agar nyaman dibaca, tabel penuh.

Seluruh penjelasan teknis (Drive, Apps Script, spreadsheet, base64, batas ukuran, tipe file) hanya berada di kode dan komentar kode, TIDAK PERNAH di tampilan. Aturan ini berlaku sama untuk dashboard admin, panel CMS, dan tab Sinkronisasi (tab ini hanya boleh berisi kotak kode, label, kolom, tombol, dan status).

## Aturan Desain Permanen (kunci di kode)
Buat satu berkas aturan desain permanen di dalam proyek (misalnya di folder konstanta dengan nama designSystem) yang memuat aturan tampilan di bawah ini sebagai komentar dan konstanta. Di baris paling atas setiap komponen utama (halaman publik, panel admin, CMS, formulir, dan komponen bersama) tambahkan penanda: "// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk." Setiap revisi atau penambahan fitur pada proyek ini WAJIB membaca dan mematuhi berkas itu lebih dulu, tanpa perlu diingatkan pengguna di setiap chat.

Isi aturan:
- Prinsip: minimalis, bersih, ringkas, dan jelas, tampil seperti produk jadi yang profesional.
- Tanpa teks panjang: dilarang paragraf instruksi, tips, teks bantuan, atau penjelasan fungsi di seluruh tampilan, formulir, dan pengaturan CMS, termasuk penjelasan teknis (Drive, Apps Script, spreadsheet, format dan batas file).
- Teks hanya label singkat 1-3 kata. Placeholder dikosongkan atau berisi contoh isi murni, bukan instruksi.
- Tombol aksi (Simpan, Hapus, Kosongkan) tegas, langsung, dan fungsional, dengan label kata kerja singkat.
- Setiap kolom gambar selalu punya tombol "Hapus Gambar" berikon tempat sampah di samping pratinjau; logo, banner, dan gambar popup juga bisa dihapus satu per satu (dan "Hapus Semua" untuk banner bila ada banyak).
- Judul dan subjudul banner (dan teks serupa) boleh dikosongkan, dengan tombol cepat "Kosongkan". Bila teks kosong, tampilkan gambar murni tanpa gradien, lapisan gelap, atau wadah teks yang menutupi gambar.
- Semua kolom edit atau input teks otomatis membesar ke bawah mengikuti isinya, tanpa bilah gulir internal.
- Tidak ada gambar bawaan yang ditulis mati di kode atau komponen. Semua gambar berasal dari pengaturan yang bisa diganti atau dihapus dari panel; bila kosong tampilkan kerangka netral.
- Tidak ada tombol pengalih tema terang/gelap. Notifikasi hasil aksi tampil hanya 0,5 detik lalu hilang sendiri.
- Di HP: header hanya berisi logo atau nama; menu berupa sidebar tersembunyi yang dibuka tombol 120x25 berikon hamburger di tepi kiri tengah layar, tidak ikut ter-scroll, dengan layar belakang terkunci saat sidebar terbuka dan ketuk di luar untuk menutup.
- Dilarang pill badge, chip, atau kotak berbingkai yang menyerupai tombol tetapi tidak bisa diklik; dilarang ikon dekoratif tanpa fungsi (ikon hanya untuk kontrol interaktif fungsional); tampilan compact dan hemat ruang vertikal.
- Visual bersih: spasi lega, tanpa elemen dekoratif tanpa fungsi, dan tampilan HP tetap rapi, proporsional, serta tidak ada elemen tersembunyi.
- Setiap perubahan baru mempertahankan semua aturan di atas. Jika sebuah permintaan bertentangan dengan aturan ini, tetap patuhi aturan dan sampaikan secara singkat di respons, bukan di tampilan aplikasi.

## 4. Struktur Halaman dan Navigasi

### Bagian Publik (tanpa login)
Menu utama (desktop di header, HP di sidebar tersembunyi): Beranda, Profil, Kelas, Keunggulan, Karya, Tips, Kontak, dan "Masuk" sebagai item terakhir. Tidak ada tombol terpisah di header selain menu; logo dan nama di kiri.

Halaman Beranda (satu halaman panjang, urutan dari atas ke bawah):
1. Hero (hampir setinggi satu layar, di HP tidak melebihi satu layar): foto latar penuh (slot gambar 1) dengan gradasi gelap dari kiri (di HP dari bawah) agar teks terbaca. Isi: sapaan italic emas "Selamat Datang di Guber Smart", judul besar "Belajar Membuat Aplikasi Hanya Bermodalkan Ide" (dua baris), kalimat pendukung, tombol emas "Daftar Sekarang" (membuka halaman lynk.id di tab baru) dan tombol garis emas "Lihat Kelas".
2. Pita keunggulan: kotak navy bergradasi bersudut membulat yang menumpuk menimpa bagian bawah hero (margin atas negatif), garis emas tipis di bawahnya. Lima kolom teks saja (tanpa ikon; di HP dua kolom, kolom kelima penuh lebar), pemisah garis emas tipis antarkolom di desktop. Isi: "Tanpa Koding" / "Cukup bawa ide Anda"; "Dipandu Bertahap" / "Langkah demi langkah sampai jadi"; "Praktik Langsung" / "Belajar sambil membangun"; "Aplikasi Sungguhan" / "Hasil akhir yang bisa dipakai"; "Komunitas Member" / "Belajar bersama, saling bantu".
3. Profil (id profil): dua kolom. Kiri: label "Tentang Kami", judul "Mengubah Ide Menjadi Aplikasi, Tanpa Pusing Koding", paragraf pengantar tentang Guber Smart, tombol emas "Selengkapnya" yang menggulir ke Visi dan Misi. Kanan: foto (slot gambar 2, rasio sekitar 1,25:1, sudut bulat) dengan kartu kutipan navy yang menumpuk di sisi kanannya (Lora italic, garis emas kecil di bawah), serta kotak emas transparan sebagai hiasan di pojok kiri atas foto. Kutipan: "Setiap orang punya ide hebat. Tugas kami memastikan ide itu menjadi aplikasi nyata."
4. Visi dan Misi: dua kartu berdampingan. Kartu navy dengan pola emas berjudul "VISI": "Menjadikan setiap orang mampu mewujudkan idenya menjadi aplikasi nyata tanpa harus memahami koding." Kartu putih "MISI" berisi daftar bernomor (angka dalam lingkaran bergaris emas): (1) Menyediakan pembelajaran membuat aplikasi yang sederhana dan mudah diikuti oleh siapa saja. (2) Memandu peserta dari ide sampai aplikasi jadi lewat langkah yang jelas. (3) Membekali peserta dengan prompt dan metode yang siap dipakai. (4) Membangun komunitas yang saling mendukung dalam berkarya.
5. Kelas (id kelas, latar krem-2): label "Program Kelas", judul "Pilih Kelas Anda", pengantar singkat. Kartu kelas (1 kolom di HP, 2 di tablet, 3 di desktop): gambar kelas di atas, nama kelas, deskripsi singkat, harga (harga normal dicoret bila ada diskon, dan harga sekarang tebal), tombol garis "Lihat Detail" dan tombol emas "Daftar" yang membuka tautan lynk.id milik kelas itu di tab baru. Hanya kelas berstatus aktif yang tampil.
6. Alur Belajar: label "Cara Belajar", judul "Empat Langkah Menjadi Aplikasi". Empat langkah bernomor (angka dalam lingkaran bergaris emas) sebagai teks saja: Tulis Ide, Susun Prompt, Bangun Aplikasi, Publikasikan, masing-masing dengan satu kalimat singkat.
7. Keunggulan (id keunggulan, latar gelap navy bergradasi dengan pola emas): dua kolom. Kiri foto (slot gambar 3, rasio sekitar 1,15:1) dengan garis tepi emas tipis. Kanan: label "Keunggulan", judul "Belajar Lebih Mudah dengan Dukungan Lengkap", pengantar singkat, lima ubin teks saja (tanpa ikon, saling berbatas garis tipis emas): Materi Bertahap, Prompt Siap Pakai, Bimbingan Member, Komunitas Belajar, Praktik Langsung; tombol emas "Lihat Karya" yang menggulir ke bagian Karya.
8. Karya (id karya): label "Karya Peserta", judul "Aplikasi yang Lahir dari Ide Peserta", pengantar singkat, tautan emas "Lihat Semua Karya". Grid 4 foto (2 kolom di HP dan tablet) dengan teks judul di bagian bawah foto dan titik emas kecil; foto zoom pelan saat di-hover; bila karya punya tautan, foto bisa diklik membuka tautan itu.
9. Testimoni: label "Testimoni", judul "Kata Mereka yang Sudah Belajar". Kartu testimoni (nama, asal atau profesi, kutipan); di HP berupa carousel geser yang mulus.
10. Tips (id tips, latar krem-2): label "Tips dan Informasi", judul "Update Terbaru", pengantar singkat, tautan emas "Lihat Semua Tips". Tiga kartu terbaru (gambar sampul, kategori berupa teks emas biasa, tanggal berformat "27 Okt 2026", judul, tautan "Selengkapnya"). Bila belum ada: "Belum ada tips".
11. FAQ: label "Pertanyaan", judul "Yang Sering Ditanyakan", daftar akordeon (panah buka/tutup) berisi pertanyaan dan jawaban.
12. Ajakan: kartu lebar bersudut bulat dengan foto latar (slot gambar 4) dan gradasi navy dari kiri. Label "Pendaftaran Dibuka", judul "Bergabunglah Bersama Guber Smart", teks pendek, tombol emas "Daftar Sekarang" (lynk.id) dan tombol garis "Tanya Dulu" (membuka WhatsApp dengan pesan awal: "Assalamu'alaikum, saya ingin bertanya tentang kelas Guber Smart.").
13. Kontak (id kontak): label "Kontak", judul "Hubungi Kami", pengantar singkat. Kartu putih: "WhatsApp" dengan nomor 0853-7660-4024 (tautan wa.me/6285376604024), "Jam Layanan" (teks yang diatur dari panel), dan kartu lebar "Media Sosial" yang hanya menampilkan akun yang sudah diisi dari panel. Tidak ada peta, tidak ada alamat.
14. Footer (navy paling gelap dengan pola emas): logo dan nama, semboyan italic emas "Ide • Aplikasi • Karya", deskripsi singkat; kolom "Tautan Cepat" (Beranda, Profil, Kelas, Keunggulan, Karya, Tips, Kontak, Masuk); kolom "Hubungi Kami" (nomor WhatsApp dan ikon tautan media sosial yang terisi). Baris bawah: "© 2026 Guber Smart. All rights reserved." dan teks penutup pendek dari pengaturan.
15. Tombol WhatsApp melayang: bulat hijau di pojok kanan bawah (menghormati area aman layar); di beranda baru muncul (memudar dan naik) setelah halaman digulir melewati sekitar separuh hero.

Halaman Detail Kelas (alamat tersendiri per kelas, tanpa login): gambar kelas, nama, harga (coret dan sekarang), kuota atau status bila diisi, deskripsi lengkap, daftar materi per pertemuan (akordeon), hasil akhir yang didapat, cocok untuk siapa, jadwal, FAQ khusus kelas bila ada, dan tombol emas "Daftar Sekarang" ke lynk.id yang tetap terlihat di bagian bawah layar HP, plus tombol "Tanya Dulu" WhatsApp. Kelas lain ditampilkan sebagai rekomendasi di bagian bawah.

Halaman Daftar Tips: header halaman bergambar (slot gambar 5) dengan overlay navy dan judul besar, grid kartu (3 kolom desktop, 2 tablet, 1 HP) dengan cuplikan isi, pencarian, filter kategori, dan penomoran halaman. Halaman Karya: grid semua karya dengan filter kategori. Halaman Artikel: kartu putih berlebar 820px di tengah (penuh lebar di HP): kategori, judul Lora, tanggal dan penulis, gambar sampul, isi nyaman dibaca (16,5px, tinggi baris 1,85), gambar dalam isi bersudut bulat, tombol "Kembali". Halaman 404 yang rapi dengan tombol kembali ke beranda.

### Bagian Admin (login, peran admin) dan Bagian Superadmin (login, peran superadmin)
Panel admin tidak terlihat publik; hanya terbuka setelah "Masuk". Di HP panel memakai sidebar tersembunyi yang sama; di desktop sidebar tetap di kiri. Menu admin: Dasbor, Kelas, Testimoni, Karya, Tips, FAQ, Kata Sandi, Keluar. Menu tambahan superadmin: CMS, Sinkronisasi, Firebase, Log Aktivitas, Kelola Admin.

## 5. Fitur dan Perilaku

### Bagian Publik
- Pendaftaran langsung ke lynk.id: setiap tombol "Daftar" dan "Daftar Sekarang" membuka tautan lynk.id di tab baru. Tiap kelas punya tautan sendiri; tombol umum di hero dan ajakan memakai tautan umum dari pengaturan. Tidak ada formulir pendaftaran, keranjang, atau pembayaran di website ini. Setiap klik tombol daftar dihitung per kelas untuk statistik admin (hanya angka penghitung, tanpa data pribadi).
- Kartu dan detail kelas: pengunjung menjelajah kelas, melihat harga, materi, dan jadwal; kelas berstatus arsip atau nonaktif tidak tampil.
- Tombol "Tanya Dulu" dan WhatsApp melayang membuka WhatsApp ke nomor 6285376604024 dengan pesan awal yang sudah terisi.
- Tips: daftar terbaru lebih dulu, hanya yang berstatus terbit, dengan pencarian dan filter kategori.
- Karya, testimoni, dan FAQ tampil dari data yang dikelola admin.
- Menu aktif mengikuti bagian yang sedang terlihat; klik menu menggulir halus; di halaman selain beranda, klik menu kembali ke bagian terkait di beranda.
- Judul dan deskripsi halaman, tampilan pratinjau saat tautan dibagikan (judul dan gambar), serta data terstruktur lembaga pendidikan, diatur dari pengaturan.
- Tidak ada fitur notifikasi (tidak ada notifikasi pendaftar, pengingat, pesan masuk, atau pusat notifikasi); hanya notifikasi hasil aksi admin berdurasi 0,5 detik sesuai aturan tampilan.

### Bagian Admin
- Dasbor: angka ringkasan (jumlah kelas aktif, total klik Daftar, jumlah tips terbit, jumlah testimoni), grafik batang klik Daftar per kelas dengan filter periode (7 hari, 30 hari, semua), dan daftar aktivitas terbaru.
- Kelola kelas: tambah, ubah, urutkan, nonaktifkan, dan arsipkan kelas. Isian: nama, alamat halaman, gambar, deskripsi singkat, deskripsi lengkap, harga normal, harga sekarang, status (aktif, nonaktif), kuota atau keterangan sisa tempat, jadwal, tautan lynk.id kelas, daftar materi per pertemuan (judul dan isi), hasil akhir, cocok untuk siapa, dan FAQ khusus kelas. Konfirmasi sebelum hapus permanen, arsip sebelum hapus, dan urung singkat setelah menghapus.
- Kelola testimoni (nama, asal atau profesi, foto opsional, kutipan, tampil/sembunyi), karya peserta (judul, gambar, tautan, kategori), FAQ (pertanyaan, jawaban, urutan), dan tips (lihat Publikasi, Thumbnail, dan Editor Teks).
- Setiap daftar punya pencarian, filter, urutan, dan penomoran halaman; keadaan kosong, memuat (kerangka), dan galat tampil rapi tanpa teks penjelasan.
- Ekspor daftar kelas dan statistik klik ke CSV.
- Ubah kata sandi sendiri.

### Bagian Superadmin
- CMS penuh: seluruh tampilan publik dapat diatur (lihat bagian Integrasi).
- Kelola akun admin (daftar, tambah, nonaktifkan, atur ulang kata sandi) dan kata sandi semua peran.
- Tab Sinkronisasi (kode Apps Script dan pengaturan koneksi), tab Firebase nonaktif, dan log aktivitas (peran, aksi, waktu).
- Pengaturan tautan lynk.id umum, nomor WhatsApp, pesan awal WhatsApp, jam layanan, dan akun media sosial.

## 6. Data Contoh
Isi data awal yang realistis agar website langsung terlihat hidup (semua dapat diubah dari panel):
- Tiga kelas: "Kelas Website dengan Google AI Studio", "Kelas Aplikasi Google Apps Script", dan "Kelas Aplikasi Android (APK)", masing-masing dengan deskripsi, harga normal dan harga sekarang yang masuk akal dalam Rupiah (contoh Rp299.000 dicoret menjadi Rp199.000), 6 sampai 8 pertemuan materi, hasil akhir, cocok untuk siapa, jadwal, dan tautan lynk.id awal berupa lynk.id.
- Enam testimoni dengan nama dan profesi beragam (guru, pemilik usaha kecil, mahasiswa, ibu rumah tangga).
- Delapan karya peserta dengan judul aplikasi realistis (misalnya aplikasi absensi, toko online, kasir sederhana, jurnal mengajar, undangan digital).
- Empat tips terbit dengan kategori berbeda dan isi paragraf yang wajar.
- Enam FAQ (misalnya apakah perlu paham koding, perangkat yang dibutuhkan, cara belajar, cara mendaftar, bantuan setelah kelas, kebijakan akses materi).
- Jam layanan contoh dan satu akun media sosial contoh kosong (tidak tampil sampai diisi).
- Gambar: kerangka netral navy bergradasi sampai admin mengisinya.

## 7. Peran Pengguna dan Akses
Model akses: publik + admin. Seluruh website terbuka untuk pengunjung; panel admin dan superadmin ada di balik login. Peran: publik (tanpa login), admin, superadmin. Superadmin mengelola semua; admin mengelola isi (kelas, testimoni, karya, tips, FAQ) dan melihat dasbor.

## Login Kata Sandi dan Data
- Login HANYA dengan kata sandi (tanpa email, tanpa akun Google, tanpa nama pengguna). Kata sandi yang dimasukkan menentukan peran. Kata sandi awal: admin = admin123, superadmin = superadmin123. Semua kata sandi dapat diubah. Tidak ada pendaftaran publik.
- Tombol login TIDAK diletakkan di badan halaman dan TIDAK berupa tombol terpisah di header. Letakkan sebagai SATU ITEM BIASA bernama "Masuk" di dalam daftar menu, sebagai item terakhir, dengan gaya yang sama seperti item menu lain, sehingga tidak mengubah susunan atau ukuran menu lain. Di HP: header hanya berisi logo atau nama, dan menu berupa sidebar tersembunyi (dibuka tombol hamburger di tepi kiri tengah layar); "Masuk" adalah item terakhir di daftar menu di dalam sidebar, sejajar dan selaras dengan item lain. Di desktop: "Masuk" adalah item terakhir pada deretan menu; bila deretan menu terlalu penuh, beralih ke sidebar pada lebar layar yang lebih besar, jangan membiarkan menu bertumpuk, terpotong, atau tersembunyi. Mengetuk "Masuk" membuka dialog sederhana berisi satu kolom "Kata Sandi" (dengan tombol lihat/sembunyikan) dan tombol "Masuk". Setelah berhasil masuk, item "Masuk" berganti menjadi satu item "Dasbor" di posisi yang sama tanpa menggeser menu lain; tombol "Keluar" berada di dalam dasbor, dan di HP tampil sebagai item terakhir daftar menu sidebar.
- Ubah kata sandi: di panel ada menu "Kata Sandi". Admin mengubah kata sandinya sendiri; superadmin mengubah kata sandi semua peran. Formulirnya berisi kata sandi lama (untuk mengubah milik sendiri), kata sandi baru, dan ulangi kata sandi baru, dengan validasi (minimal 8 karakter) dan notifikasi singkat saat berhasil.
- Kata sandi tidak disimpan sebagai teks biasa; simpan dalam bentuk hash dengan garam. Verifikasi login dan perubahan kata sandi diproses oleh Apps Script terhadap hash di sheet khusus: aplikasi mengirim kata sandi yang diketik, Apps Script memeriksanya, lalu mengembalikan hasil dan peran tanpa pernah mengirim hash ke aplikasi.
- Sesi login berakhir otomatis setelah 30 menit tidak aktif dan saat menekan Keluar.
- Superadmin: kelola kata sandi semua peran, akun admin, pengaturan, CMS, sinkronisasi, dan semua isi. Admin: kelola kelas, testimoni, karya, tips, dan FAQ. Publik: hanya melihat halaman publik tanpa login.
- Halaman admin dilindungi: pengguna yang belum masuk diarahkan ke dialog login; menu yang tidak berhak tidak ditampilkan.
- Data: seluruh data dan pengaturan aplikasi memakai data contoh realistis yang disimpan dalam satu lapisan data terpisah dan semuanya berupa teks (file tidak pernah disimpan di dalamnya, hanya ID atau tautannya). Penyimpanan ke Google Sheets tidak dikerjakan di bagian ini, melainkan di bagian terakhir file.

## 8. Keadaan Khusus
Setiap daftar dan halaman punya keadaan kosong (judul singkat saja), memuat (kerangka netral), dan galat yang ramah tanpa kalimat penjelasan. Kontras cukup, fokus keyboard terlihat (garis emas), label kolom jelas, area sentuh besar. Gambar di luar layar pertama dimuat belakangan, daftar panjang dimuat bertahap, dan tidak ada lonjakan tampilan saat memuat. Hormati preferensi gerak berkurang (animasi dimatikan). Tampilan cetak halaman detail kelas rapi.

## Halaman Tetap Saat Dimuat Ulang
Saat pengguna memuat ulang (refresh) atau membuka kembali aplikasi, aplikasi tetap berada di halaman yang sedang dibuka, bukan kembali ke beranda. Ini berlaku untuk semua halaman publik, halaman detail, halaman dan tab di panel admin dan superadmin, serta menu atau filter aktif yang penting. Setiap halaman memiliki alamat sendiri yang bisa dibagikan dan dibuka langsung. Tombol kembali dan maju pada peramban atau HP berfungsi benar. Sesi login admin tetap aktif setelah dimuat ulang selama belum berakhir, sehingga admin tidak perlu masuk lagi. Hal yang sama berlaku saat aplikasi dibuka offline (jika didukung).

## Akses Offline dan Interaksi Mulus
Jika didukung, aplikasi bisa dibuka dan dipakai saat offline: halaman, tampilan, dan data terakhir tersimpan di perangkat. Tampilkan teks status "Offline" yang singkat (tanpa bingkai) saat tidak ada koneksi.
Interaksi sentuh harus mulus: gulir halaman halus tanpa tersendat, gestur geser (galeri, carousel, laci menu) mengikuti jari dengan lancar dan berhenti rapi pada posisi yang tepat, tidak ada gulir ganda atau halaman terkunci, dan tidak ada lonjakan tampilan saat memuat.

## 9. Integrasi

## Slot Gambar
Semua gambar adalah slot yang bisa diganti dari panel (tidak ditulis mati di kode), dengan object-fit cover dan kerangka netral bila kosong:
1. Hero beranda: lanskap lebar (sekitar 16:9), objek utama di sisi kanan, sisi kiri lebih lengang untuk teks.
2. Profil: rasio sekitar 1,25:1.
3. Keunggulan: rasio sekitar 1,15:1.
4. Latar kartu ajakan: lebar.
5. Latar header halaman daftar tips: lebar.
6. Gambar setiap kelas (satu per kelas): rasio sekitar 1,6:1.
7. Foto setiap karya peserta (satu per karya): rasio sekitar 1,45:1.
8. Gambar sampul setiap tips: rasio sekitar 1,9:1; bila kosong tampilkan kerangka netral.
9. Foto testimoni (opsional) dan logo (bulat atau persegi, latar transparan), serta favicon dan gambar pratinjau saat dibagikan.

## Sumber Gambar dan File
Semua gambar dan file yang tampil di aplikasi (logo, banner, galeri, gambar kelas, sampul, dokumen) dapat diganti dari panel admin dengan dua cara: (1) unggah file ke Google Drive lewat Apps Script, atau (2) tempel tautan langsung dari layanan hosting gambar seperti Unsplash atau ImgBB. Setiap kolom gambar di panel punya dua tab pendek berlabel "Unggah" dan "Tautan", lalu pratinjau dan ikon hapus.
Simpan sebagai teks: sumber ("drive" atau "tautan") dan nilainya (fileId atau URL). Saat ditampilkan: bila sumber "drive", ambil base64 lewat Apps Script; bila "tautan", pakai URL langsung sebagai src. Bila gambar gagal dimuat, tampilkan kerangka abu netral tanpa teks galat. Gambar contoh awal disimpan sebagai data pengaturan (bukan ditulis mati di komponen) sehingga bisa diganti atau dihapus dari panel. Setiap kolom gambar punya tombol "Hapus Gambar".

## Unggah File
Admin dapat mengunggah gambar dan dokumen ke Google Drive lewat Google Apps Script. Periksa jenis dan ukuran file (jenis: gambar JPG, PNG, WEBP; batas: 5 MB), tampilkan pesan hanya bila ditolak. Gambar dikompres otomatis sebelum diunggah. Setelah berhasil, simpan HANYA teks berupa ID file, nama file, dan tautan. Admin bisa menghapus file yang sudah diunggah. Antarmuka unggah hanya berupa tombol "Pilih Gambar" atau "Pilih Dokumen", lalu pratinjau dan ikon hapus, dengan indikator putar saat mengunggah. Tidak ada teks di UI yang menyebut Drive, Apps Script, spreadsheet, format, atau batas ukuran.

## Menampilkan Gambar
Gambar yang tersimpan di Drive ditampilkan otomatis dengan mengubah tautan/ID-nya menjadi base64 lewat Apps Script. Simpan hasilnya selama sesi agar tidak diunduh ulang. Saat memuat tampilkan kerangka abu netral; bila gagal, tampilkan latar abu halus tanpa teks galat. Gambar di luar layar dimuat belakangan.

## Panel Admin: Tab Sinkronisasi (hanya superadmin)
Buatkan tab "Sinkronisasi" di panel admin yang berisi:
1. Kode Google Apps Script lengkap yang Anda buat sesuai fungsi yang dibutuhkan aplikasi ini: uji koneksi, unggah file ke folder Google Drive, hapus file, dan ambil gambar agar bisa ditampilkan; serta verifikasi login, ubah kata sandi, dan baca, tambah, ubah, dan hapus data di sheet sesuai bagian Sinkronisasi ke Google Sheets. Tampilkan dalam kotak kode dengan tombol "Salin Kode". Bagian atas kode berisi pengaturan (token, ID folder Drive, ID spreadsheet) yang diisi pemilik. Kode harus siap tempel tanpa perubahan lain.
2. Kolom isian URL Web App, Token, ID Folder Drive, ID Spreadsheet, dan tombol Simpan.
3. Tombol "Uji Koneksi" dengan teks status biasa tanpa bingkai (Terhubung atau Gagal).
4. Pengaturan sheet yang dipakai dan daftar koleksi data (kelas, testimoni, karya, tips, FAQ, pengaturan, akun, statistik klik) dengan tombol "Sinkronkan" dan waktu sinkron terakhir.
Simpan pengaturan ini pada lapisan data pengaturan aplikasi: URL bersifat publik agar gambar tampil, sedangkan token dan ID hanya untuk staf. Tab ini tanpa teks petunjuk: hanya kotak kode, label, kolom, tombol, dan status.

## Tab Firebase (belum aktif)
Tambahkan satu tab bernama "Firebase" di panel superadmin yang tampil di daftar tab seperti tab lain, tetapi dalam keadaan NONAKTIF: tampil dengan teks status biasa "Belum aktif" (tanpa bingkai), berisi tombol "Sinkronkan" dan kolom yang semuanya nonaktif (tidak bisa diklik atau diisi) dan tidak melakukan apa pun. Tab ini hanya kerangka tampilan: JANGAN memasang paket atau SDK, JANGAN menulis kode integrasi Firebase atau Firestore, JANGAN meminta pengaktifan Firebase, dan JANGAN menambahkan konfigurasi apa pun untuknya. Tab ini disiapkan agar nanti dapat diaktifkan, dan tanpa teks petunjuk apa pun.

## CMS: Semua Tampilan Dapat Diatur
Buat panel CMS di dashboard admin. SEMUA elemen tampilan publik dibaca dari pengaturan dan dapat diubah dari CMS, tanpa mengubah kode. Tidak boleh ada teks, warna, label tombol, atau tautan yang tertulis mati di komponen; semuanya memakai nilai pengaturan dengan nilai awal sesuai spesifikasi ini.

Menu CMS (tab) dan isinya:
1. Identitas: nama aplikasi, slogan, logo, favicon, judul dan deskripsi halaman (SEO dasar), gambar pratinjau saat dibagikan.
2. Tema: warna utama, sekunder, aksen, latar, teks, warna tombol, jenis huruf (pilihan daftar), ukuran sudut membulat. Tidak ada pengalih tema terang/gelap. Perubahan langsung terlihat pada pratinjau.
3. Navigasi: tambah, ubah, urutkan, tampil/sembunyikan item menu (label dan tujuan tautan).
4. Tombol: semua tombol aksi di tampilan publik (label, tujuan/tautan termasuk tautan lynk.id umum, warna, tampil/sembunyi, posisi).
5. Bagian Halaman: daftar bagian beranda (hero, pita keunggulan, profil, visi misi, kelas, alur belajar, keunggulan, karya, testimoni, tips, FAQ, ajakan, kontak) dengan pengaturan urutan, tampil/sembunyi, judul, label, isi teks, dan gambar.
6. Halaman: tambah, ubah, hapus halaman statis (judul, alamat, isi).
7. Fitur: sakelar aktif/nonaktif untuk setiap fitur aplikasi (bagian testimoni, FAQ, karya, tips, tombol WhatsApp melayang, tombol Tanya Dulu, pencarian tips).
8. Media: tautan video perkenalan kelas (YouTube, bagian video hanya tampil bila tautan diisi) dan galeri. Tidak ada peta.
9. Footer dan Kontak: nomor WhatsApp, pesan awal WhatsApp, jam layanan, tautan media sosial (Instagram, TikTok, YouTube, dan lainnya), semboyan, teks hak cipta.
10. Pratinjau: tombol Pratinjau untuk melihat hasil perubahan. Tidak ada tombol reset atau pulihkan pengaturan di panel mana pun.

Penyimpanan: seluruh pengaturan CMS disimpan sebagai teks pada satu lapisan data pengaturan yang terpisah, awalnya tersimpan di lokal perangkat admin, dan setiap tab punya satu tombol Simpan yang menyimpan ke spreadsheet lewat Apps Script (lihat bagian Sinkronisasi ke Google Sheets). Gambar (logo, favicon, gambar bagian) diunggah ke Google Drive lewat Apps Script atau memakai tautan langsung, dan hanya ID/tautannya yang disimpan sebagai teks.
Hak akses CMS: superadmin mengatur semua tab; admin hanya tab Bagian Halaman, Halaman, dan Footer dan Kontak.
Panel CMS juga tunduk pada aturan tanpa teks petunjuk: hanya label tab, label kolom, tombol, dan status.

## Publikasi, Thumbnail, dan Editor Teks
Setiap konten publikasi (tips, artikel, kelas) memiliki gambar thumbnail yang SELALU tampil: di daftar, kartu, halaman detail, hasil pencarian, dan pratinjau di panel admin, dengan rasio tetap, terpotong rapi, serta kerangka netral saat memuat atau bila gambar kosong. Thumbnail dan gambar di dalam isi diunggah ke Google Drive lewat Apps Script atau memakai tautan langsung, dan hanya ID atau tautannya yang disimpan sebagai teks.
Sediakan editor teks kaya dengan fitur edit yang lengkap: heading (H1-H3) dan paragraf, tebal, miring, garis bawah, coret, warna teks dan sorotan, ukuran huruf, daftar berbutir dan bernomor, perataan kiri/tengah/kanan/rata kanan-kiri, indentasi, kutipan, garis pemisah, tautan, sisip gambar (dari Drive atau tautan) dengan pengaturan ukuran dan perataan, sisip video sematan, tabel, blok kode, urung dan ulang, bersihkan format, serta pratinjau. Toolbar rapi dan dikelompokkan: ikon pemformatan standar boleh berupa ikon saja, dan di HP toolbar membungkus rapi atau menyembunyikan sebagian pada menu "Lainnya" tanpa gulir ke samping. Isi disimpan sebagai teks (format yang aman), dan artikel panjang ditangani dengan baik walaupun ada batas ukuran per sel Google Sheets.
Isian konten: judul, ringkasan singkat, thumbnail, kategori, tanggal terbit, penulis, status (draf atau terbit), dan isi. Daftar publik hanya menampilkan yang berstatus terbit, terbaru lebih dulu, dengan pencarian dan filter kategori.

## 10. Batasan
- Website ini tidak memproses pendaftaran, pesanan, atau pembayaran sendiri; seluruhnya diarahkan ke tautan lynk.id. Jangan membuat formulir pendaftaran, keranjang, atau metode pembayaran. Jangan membuat peta lokasi. Jangan membuat fitur notifikasi (notifikasi pendaftar, pengingat, atau pusat notifikasi).
- Satu-satunya integrasi data adalah Google Sheets (dan Google Drive untuk file) lewat Google Apps Script. Jangan mengintegrasikan atau memasang layanan Firebase atau Firestore, kecuali tab Firebase nonaktif yang hanya berupa kerangka tampilan; seluruh penyimpanan memakai data lokal dan Google Sheets lewat Apps Script.
- Kalimat dalam bagian ini hanya untuk AI Studio dan tidak boleh muncul di tampilan aplikasi.

## Aturan Wajib Deployment Vercel dan Kebersihan Dependensi
Pastikan saat proyek di-push ke GitHub dan di-deploy ke Vercel tidak muncul error Command "npm install" exited with 1 maupun "npm run build" exited with 1.

1. Pembuatan berkas .npmrc (wajib): buat berkas .npmrc di root proyek dengan satu baris isi: legacy-peer-deps=true. Ini wajib ada agar Vercel tidak mengalami kegagalan ERESOLVE saat menjalankan "npm install".
2. Kebersihan package.json: hanya gunakan versi paket resmi dan stabil yang benar-benar ada di npm registry (misalnya typescript wajib versi ^5.x, bukan versi fiktif). Jangan pernah menambahkan paket internal bundler (seperti "esbuild") secara manual ke devDependencies jika proyek menggunakan Vite, karena Vite sudah mengelola versinya sendiri dan akan memicu konflik peer dependency fatal. Jangan memasang dependensi ganda atau paket yang tidak diimpor dalam kode.
3. Ketepatan case-sensitivity (Linux Vercel): seluruh path impor (import ... from '...') wajib mencocokkan persis huruf besar dan huruf kecil nama berkas, karena server build Vercel berbasis Linux yang membedakan huruf besar dan kecil. Jangan mengimpor berkas atau ikon yang tidak diekspor oleh library.
4. Uji mandiri sebelum selesai: sebelum menyatakan tugas selesai, jalankan verifikasi build ("npm run build" dan pemeriksaan lint atau typecheck). Pastikan exit status adalah 0 tanpa galat.

## 11. Ringkasan Struktur Aplikasi
- Halaman publik: Beranda (hero, pita keunggulan, profil, visi dan misi, kelas, alur belajar, keunggulan, karya, testimoni, tips, FAQ, ajakan, kontak, footer), Detail Kelas, Daftar Tips, Daftar Karya, Artikel, 404.
- Panel admin: Dasbor, Kelas, Testimoni, Karya, Tips, FAQ, Kata Sandi. Panel superadmin menambah: CMS, Sinkronisasi, Firebase (nonaktif), Log Aktivitas, Kelola Admin.
- Peran: publik, admin, superadmin (login hanya kata sandi; "Masuk" item terakhir menu).
- Koleksi data (semuanya teks): kelas, materi kelas, testimoni, karya, tips, FAQ, pengaturan CMS, akun dan hash kata sandi, statistik klik daftar, log aktivitas.
- Integrasi: Google Apps Script ke Google Sheets (data teks) dan Google Drive (file); pendaftaran dan pembayaran lewat tautan lynk.id; WhatsApp 6285376604024.
- Gaya: navy dan emas, Lora dan Inter, kartu sudut 18px, tombol kapsul, pola emas bintang segi delapan, tanpa pengalih tema, tanpa teks petunjuk, tanpa badge atau ikon dekoratif.
- Modul utama: halaman per bagian beranda, komponen bersama (menu, sidebar HP, kartu kelas, kartu tips, akordeon FAQ, carousel testimoni, pengunggah gambar, editor teks, grafik), modul admin per menu, modul CMS per tab, lapisan data lokal, lapisan Apps Script, dan berkas designSystem.
- Batasan: tanpa formulir pendaftaran, tanpa pembayaran, tanpa peta, tanpa notifikasi, tanpa Firebase aktif.

## 12. Struktur Kode Modular
Susun kode dalam modul-modul terpisah berupa komponen TSX: satu modul per halaman, per fitur, dan per bagian panel (admin, CMS, superadmin), ditambah komponen bersama yang dipakai ulang (menu, tombol, formulir, kartu, dialog, pengunggah gambar, grafik). Satu berkas satu tanggung jawab, berukuran wajar, bernama jelas, dan dikelompokkan dalam folder yang logis (misalnya halaman, komponen bersama, admin, data, dan konstanta), sehingga satu bagian bisa diubah tanpa menyentuh bagian lain. Pisahkan data dan pengaturan dari tampilan, dan letakkan aturan desain permanen di berkas tersendiri. Hindari satu berkas besar yang berisi banyak hal. Setiap revisi hanya mengubah modul yang diminta, tanpa menyentuh modul lain.

## Sinkronisasi ke Google Sheets (LANGKAH TERAKHIR)
Kerjakan bagian ini PALING AKHIR, setelah seluruh aplikasi di atas selesai dibangun dan berjalan baik dengan data contoh lokal. Jangan mengubah tampilan dan fitur yang sudah jadi. Patuhi berkas aturan desain permanen (designSystem), dan jangan menambahkan teks petunjuk, penjelasan fungsi, atau keterangan teknis apa pun di tampilan, termasuk soal spreadsheet.
Semua pertukaran data dengan Google Sheets memakai Google Apps Script (kodenya ada di tab Sinkronisasi), tanpa kecuali:
- Verifikasi login: aplikasi mengirim kata sandi yang diketik ke Apps Script; Apps Script memeriksanya terhadap hash kata sandi di sheet khusus lalu mengembalikan hasil dan peran. Hash kata sandi tidak pernah dikirim ke aplikasi atau pengunjung. Ubah kata sandi juga diproses oleh Apps Script.
- Input data: tambah, ubah, dan hapus data aplikasi (kelas dan materinya, testimoni, karya, tips, FAQ, akun admin) dan pengaturan CMS ditulis ke sheet lewat Apps Script. Penghitung klik tombol daftar per kelas juga ditambah lewat Apps Script (hanya angka dan tanggal, tanpa data pribadi).
- Tarik data: saat halaman dibuka atau disegarkan, aplikasi menarik data terbaru dari sheet lewat Apps Script dan menampilkannya; perubahan yang disimpan admin terlihat di perangkat lain dengan cara terbaik menurut Anda.
- Hanya teks atau tautan berupa teks yang disimpan di sheet; file tetap lewat Google Drive dengan hanya ID dan tautannya yang disimpan. Data sensitif (hash kata sandi, token) hanya diproses di dalam Apps Script dan tidak dikembalikan kepada aplikasi atau pengunjung.
- Aksi yang mengubah data atau mengambil data non-publik hanya diterima Apps Script bila disertai sesi login yang sah; data publik (kelas aktif, testimoni, karya, tips terbit, FAQ, pengaturan tampilan) boleh ditarik tanpa login, dan penghitung klik daftar boleh ditambah tanpa login.

### Tombol Simpan Pengaturan (hemat kuota)
Pada setiap tab atau menu pengaturan di CMS dan panel admin, sediakan TEPAT SATU tombol "Simpan" yang menyimpan semua perubahan pada tab itu ke spreadsheet lewat Apps Script, baik mengedit, menambah, maupun menghapus.
- JANGAN PERNAH menyimpan pengaturan ke spreadsheet secara otomatis (tidak saat mengetik, berpindah tab, atau menutup halaman). Penyimpanan hanya terjadi saat tombol Simpan ditekan.
- Sebelum Simpan ditekan, semua perubahan (termasuk menambah dan menghapus) hanya tersimpan di penyimpanan lokal perangkat sebagai draf. Tombol Simpan hanya menulis bagian yang berubah, bukan seluruh pengaturan, dan nonaktif bila tidak ada perubahan.
- Yang tersimpan hanya teks atau tautan berupa teks; tidak pernah file, gambar, atau base64.
- Setelah Simpan berhasil, muncul notifikasi singkat "Berhasil disimpan" yang hilang sendiri setelah 0,5 detik.
- Tidak boleh ada tombol reset atau pulihkan pengaturan di panel admin.

PENTING: tampilan aplikasi harus bersih dan profesional seperti produk jadi, sempurna dan responsif di layar HP (menu, tombol, dan semua elemen rapi, proporsional, tidak ada yang tersembunyi), tanpa satu pun teks petunjuk, penjelasan fungsi, atau keterangan teknis (termasuk soal unggah file, Drive, Apps Script, atau spreadsheet). Hanya label, konten, pesan galat, dan notifikasi hasil aksi yang boleh tampil. Tombol, menu, dan kolom harus mudah dipakai dan dipahami lewat label yang jelas saja, tanpa ikon dekoratif dan tanpa badge atau chip berbentuk tombol palsu.
