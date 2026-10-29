// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { ClassItem, TestimonialItem, KaryaItem, TipsItem, FAQItem, CMSSettings, SyncSettings, AdminAccount } from '../types';

export const INITIAL_CLASSES: ClassItem[] = [
  {
    id: 'c1',
    slug: 'kelas-website-google-ai-studio',
    name: 'Kelas Website dengan Google AI Studio',
    image: '',
    shortDesc: 'Panduan lengkap membangun website interaktif berbasis web tanpa koding menggunakan kekuatan AI Studio.',
    fullDesc: 'Kelas intensif yang dirancang untuk siapa saja yang ingin memiliki website profesional sendiri. Anda akan belajar menyusun prompt yang tepat, menstrukturkan ide fitur, hingga mempublikasikan website yang siap dikunjungi pengguna di internet.',
    normalPrice: 299000,
    currentPrice: 199000,
    status: 'active',
    quota: 'Sisa 12 tempat',
    schedule: 'Setiap Sabtu & Minggu (19.30 - 21.00 WIB)',
    lynkidUrl: 'https://lynk.id',
    order: 1,
    clicksCount: 38,
    outcome: 'Website profil bisnis atau lembaga siap rilis lengkap dengan formulir dan tautan media sosial.',
    targetAudience: 'Guru, dosen, pelaku UMKM, mahasiswa, dan siapa saja yang ingin memiliki website mandiri.',
    curriculum: [
      { meeting: 1, title: 'Pemetaan Ide & Kebutuhan Website', content: 'Merumuskan struktur halaman, sasaran pengguna, dan menyusun peta ide proyek.' },
      { meeting: 2, title: 'Teknik Prompting Struktur Halaman', content: 'Menulis instruksi jelas untuk menghasilkan tata letak responsif dan elegan.' },
      { meeting: 3, title: 'Menyempurnakan Tampilan & Desain', content: 'Menata palet warna, tipografi, dan hierarki visual agar tampak profesional.' },
      { meeting: 4, title: 'Menghubungkan Interaksi & Tombol', content: 'Mengatur aksi tautan, navigasi antar bagian, dan integrasi WhatsApp.' },
      { meeting: 5, title: 'Optimasi Layar Ponsel & Uji Coba', content: 'Memastikan seluruh tampilan nyaman digunakan di layar ponsel.' },
      { meeting: 6, title: 'Publikasi & Siap Digunakan', content: 'Menyebarkan website ke internet dengan alamat tautan yang siap dibagikan.' },
    ],
    faqs: [
      { q: 'Apakah butuh laptop berspesifikasi tinggi?', a: 'Tidak. Cukup peramban web modern dan koneksi internet stabil.' },
      { q: 'Bagaimana jika belum pernah membuat website?', a: 'Materi disusun dari nol khusus untuk pemula tanpa latar belakang koding.' },
    ],
  },
  {
    id: 'c2',
    slug: 'kelas-aplikasi-google-apps-script',
    name: 'Kelas Aplikasi Google Apps Script',
    image: '',
    shortDesc: 'Otomatisasi lembar kerja Google Sheets menjadi sistem aplikasi kerja yang menghemat waktu harian Anda.',
    fullDesc: 'Ubah spreadsheet biasa menjadi sistem administrasi, pencatatan otomatis, formulir kerja, dan rekap data instan. Semua dibangun dengan bantuan AI dan Google Apps Script tanpa perlu menghafal sintaksis rumit.',
    normalPrice: 349000,
    currentPrice: 249000,
    status: 'active',
    quota: 'Sisa 8 tempat',
    schedule: 'Setiap Selasa & Kamis (20.00 - 21.30 WIB)',
    lynkidUrl: 'https://lynk.id',
    order: 2,
    clicksCount: 54,
    outcome: 'Sistem aplikasi rekap kerja, absensi otomatis, dan formulir input data ke Google Sheets.',
    targetAudience: 'Staf administrasi, guru, wirausahawan, dan pengelola operasional kantor.',
    curriculum: [
      { meeting: 1, title: 'Konsep Database Sederhana di Google Sheets', content: 'Merapikan tabel data dasar agar mudah dibaca oleh skrip otomatis.' },
      { meeting: 2, title: 'Menyusun Prompt Otomatisasi', content: 'Meminta AI menulis logika pemrosesan data tanpa koding manual.' },
      { meeting: 3, title: 'Membuat Formulir Input Interaktif', content: 'Membangun antarmuka entri data yang langsung tersimpan ke lembar kerja.' },
      { meeting: 4, title: 'Notifikasi & Pengiriman Email Otomatis', content: 'Mengatur pengiriman pesan konfirmasi otomatis saat data masuk.' },
      { meeting: 5, title: 'Dashboard Rekapitulasi & Laporan', content: 'Menghasilkan ringkasan grafik dan angka capaian kerja secara otomatis.' },
      { meeting: 6, title: 'Pengamanan Data & Hak Akses', content: 'Mengatur batasan izin agar data kantor tetap aman dan terkendali.' },
      { meeting: 7, title: 'Implementasi Kasus Nyata', content: 'Menyelesaikan satu aplikasi kerja lengkap yang langsung dipakai kerja.' },
    ],
    faqs: [
      { q: 'Apakah akun Google biasa bisa digunakan?', a: 'Ya, akun Google gratis maupun Google Workspace keduanya dapat digunakan.' },
      { q: 'Bisa diterapkan untuk sekolah atau bisnis?', a: 'Sangat cocok untuk pencatatan inventaris, absensi, maupun pembukuan harian.' },
    ],
  },
  {
    id: 'c3',
    slug: 'kelas-aplikasi-android-apk',
    name: 'Kelas Aplikasi Android (APK)',
    image: '',
    shortDesc: 'Wujudkan ide aplikasi menjadi berkas APK yang siap dipasang langsung di ponsel Android Anda.',
    fullDesc: 'Pelajari alur lengkap pembuatan aplikasi Android mulai dari rancangan antarmuka, alur penggunaan, hingga diekspor menjadi berkas APK siap pasang di perangkat sendiri atau dibagikan ke rekan kerja.',
    normalPrice: 399000,
    currentPrice: 279000,
    status: 'active',
    quota: 'Sisa 15 tempat',
    schedule: 'Setiap Senin & Rabu (19.30 - 21.00 WIB)',
    lynkidUrl: 'https://lynk.id',
    order: 3,
    clicksCount: 42,
    outcome: 'Berkas aplikasi APK fungsional yang dapat dipasang langsung pada ponsel pintar Android.',
    targetAudience: 'Calon pembuat produk digital, praktisi pendidikan, dan pemilik usaha rumahan.',
    curriculum: [
      { meeting: 1, title: 'Merancang Alur Pengguna Ponsel', content: 'Menentukan fungsi utama dan interaksi layar sentuh yang ringkas.' },
      { meeting: 2, title: 'Prompting Komponen Layar Android', content: 'Menghasilkan tata letak tombol, kartu, dan menu yang ramah jempol.' },
      { meeting: 3, title: 'Penyimpanan Data Lokal di Ponsel', content: 'Menyimpan preferensi dan catatan pengguna secara offline di ponsel.' },
      { meeting: 4, title: 'Pengelolaan Gambar & Aset Visual', content: 'Menata ikon aplikasi, gambar ilustrasi, dan identitas visual aplikasi.' },
      { meeting: 5, title: 'Pengujian di Ragam Layar HP', content: 'Memastikan tampilan tetap rapi di layar kecil maupun ponsel besar.' },
      { meeting: 6, title: 'Konfigurasi Izin & Pengemasan APK', content: 'Menyiapkan berkas instalasi resmi berformat APK siap edar.' },
      { meeting: 7, title: 'Pemasangan & Uji Coba Lapangan', content: 'Menginstal dan menjalankan aplikasi di berbagai ponsel peserta.' },
      { meeting: 8, title: 'Pembaruan & Perawatan Aplikasi', content: 'Memperbarui fitur aplikasi di masa mendatang secara mandiri.' },
    ],
    faqs: [
      { q: 'Apakah aplikasi bisa dibagikan lewat WhatsApp?', a: 'Bisa, berkas APK dapat dibagikan langsung lewat chat untuk dipasang pengguna.' },
      { q: 'Perlu mendaftar akun Google Developer berbayar?', a: 'Tidak perlu untuk pemasangan langsung via berkas APK.' },
    ],
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Rahmat Hidayat, S.Pd.',
    role: 'Guru SMP Negeri',
    quote: 'Dulu saya pikir membuat aplikasi jurnal mengajar butuh waktu berbulan-bulan belajar koding. Di Guber Smart, dalam dua minggu aplikasi saya sudah selesai dan dipakai satu sekolah.',
    isActive: true,
    order: 1,
  },
  {
    id: 't2',
    name: 'Dewi Anggraini',
    role: 'Pemilik Usaha Katering',
    quote: 'Saya hanya menceritakan alur pencatatan pesanan katering saya. Dengan bimbingan bertahap, sekarang pesanan dan rekap belanja otomatis tercatat rapi.',
    isActive: true,
    order: 2,
  },
  {
    id: 't3',
    name: 'Fauzan Pratama',
    role: 'Mahasiswa Manajemen',
    quote: 'Sangat praktis dan langsung pada intinya. Tanpa pusing teori pemrograman rumit, saya bisa menyelesaikan aplikasi portofolio pribadi.',
    isActive: true,
    order: 3,
  },
  {
    id: 't4',
    name: 'Siti Nurhaliza',
    role: 'Ibu Rumah Tangga & Pelaku UMKM',
    quote: 'Penjelasannya sangat sabar dan manusiawi. Untuk orang yang sama sekali buta teknologi seperti saya, panduannya sangat mudah diikuti.',
    isActive: true,
    order: 4,
  },
  {
    id: 't5',
    name: 'Budi Santoso',
    role: 'Kepala Tata Usaha',
    quote: 'Sistem surat masuk dan keluar di kantor kami sekarang rapi berkat aplikasi buatan sendiri dari kelas Google Apps Script.',
    isActive: true,
    order: 5,
  },
  {
    id: 't6',
    name: 'Ahmad Zaki',
    role: 'Pelajar SMK',
    quote: 'Belajar di sini membuka wawasan saya bahwa ide kitalah yang paling berharga. AI menjadi asisten yang mengubah ide jadi kenyataan.',
    isActive: true,
    order: 6,
  },
];

