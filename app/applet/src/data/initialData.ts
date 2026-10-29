/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.
 */

import { ClassItem, TestimonialItem, PortfolioItem, TipItem, FaqItem, CmsSettings, AdminUser, ActivityLogItem, ClickStatItem } from '../types';

export const initialClasses: ClassItem[] = [
  {
    id: 'cls-1',
    slug: 'kelas-website-dengan-google-ai-studio',
    title: 'Kelas Website dengan Google AI Studio',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
    shortDesc: 'Belajar membuat web profesional dengan bantuan AI tanpa menulis baris kode manual.',
    fullDesc: 'Kelas interaktif yang dirancang khusus untuk pemula, pendidik, dan pengusaha agar dapat merancang dan meluncurkan website impian dalam hitungan jam menggunakan Google AI Studio.',
    normalPrice: 'Rp299.000',
    currentPrice: 'Rp199.000',
    status: 'aktif',
    quota: 'Sisa 14 Kursi',
    schedule: 'Setiap Hari Sabtu, 19.00 WIB',
    lynkUrl: 'https://lynk.id/gubersmart',
    modules: [
      { title: 'Pertemuan 1: Pengenalan Konsep & Ide Web', content: 'Memahami cara menyusun kalimat perintah (prompt) yang tepat untuk menghasilkan struktur web yang elegan.' },
      { title: 'Pertemuan 2: Merancang Tampilan Beranda', content: 'Membuat halaman depan yang memikat, responsif di HP, dan profesional.' },
      { title: 'Pertemuan 3: Integrasi Fitur & Navigasi', content: 'Menghubungkan antar halaman dan memastikan menu berfungsi sempurna di semua perangkat.' },
      { title: 'Pertemuan 4: Publikasi ke Internet', content: 'Menerbitkan website Anda agar bisa diakses oleh siapa saja secara online.' },
      { title: 'Pertemuan 5: Pengelolaan Konten Mandiri', content: 'Cara mengubah teks, gambar, dan informasi tanpa menyentuh kode program.' },
      { title: 'Pertemuan 6: Studi Kasus & Peluncuran Karya', content: 'Praktik langsung membuat web portofolio atau bisnis dan tanya jawab tuntas.' }
    ],
    outcomes: [
      'Website online siap pakai berdomain sendiri',
      'Kemampuan menyusun prompt aplikasi tingkat lanjut',
      'Akses selamanya ke materi dan komunitas belajar'
    ],
    targetAudience: [
      'Guru dan tenaga pendidik yang ingin membuat media pembelajaran digital',
      'Pelaku UMKM yang ingin memiliki toko online atau profil usaha',
      'Mahasiswa dan pelajar yang ingin punya karya digital tanpa batas'
    ],
    classFaq: [
      { q: 'Apakah wajib punya latar belakang koding?', a: 'Sama sekali tidak. Kelas ini 100% untuk pemula.' },
      { q: 'Perangkat apa saja yang dibutuhkan?', a: 'Cukup laptop atau komputer dengan koneksi internet standar.' }
    ],
    order: 1
  },
  {
    id: 'cls-2',
    slug: 'kelas-aplikasi-google-apps-script',
    title: 'Kelas Aplikasi Google Apps Script',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
    shortDesc: 'Otomatisasi tugas perkantoran, absensi, dan basis data menggunakan Google Sheets & Apps Script.',
    fullDesc: 'Kuasai cara membangun aplikasi pencatatan, surat-menyurat otomatis, dan database cerdas yang terhubung langsung dengan Google Workspace.',
    normalPrice: 'Rp349.000',
    currentPrice: 'Rp229.000',
    status: 'aktif',
    quota: 'Sisa 8 Kursi',
    schedule: 'Setiap Hari Minggu, 15.00 WIB',
    lynkUrl: 'https://lynk.id/gubersmart',
    modules: [
      { title: 'Pertemuan 1: Dasar Google Sheets & Logika Otomatis', content: 'Menyusun kerangka data yang rapi dan siap dihubungkan ke sistem.' },
      { title: 'Pertemuan 2: Pengenalan Google Apps Script', content: 'Mengenal kode sederhana untuk mempercepat pekerjaan harian.' },
      { title: 'Pertemuan 3: Membuat Formulir & Database Isian', content: 'Mengumpulkan data dari pengguna secara otomatis masuk ke tabel.' },
      { title: 'Pertemuan 4: Otomatisasi Kirim Pesan & Dokumen', content: 'Membuat rekap dan pengiriman laporan otomatis.' },
      { title: 'Pertemuan 5: Antarmuka Web App Sederhana', content: 'Menampilkan data sheet dalam bentuk aplikasi web interaktif.' },
      { title: 'Pertemuan 6: Studi Kasus Aplikasi Absensi & Kasir', content: 'Membangun aplikasi siap pakai untuk instansi atau usaha.' }
    ],
    outcomes: [
      'Sistem otomatisasi kerja hemat waktu hingga 80%',
      'Aplikasi web berbasis Google Sheets yang andal',
      'Skrip siap pakai yang bisa disesuaikan kebutuhan'
    ],
    targetAudience: [
      'Staf administrasi dan pengelola data instansi',
      'Guru dan operator sekolah pengelola data siswa',
      'Wirausaha yang membutuhkan pencatatan praktis'
    ],
    classFaq: [
      { q: 'Apakah perokok data Google aman?', a: 'Sangat aman karena langsung tersimpan di akun Google pribadi Anda.' }
    ],
    order: 2
  },
  {
    id: 'cls-3',
    slug: 'kelas-aplikasi-android-apk',
    title: 'Kelas Aplikasi Android (APK)',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80' },
    shortDesc: 'Ubah ide cemerlang Anda menjadi aplikasi Android (.APK) yang bisa diinstal di HP.',
    fullDesc: 'Pelajari cara merancang aplikasi mobile mandiri tanpa perlu repot belajar bahasa pemrograman Java atau Kotlin yang rumit.',
    normalPrice: 'Rp399.000',
    currentPrice: 'Rp249.000',
    status: 'aktif',
    quota: 'Sisa 19 Kursi',
    schedule: 'Fleksibel (Video & Bimbingan Grup)',
    lynkUrl: 'https://lynk.id/gubersmart',
    modules: [
      { title: 'Pertemuan 1: Konsep Aplikasi Mobile', content: 'Merancang alur navigasi dan tampilan antarmuka khusus layar sentuh.' },
      { title: 'Pertemuan 2: Perancangan Fitur Utama', content: 'Menentukan menu, tombol, dan interaksi pengguna.' },
      { title: 'Pertemuan 3: Pembuatan Layout dengan AI', content: 'Menghasilkan kode tampilan aplikasi berkualitas tinggi.' },
      { title: 'Pertemuan 4: Penyusunan Logika & Penyimpanan', content: 'Menghubungkan data aplikasi agar dapat diingat perangkat.' },
      { title: 'Pertemuan 5: Pengujian di Perangkat Nyata', content: 'Mencoba aplikasi langsung di smartphone Android Anda.' },
      { title: 'Pertemuan 6: Ekspor Berkas .APK & Publikasi', content: 'Mengunduh file instalasi dan membagikannya ke rekan atau klien.' }
    ],
    outcomes: [
      'Berkas aplikasi .APK siap instal di smartphone',
      'Portofolio aplikasi mobile karya sendiri',
      'Kemampuan merilis aplikasi mandiri'
    ],
    targetAudience: [
      'Siapa saja yang ingin memiliki aplikasi mobile sendiri',
      'Pemilik bisnis yang ingin memudahkan pelanggan lewat aplikasi',
      'Pendidik yang ingin membuat media belajar interaktif berbasis HP'
    ],
    classFaq: [
      { q: 'Apakah bisa diunggah ke Play Store?', a: 'Ya, Anda akan dibekali panduan dasar untuk mengunggahnya.' }
    ],
    order: 3
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Ibu Siti Aminah',
    role: 'Guru SDN 03 Sukmajaya',
    avatar: { source: 'tautan', value: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    quote: 'Awalnya saya gagap teknologi dan tidak paham koding sama sekali. Berkat Guber Smart, sekarang saya bisa membuat aplikasi kuis interaktif untuk murid-murid saya sendiri.',
    status: 'tampil',
    order: 1
  },
  {
    id: 'test-2',
    name: 'Bapak Budi Santoso',
    role: 'Pemilik Kuliner Nusantara',
    avatar: { source: 'tautan', value: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    quote: 'Pembuatan katalog produk dan pencatatan pesanan warung saya jadi jauh lebih rapi menggunakan aplikasi web yang dipandu di kelas ini. Sangat direkomendasikan!',
    status: 'tampil',
    order: 2
  },
  {
    id: 'test-3',
    name: 'Rina Lestari',
    role: 'Mahasiswa Manajemen',
    avatar: { source: 'tautan', value: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    quote: 'Tugas akhir pembuatan website portofolio selesai lebih cepat dari perkiraan. Penjelasannya sangat runut dan mudah dipahami orang awam sekalipun.',
    status: 'tampil',
    order: 3
  },
  {
    id: 'test-4',
    name: 'Ahmad Fauzi',
    role: 'Penggiat UMKM',
    avatar: { source: 'tautan', value: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    quote: 'Ide aplikasi kasir sederhana yang ada di kepala saya akhirnya terwujud nyata. Terima kasih Guber Smart!',
    status: 'tampil',
    order: 4
  },
  {
    id: 'test-5',
    name: 'Dewi Kartika',
    role: 'Ibu Rumah Tangga & Penjahit',
    avatar: { source: 'tautan', value: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    quote: 'Pencatatan ukuran jahitan pelanggan kini tersimpan rapi dalam satu aplikasi web di HP saya. Tidak perlu buku catatan lagi.',
    status: 'tampil',
    order: 5
  },
  {
    id: 'test-6',
    name: 'Hendra Wijaya',
    role: 'Karyawan Swasta',
    avatar: { source: 'tautan', value: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
    quote: 'Belajar membuat aplikasi terasa seperti bermain game menyusun ide. Sangat menyenangkan dan langsung bisa dipraktikkan.',
    status: 'tampil',
    order: 6
  }
];

export const initialPortfolio: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Aplikasi Absensi Guru & Siswa',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Pendidikan',
    order: 1
  },
  {
    id: 'port-2',
    title: 'Katalog Digital UMKM Kuliner',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1556742049-0a67d554c2e5?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Bisnis',
    order: 2
  },
  {
    id: 'port-3',
    title: 'Pencatat Keuangan Warung Harian',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Keuangan',
    order: 3
  },
  {
    id: 'port-4',
    title: 'Undangan Digital Pernikahan Elegan',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Keluarga',
    order: 4
  },
  {
    id: 'port-5',
    title: 'Jurnal Mengajar Guru Kreatif',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Pendidikan',
    order: 5
  },
  {
    id: 'port-6',
    title: 'Aplikasi Reservasi Salon & Spa',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Bisnis',
    order: 6
  },
  {
    id: 'port-7',
    title: 'Portal Berita Komunitas Desa',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Komunitas',
    order: 7
  },
  {
    id: 'port-8',
    title: 'Aplikasi Inventaris Barang Kantor',
    image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
    url: 'https://lynk.id/gubersmart',
    category: 'Bisnis',
    order: 8
  }
];

export const initialTips: TipItem[] = [
  {
    id: 'tip-1',
    slug: 'cara-menyusun-ide-aplikasi-yang-efektif',
    title: 'Cara Menyusun Ide Aplikasi yang Efektif untuk Pemula',
    summary: 'Langkah demi langkah merumuskan masalah di sekitar Anda menjadi solusi aplikasi digital yang solutif.',
    thumbnail: { source: 'tautan', value: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80' },
    category: 'Panduan',
    date: '27 Okt 2026',
    author: 'Tim Guber Smart',
    status: 'terbit',
    content: '<p>Membuat aplikasi tidak harus dimulai dari algoritma yang rumit. Mulailah dengan mengidentifikasi masalah sehari-hari yang sering Anda hadapi. Apakah itu pencatatan resep masakan, absensi kegiatan, atau pengingat jadwal.</p><p>Setelah masalah ditemukan, uraikan langkah penyelesaiannya secara berurutan. Di Guber Smart, uraian ini akan menjadi dasar perintah (prompt) yang diterjemahkan menjadi aplikasi siap pakai.</p>'
  },
  {
    id: 'tip-2',
    slug: 'mengenal-kekuatan-ai-dalam-pembuatan-web',
    title: 'Mengenal Kekuatan AI dalam Pembuatan Web Tanpa Koding',
    summary: 'Bagaimana teknologi kecerdasan buatan membantu mewujudkan desain visual dan fungsi web seketika.',
    thumbnail: { source: 'tautan', value: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
    category: 'Teknologi',
    date: '25 Okt 2026',
    author: 'Admin Guber',
    status: 'terbit',
    content: '<p>Kecerdasan buatan kini menjadi jembatan antara imajinasi dan kenyataan. Anda tidak lagi perlu menghafal sintaksis bahasa pemrograman yang panjang. Cukup jelaskan apa yang Anda inginkan dengan bahasa sehari-hari.</p><p>Sistem akan merancang struktur, warna, dan tombol interaktif yang sesuai dengan kebutuhan Anda secara otomatis.</p>'
  },
  {
    id: 'tip-3',
    slug: 'tips-mengelola-data-usaha-dengan-google-sheets',
    title: 'Tips Mengelola Data Usaha dengan Google Sheets',
    summary: 'Cara praktis merapikan pencatatan keuangan dan stok barang agar bisnis semakin profesional.',
    thumbnail: { source: 'tautan', value: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    category: 'Bisnis',
    date: '22 Okt 2026',
    author: 'Tim Guber Smart',
    status: 'terbit',
    content: '<p>Pencatatan yang rapi adalah kunci kesuksesan usaha kecil maupun menengah. Dengan memanfaatkan tabel online yang terhubung ke cloud, Anda bisa memantau transaksi kapan saja dan dari mana saja tanpa takut kehilangan data.</p>'
  },
  {
    id: 'tip-4',
    slug: 'strategi-berbagi-aplikasi-ke-rekan-kerja',
    title: 'Strategi Berbagi Aplikasi ke Rekan Kerja dan Klien',
    summary: 'Panduan ringkas cara membagikan tautan dan file instalasi aplikasi hasil karya Anda.',
    thumbnail: { source: 'tautan', value: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
    category: 'Tips',
    date: '19 Okt 2026',
    author: 'Admin Guber',
    status: 'terbit',
    content: '<p>Setelah aplikasi selesai dibuat, saatnya membagikannya kepada rekan kerja, keluarga, atau calon pelanggan. Gunakan tautan akses cepat atau unduh file instalasi untuk langsung dicoba di perangkat mereka.</p>'
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah saya harus punya keahlian koding untuk ikut kelas ini?',
    answer: 'Tidak perlu sama sekali. Kelas Guber Smart dirancang khusus untuk orang awam dari berbagai latar belakang.',
    order: 1
  },
  {
    id: 'faq-2',
    question: 'Perangkat apa saja yang saya perlukan selama belajar?',
    answer: 'Anda hanya memerlukan laptop atau komputer serta koneksi internet yang stabil untuk mengakses ruang belajar.',
    order: 2
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara mendaftar ke kelas Guber Smart?',
    answer: 'Pilih kelas yang Anda inginkan, lalu klik tombol Daftar untuk langsung terhubung ke halaman pendaftaran di lynk.id.',
    order: 3
  },
  {
    id: 'faq-4',
    question: 'Berapa lama akses materi kelas ini diberikan?',
    answer: 'Akses materi diberikan selamanya sehingga Anda bisa belajar dan mengulang kapan pun dibutuhkan.',
    order: 4
  },
  {
    id: 'faq-5',
    question: 'Apakah ada bimbingan langsung jika saya mengalami kendala?',
    answer: 'Ya, Anda akan bergabung dalam komunitas member dan grup bimbingan untuk saling bertanya dan dibantu sampai bisa.',
    order: 5
  },
  {
    id: 'faq-6',
    question: 'Apakah hasil aplikasi benar-benar bisa dipakai?',
    answer: 'Tentu saja. Hasil akhir dari setiap kelas adalah aplikasi atau website sungguhan yang langsung dapat digunakan.',
    order: 6
  }
];

export const initialCmsSettings: CmsSettings = {
  identity: {
    appName: 'Guber Smart',
    slogan: 'Ide • Aplikasi • Karya',
    logo: { source: 'tautan', value: '' },
    favicon: { source: 'tautan', value: '' },
    seoTitle: 'Guber Smart - Belajar Membuat Aplikasi Hanya Bermodalkan Ide',
    seoDesc: 'Tanpa perlu paham koding. Ceritakan idenya, kami pandu sampai aplikasinya jadi dan bisa dipakai.',
    ogImage: { source: 'tautan', value: '' }
  },
  theme: {
    primary: '#07142b',
    secondary: '#0b1c38',
    accent: '#c9a35a',
    bg: '#f8f5ef',
    text: '#1b2433',
    buttonColor: '#c9a35a',
    font: 'Inter',
    radius: '18px'
  },
  navigation: [
    { label: 'Beranda', url: '#beranda', show: true },
    { label: 'Profil', url: '#profil', show: true },
    { label: 'Kelas', url: '#kelas', show: true },
    { label: 'Keunggulan', url: '#keunggulan', show: true },
    { label: 'Karya', url: '#karya', show: true },
    { label: 'Tips', url: '#tips', show: true },
    { label: 'Kontak', url: '#kontak', show: true },
    { label: 'Masuk', url: '#masuk', show: true }
  ],
  buttons: [
    { label: 'Daftar Sekarang', url: 'https://lynk.id/gubersmart', color: 'gold', show: true },
    { label: 'Lihat Kelas', url: '#kelas', color: 'outline', show: true }
  ],
  sections: [
    { id: 'hero', title: 'Belajar Membuat Aplikasi Hanya Bermodalkan Ide', label: 'Selamat Datang di Guber Smart', content: 'Tanpa perlu paham koding. Ceritakan idenya, kami pandu sampai aplikasinya jadi dan bisa dipakai.', image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80' }, show: true, order: 1 },
    { id: 'profil', title: 'Mengubah Ide Menjadi Aplikasi, Tanpa Pusing Koding', label: 'Tentang Kami', content: 'Setiap orang punya ide hebat. Tugas kami memastikan ide itu menjadi aplikasi nyata.', image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' }, show: true, order: 2 },
    { id: 'keunggulan-sec', title: 'Belajar Lebih Mudah dengan Dukungan Lengkap', label: 'Keunggulan', content: 'Nikmati fasilitas belajar terpadu yang membimbing Anda dari nol sampai mahir.', image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' }, show: true, order: 3 },
    { id: 'ajakan', title: 'Bergabunglah Bersama Guber Smart', label: 'Pendaftaran Dibuka', content: 'Mulai perjalanan digital Anda hari ini dan wujudkan aplikasi impian tanpa hambatan.', image: { source: 'tautan', value: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80' }, show: true, order: 4 }
  ],
  pages: [
    { id: 'p-1', title: 'Tentang Guber Smart', slug: 'tentang-kami', content: '<p>Guber Smart adalah wadah pembelajaran digital terdepan yang membantu masyarakat umum mewujudkan ide kreatif menjadi aplikasi siap pakai.</p>' }
  ],
  features: {
    testimonials: true,
    faq: true,
    portfolio: true,
    tips: true,
    floatingWa: true,
    askWa: true,
    searchTips: true
  },
  media: {
    introVideoUrl: '',
    gallery: []
  },
  contact: {
    whatsapp: '0853-7660-4024',
    waMessage: 'Assalamu alaikum, saya ingin bertanya tentang kelas Guber Smart.',
    serviceHours: 'Senin - Sabtu (08.00 - 17.00 WIB)',
    social: {
      instagram: 'https://instagram.com/gubersmart',
      tiktok: '',
      youtube: '',
      facebook: ''
    },
    slogan: 'Ide • Aplikasi • Karya',
    copyright: '© 2026 Guber Smart. All rights reserved.'
  },
  sync: {
    scriptUrl: '',
    token: '',
    folderId: '',
    spreadsheetId: '',
    lastSync: 'Belum pernah disinkronkan',
    connected: false
  },
  firebase: {
    connected: false,
    status: 'Belum aktif'
  }
};

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'adm-1',
    username: 'superadmin',
    passwordHash: 'superadmin123', // In real app, hashed
    role: 'superadmin',
    name: 'Super Administrator',
    active: true
  },
  {
    id: 'adm-2',
    username: 'admin',
    passwordHash: 'admin123',
    role: 'admin',
    name: 'Pengelola Kelas',
    active: true
  }
];

export const initialActivityLogs: ActivityLogItem[] = [
  { id: 'log-1', role: 'superadmin', action: 'Masuk ke sistem panel superadmin', timestamp: '27 Okt 2026, 10:30 WIB' },
  { id: 'log-2', role: 'admin', action: 'Memperbarui informasi kelas', timestamp: '27 Okt 2026, 09:15 WIB' }
];

export const initialClickStats: ClickStatItem[] = [
  { classId: 'cls-1', count: 42, date: '2026-10-27' },
  { classId: 'cls-2', count: 35, date: '2026-10-27' },
  { classId: 'cls-3', count: 28, date: '2026-10-27' }
];

// LocalStorage Persistence helpers
export const loadStorageData = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`guber_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const saveStorageData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(`guber_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};
