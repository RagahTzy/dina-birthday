# 🎀 Birthday Website - Hadiah Romantis

Website hadiah ulang tahun interaktif yang romantis, dibuat dengan Next.js 14, Tailwind CSS, TypeScript, dan Framer Motion.

## ✨ Fitur

- 🔐 **Login Page** — Input nama panggilan dengan validasi lucu
- 💗 **Question Page** — Tombol "GK" yang kabur setiap diklik
- 🎉 **Final Page** — Foto kolase, kartu romantis, konfeti, musik, dan peluk virtual
- 🎵 **Music Player** — Background musik opsional
- 📱 **Mobile First** — Responsive di semua device
- ✨ **Animasi Smooth** — Framer Motion everywhere

## 🚀 Cara Install & Jalankan

```bash
# 1. Clone atau download project ini
cd birthday-website

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka browser ke http://localhost:3000
```

## 📸 Cara Tambah Foto

1. Buka folder `public/photos/`
2. Masukkan foto-foto kamu dengan nama:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - ... sampai `photo9.jpg`
3. Foto akan otomatis muncul sebagai background di halaman final

## 🎵 Cara Tambah Musik

1. Download lagu romantis (MP3) dari:
   - [Pixabay Music](https://pixabay.com/music/) (free)
   - [Free Music Archive](https://freemusicarchive.org/)
2. Rename file menjadi `music.mp3`
3. Taruh di folder `public/`
4. Musik akan otomatis bisa diplay dari tombol di pojok kanan bawah

## ✏️ Cara Kustomisasi

### Ganti nama / teks
- Buka `app/final/page.tsx`
- Edit array `CARDS` untuk mengubah pesan-pesan romantis
- Edit `BIRTHDAY_MESSAGE` untuk pesan penutup
- Ganti "Sayang" dengan nama spesifik jika mau

### Ganti warna
- Edit `app/globals.css` — ubah variabel `--rose-gradient` dll
- Atau edit class Tailwind langsung di komponen

### Tambah / kurangi kartu
- Di `app/final/page.tsx`, tambah/kurangi objek di array `CARDS`

## 🚀 Deploy ke Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

Atau langsung drag-drop folder ke [vercel.com/new](https://vercel.com/new)

## 📁 Struktur Project

```
birthday-website/
├── app/
│   ├── globals.css          # Global styles + custom CSS
│   ├── layout.tsx           # Root layout + fonts
│   ├── page.tsx             # Root → redirect ke /login
│   ├── login/
│   │   └── page.tsx         # Halaman login
│   ├── question/
│   │   └── page.tsx         # Halaman pertanyaan interaktif
│   └── final/
│       └── page.tsx         # Halaman hadiah utama
├── components/
│   ├── FloatingHearts.tsx   # Animasi hati terbang
│   ├── HeartCard.tsx        # Kartu pesan romantis
│   ├── HugModal.tsx         # Modal pelukan virtual
│   ├── MusicPlayer.tsx      # Player musik background
│   ├── PageTransition.tsx   # Transisi antar halaman
│   ├── PhotoBackground.tsx  # Background foto kolase
│   ├── Sparkles.tsx         # Dekorasi bintang berkilau
│   └── Confetti.tsx         # Konfeti saat masuk final page
├── utils/
│   └── store.ts             # Simpan nama di sessionStorage
├── public/
│   ├── photos/              # Taruh foto-foto kamu di sini
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── ...
│   └── music.mp3            # Taruh musik di sini
└── ...config files
```

## 🛠️ Tech Stack

- **Next.js 14** — App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **React Icons** — Icon library
- **React Confetti** — Confetti effect

---

Made with ❤️ — Semoga dia suka! 🎀