export const INITIAL_KARYA: KaryaItem[] = [
  { id: 'k1', title: 'Aplikasi Absensi Siswa Berbasis QR', image: '', url: 'https://lynk.id', category: 'Pendidikan', order: 1 },
  { id: 'k2', title: 'Toko Online Produk UMKM Rumahan', image: '', url: 'https://lynk.id', category: 'Bisnis', order: 2 },
  { id: 'k3', title: 'Kasir Sederhana & Cetak Struk Belanja', image: '', url: 'https://lynk.id', category: 'Bisnis', order: 3 },
  { id: 'k4', title: 'Jurnal Harian Guru & Nilai Siswa', image: '', url: 'https://lynk.id', category: 'Pendidikan', order: 4 },
  { id: 'k5', title: 'Undangan Digital Interaktif Responsive', image: '', url: 'https://lynk.id', category: 'Kreatif', order: 5 },
  { id: 'k6', title: 'Arsip Surat Masuk & Keluar Sekolah', image: '', url: 'https://lynk.id', category: 'Administrasi', order: 6 },
  { id: 'k7', title: 'Kalkulator HPP & Laba Bersih Usaha', image: '', url: 'https://lynk.id', category: 'Bisnis', order: 7 },
  { id: 'k8', title: 'Katalog Produk & Formulir Pemesanan', image: '', url: 'https://lynk.id', category: 'Bisnis', order: 8 },
];

export const INITIAL_TIPS: TipsItem[] = [
  {
    id: 'p1',
    slug: 'cara-menulis-prompt-alur-aplikasi',
    title: 'Cara Menulis Prompt Alur Aplikasi Agar Tepat Sasaran',
    summary: 'Kunci keberhasilan membuat aplikasi tanpa koding terletak pada kejelasan Anda menceritakan alur pengguna langkah demi langkah.',
    thumbnail: '',
    category: 'Tips Prompting',
    publishedAt: '27 Okt 2026',
    author: 'Admin Guber Smart',
    status: 'published',
    content: `<h2>Mengapa Kejelasan Alur Lebih Penting dari Istilah Teknis</h2>
<p>Banyak pemula mengira bahwa menyusun perintah untuk AI harus menggunakan istilah teknis seperti database relasional, API, atau paradigma pemrograman. Faktanya, AI bekerja jauh lebih akurat ketika Anda menggambarkannya layaknya alur manusia sehari-hari.</p>
<p>Mulailah dengan menentukan siapa yang membuka aplikasi, layar pertama apa yang mereka lihat, tombol apa yang mereka sentuh, dan informasi apa yang harus tersimpan setelah tombol itu ditekan.</p>
<h3>Contoh Susunan Deskripsi Alur</h3>
<p>Alih-alih menulis "Buatkan backend absensi", gunakan penjelasan bertahap: "Ketika guru memilih nama kelas, tampilkan daftar nama siswa dalam satu baris dengan dua tombol: Hadir dan Izin. Data yang dipilih disimpan ke rekap tanggal hari ini."</p>
<p>Dengan cara ini, aplikasi yang dihasilkan akan langsung selaras dengan kebutuhan nyata tanpa revisi berulang.</p>`,
  },
  {
    id: 'p2',
    slug: 'tiga-tahap-mengubah-masalah-jadi-fitur',
    title: 'Tiga Tahap Mengubah Masalah Kerja Menjadi Fitur Aplikasi',
    summary: 'Temukan cara membedah rutinitas yang melelahkan di tempat kerja menjadi modul aplikasi yang bekerja otomatis.',
    thumbnail: '',
    category: 'Manajemen Ide',
    publishedAt: '25 Okt 2026',
    author: 'Admin Guber Smart',
    status: 'published',
    content: `<h2>Mengidentifikasi Titik Temu Rutinitas Harian</h2>
<p>Setiap aplikasi hebat lahir dari satu kejengkelan sederhana: pekerjaan berulang yang menyita waktu. Sebelum mulai merancang, catat aktivitas apa saja yang paling sering Anda ulang setiap minggu.</p>
<p>Tahap pertama adalah memisahkan antara input (data yang dimasukkan manusia) dan kalkulasi (perhitungan atau pemindahan data yang bisa dikerjakan mesin).</p>
<h3>Membangun dari yang Paling Sederhana</h3>
<p>Jangan terburu-buru merancang aplikasi raksasa. Bangun versi satu halaman terlebih dahulu. Setelah fungsi intinya berjalan dengan baik, baru tambahkan fitur pendukung seperti cetak laporan atau notifikasi.</p>`,
  },
  {
    id: 'p3',
    slug: 'studi-kasus-aplikasi-inventaris-toko',
    title: 'Studi Kasus: Membangun Aplikasi Inventaris Toko dalam 3 Hari',
    summary: 'Kisah nyata salah satu peserta Guber Smart yang merapikan stok ribuan barang dagangan tanpa menyewa jasa pengembang.',
    thumbnail: '',
    category: 'Studi Kasus',
    publishedAt: '20 Okt 2026',
    author: 'Admin Guber Smart',
    status: 'published',
    content: `<h2>Tantangan Pengelolaan Stok Barang Manual</h2>
<p>Pak Hendra memiliki toko bahan kue dengan lebih dari 800 varian produk. Setiap akhir bulan, pengecekan stok fisik membutuhkan waktu hingga dua hari penuh karena pencatatan masih di buku tulis.</p>
<p>Melalui kelas Guber Smart, beliau merancang aplikasi input berkas stok menggunakan Google Apps Script yang terhubung langsung ke ponsel kasirnya.</p>
<h3>Hasil yang Dirasakan</h3>
<p>Kini setiap barang masuk cukup dicatat melalui ponsel dalam hitungan detik. Stok berkurang otomatis setiap kali ada transaksi, dan sistem langsung memberi tanda jika persediaan menipis.</p>`,
  },
  {
    id: 'p4',
    slug: 'memilih-perangkat-untuk-belajar-aplikasi',
    title: 'Perangkat Apa Saja yang Dibutuhkan untuk Mulai Belajar?',
    summary: 'Kabar baiknya: Anda tidak butuh komputer canggih. Simak spesifikasi minimal yang membuat proses belajar lancar.',
    thumbnail: '',
    category: 'Alur Belajar',
    publishedAt: '18 Okt 2026',
    author: 'Admin Guber Smart',
    status: 'published',
    content: `<h2>Cukup Peramban Web Modern</h2>
<p>Karena seluruh proses pembuatan aplikasi di Guber Smart memanfaatkan antarmuka cloud dan kecerdasan buatan, beban komputasi tidak ditanggung oleh perangkat lokal Anda.</p>
<p>Laptop biasa atau komputer kantor yang dapat menjalankan Google Chrome dengan lancar sudah lebih dari cukup untuk mengikuti seluruh materi pertemuan.</p>
<h3>Fokus pada Pola Pikir</h3>
<p>Investasi terbesar Anda bukanlah pada perangkat keras baru, melainkan pada kemauan untuk melatih kemampuan merinci ide secara terstruktur.</p>`,
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Apakah saya benar-benar tidak butuh kemampuan koding?',
    answer: 'Benar. Materi kelas dirancang khusus agar Anda bisa menyusun instruksi logis dalam bahasa sehari-hari. AI bertindak sebagai teknisi yang membangun strukturnya, sementara Anda memegang kendali atas ide dan fungsinya.',
    order: 1,
  },
  {
    id: 'f2',
    question: 'Perangkat apa yang perlu saya siapkan untuk belajar?',
    answer: 'Anda cukup menyiapkan komputer atau laptop dengan koneksi internet stabil dan peramban web modern seperti Google Chrome.',
    order: 2,
  },
  {
    id: 'f3',
    question: 'Bagaimana sistem belajarnya?',
    answer: 'Pembelajaran berlangsung secara daring bertahap dengan panduan langsung, studi kasus nyata, dan sesi tanya jawab hingga proyek aplikasi Anda selesai.',
    order: 3,
  },
  {
    id: 'f4',
    question: 'Bagaimana cara mendaftar dan membayar kelas?',
    answer: 'Pilih kelas yang Anda inginkan di website ini, klik tombol "Daftar", dan Anda akan diarahkan ke halaman resmi lynk.id untuk menyelesaikan pendaftaran serta pembayaran dengan metode pilihan Anda.',
    order: 4,
  },
  {
    id: 'f5',
    question: 'Apakah ada bimbingan jika saya mengalami kesulitan?',
    answer: 'Ya. Setiap peserta tergabung dalam grup komunitas belajar eksklusif untuk berkonsultasi, berdiskusi, dan mendapatkan pendampingan berkala.',
    order: 5,
  },
  {
    id: 'f6',
    question: 'Berapa lama saya memiliki akses ke materi kelas?',
    answer: 'Akses materi dan pembaruan panduan diberikan seumur hidup sehingga Anda dapat mengulang pembelajaran kapan pun dibutuhkan.',
    order: 6,
  },
];

export const INITIAL_CMS_SETTINGS: CMSSettings = {
  identity: {
    appName: 'Guber Smart',
    tagline: 'Ide • Aplikasi • Karya',
    logo: '',
    favicon: '',
    pageTitle: 'Guber Smart - Belajar Membuat Aplikasi Hanya Bermodalkan Ide',
    pageDescription: 'Kelas belajar membuat aplikasi hanya bermodalkan ide, tanpa perlu paham koding. Dipandu bertahap sampai jadi.',
    previewImage: '',
  },
  theme: {
    primaryColor: '#07142b',
    secondaryColor: '#0b1c38',
    accentColor: '#c9a35a',
    bgColor: '#f8f5ef',
    textColor: '#1b2433',
    fontHeading: 'Lora',
    fontBody: 'Inter',
    borderRadius: '18px',
  },
  navigation: [
    { id: 'nav-home', label: 'Beranda', target: '#hero', isVisible: true, order: 1 },
    { id: 'nav-profil', label: 'Profil', target: '#profil', isVisible: true, order: 2 },
    { id: 'nav-kelas', label: 'Kelas', target: '#kelas', isVisible: true, order: 3 },
    { id: 'nav-keunggulan', label: 'Keunggulan', target: '#keunggulan', isVisible: true, order: 4 },
    { id: 'nav-karya', label: 'Karya', target: '#karya', isVisible: true, order: 5 },
    { id: 'nav-tips', label: 'Tips', target: '#tips', isVisible: true, order: 6 },
    { id: 'nav-kontak', label: 'Kontak', target: '#kontak', isVisible: true, order: 7 },
  ],
  buttons: {
    heroPrimaryText: 'Daftar Sekarang',
    heroPrimaryUrl: 'https://lynk.id',
    heroSecondaryText: 'Lihat Kelas',
    heroSecondaryUrl: '#kelas',
    ctaPrimaryText: 'Daftar Sekarang',
    ctaPrimaryUrl: 'https://lynk.id',
    ctaSecondaryText: 'Tanya Dulu',
    waPhone: '6285376604024',
    waDefaultMsg: "Assalamu'alaikum, saya ingin bertanya tentang kelas Guber Smart.",
  },
  sections: [
    { id: 'hero', label: 'Beranda', title: 'Belajar Membuat Aplikasi Hanya Bermodalkan Ide', subtitle: 'Tanpa perlu paham koding. Ceritakan idenya, kami pandu sampai aplikasinya jadi dan bisa dipakai.', isVisible: true, order: 1, image: '' },
    { id: 'pita', label: 'Pita Keunggulan', title: 'Pita Keunggulan', subtitle: '', isVisible: true, order: 2 },
    { id: 'profil', label: 'Tentang Kami', title: 'Mengubah Ide Menjadi Aplikasi, Tanpa Pusing Koding', subtitle: 'Guber Smart hadir untuk menjembatani siapa pun yang memiliki gagasan inovatif dengan kemampuan menciptakan teknologi nyata.', isVisible: true, order: 3, image: '' },
    { id: 'visi-misi', label: 'Visi dan Misi', title: 'Visi dan Misi', subtitle: '', isVisible: true, order: 4 },
    { id: 'kelas', label: 'Program Kelas', title: 'Pilih Kelas Anda', subtitle: 'Pilihan program belajar terstruktur yang dirancang untuk mengantar ide Anda menjadi aplikasi siap pakai.', isVisible: true, order: 5 },
    { id: 'alur', label: 'Cara Belajar', title: 'Empat Langkah Menjadi Aplikasi', subtitle: 'Metode sederhana yang terbukti mempermudah siapa saja membangun karya digital.', isVisible: true, order: 6 },
    { id: 'keunggulan', label: 'Keunggulan', title: 'Belajar Lebih Mudah dengan Dukungan Lengkap', subtitle: 'Seluruh sarana dan pendampingan disiapkan agar Anda fokus melahirkan karya tanpa hambatan teknis.', isVisible: true, order: 7, image: '' },
    { id: 'karya', label: 'Karya Peserta', title: 'Aplikasi yang Lahir dari Ide Peserta', subtitle: 'Bukti nyata bahwa ide sederhana bisa diwujudkan menjadi solusi digital bermanfaat.', isVisible: true, order: 8 },
    { id: 'testimoni', label: 'Testimoni', title: 'Kata Mereka yang Sudah Belajar', subtitle: 'Pengalaman langsung dari peserta beragam latar belakang yang telah merasakan kemudahan belajar.', isVisible: true, order: 9 },
    { id: 'tips', label: 'Tips dan Informasi', title: 'Update Terbaru', subtitle: 'Wawasan, panduan penulisan prompt, dan inspirasi berkarya digital untuk Anda.', isVisible: true, order: 10, image: '' },
    { id: 'faq', label: 'Pertanyaan', title: 'Yang Sering Ditanyakan', subtitle: 'Jawaban atas hal-hal yang sering ditanyakan seputar proses belajar dan pendaftaran kelas.', isVisible: true, order: 11 },
    { id: 'ajakan', label: 'Pendaftaran Dibuka', title: 'Bergabunglah Bersama Guber Smart', subtitle: 'Wujudkan ide aplikasi pertama Anda sekarang juga bersama panduan langkah demi langkah.', isVisible: true, order: 12, image: '' },
    { id: 'kontak', label: 'Kontak', title: 'Hubungi Kami', subtitle: 'Ada pertanyaan sebelum mendaftar? Tim kami siap berdiskusi bersama Anda.', isVisible: true, order: 13 },
  ],
  pages: [],
  features: {
    testimonials: true,
    faq: true,
    karya: true,
    tips: true,
    waFloating: true,
    tanyaDulu: true,
    searchTips: true,
  },
  media: {
    introVideoUrl: '',
    gallery: [],
  },
  footer: {
    waNumber: '0853-7660-4024',
    waMessage: "Assalamu'alaikum, saya ingin bertanya tentang kelas Guber Smart.",
    serviceHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    socialMedia: {
      instagram: '',
      tiktok: '',
      youtube: '',
    },
    motto: 'Ide • Aplikasi • Karya',
    copyright: '© 2026 Guber Smart. All rights reserved.',
  },
};

export const INITIAL_SYNC_SETTINGS: SyncSettings = {
  webAppUrl: 'https://script.google.com/macros/s/AKfycbwCn5vb6dQjgQLyE7BGOUqjRmglST3lqPaygNBAj2rWUADg0DHwl55owCFjKjz3r64QeQ/exec',
  token: 'GUBER_SECRET_TOKEN_2026',
  driveFolderId: '',
  spreadsheetId: '',
  isConnected: true,
};

export const INITIAL_ADMINS: AdminAccount[] = [
  { id: 'a1', username: 'admin', role: 'admin', isActive: true, createdAt: '2026-10-01' },
  { id: 'a2', username: 'superadmin', role: 'superadmin', isActive: true, createdAt: '2026-10-01' },
];
