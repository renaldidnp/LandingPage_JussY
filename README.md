# Jussy — Company Profile

Landing page company profile untuk **Jussy**, brand jus cold-pressed, bergaya **editorial motion scrolling**. Dibangun dengan React + TypeScript + Tailwind CSS v4, smooth scroll Lenis, dan animasi Framer Motion.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview hasil build
npm run lint
```

## Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Smooth scroll | Lenis 1.3 |
| Animasi | Framer Motion 14 (`useScroll`, `useTransform`, `useSpring`, `AnimatePresence`) |

## Struktur

```
src/
├── App.tsx                     # komposisi halaman + inisialisasi Lenis
├── index.css                   # design tokens, font, grain, marquee, fruit-orb, reduced-motion
├── data/site.ts                # SEMUA konten & warna produk (edit di sini)
├── lib/
│   ├── cn.ts
│   └── useLenis.ts             # setup Lenis (auto disable saat reduced-motion)
├── components/
│   ├── Navbar.tsx              # nav sticky + menu mobile
│   ├── ScrollProgress.tsx      # progress bar scroll
│   ├── RotatingBadge.tsx       # badge teks melingkar
│   ├── FruitOrb.tsx            # dekorasi buah bulat (CSS gradient)
│   ├── JuiceGlass.tsx          # ilustrasi gelas jus (SVG)
│   ├── Wave.tsx                # pembatas bergelombang SVG
│   └── sections/
│       ├── Hero.tsx            # produk transparan floating + parallax mouse & scroll
│       ├── Intro.tsx           # kata berganti + kartu jus parallax
│       ├── Ticker.tsx          # marquee dua arah
│       ├── ProductScenes.tsx   # 3 scene sticky, ganti rasa jus saat scroll
│       ├── Values.tsx          # kartu parallax + statistik
│       └── Footer.tsx          # CTA newsletter + kartu sosial
```

## Teknik animasi yang dipakai

1. **Lenis smooth scroll** — `lerp 0.09`, wheel multiplier 0.9. Otomatis nonaktif jika `prefers-reduced-motion`.
2. **Parallax scroll** — Framer Motion `useScroll` per section + `useTransform` untuk `y`, `rotate`, `scale`, dan posisi kata raksasa.
3. **Hero mouse parallax** — `useMotionValue` + `useSpring`; produk dan fruit orb bergerak halus mengikuti pointer (desktop).
4. **Sticky product scenes** — wrapper `220vh` + inner `sticky top-0 h-[100svh]`. Progress scroll memilih rasa aktif; klik chip akan scroll ke segmen rasa tersebut.
5. **Crossfade produk** — `AnimatePresence` saat warna/teks rasa berubah, hanya `transform`/`opacity` agar 60fps.
6. **Marquee** — track digandakan dua kali dan dianimasikan `translate3d(-50%)`, berhenti saat hover.
7. **Wave divider** — SVG `path` dengan `preserveAspectRatio="none"` mengikuti warna section berikutnya.
8. **Reduced motion** — animasi CSS dimatikan dan Lenis tidak dijalankan.

## Kustomisasi cepat

### Ganti brand & konten
Semua teks, menu, varian rasa, warna tiap scene, statistik, dan sosial ada di:

```
src/data/site.ts
```

### Ganti warna & font
Edit blok `@theme` di `src/index.css`:

```css
@theme {
  --color-ink: #0a0c0a;
  --color-cream: #f6f0e4;
  --color-rose: #f062a4;
  --color-gold: #e7b806;
  --color-plum: #8f5ba7;
  --color-leaf: #a8c03c;
  --color-juice: #ef7442;
  --color-citrus: #f5d33f;
  --font-display: 'Fraunces', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-script: 'Parisienne', cursive;
}
```

### Ganti gambar produk utama
Hero memakai `public/ProdukUtama.png` — PNG transparan 1376×768 yang ditampilkan sebagai produk floating (tanpa frame kartu). Versi WebP responsifnya `produk-utama-480.webp`, `800.webp`, `1100.webp`, dan `1376.webp`. Untuk menggantinya:

1. Timpa `public/ProdukUtama.png` (idealnya PNG transparan dengan rasio serupa, ±16:9).
2. Haluskan tepinya agar artwork yang terpotong di tepi kanvas tidak terlihat seperti kotak:
   ```bash
   python3 scripts/soften-edges.py public/ProdukUtama.png --fade 64
   ```
   Script ini hanya memudarkan alpha di 64px terluar; ukuran kanvas dan piksel yang terlihat tidak berubah. Naikkan `--fade` bila potongannya masih terasa tajam.
3. Buat ulang versi WebP-nya, misalnya dengan `cwebp`:
   ```bash
   for w in 480 800 1100 1376; do
     cwebp -q 84 -resize $w 0 public/ProdukUtama.png -o public/produk-utama-$w.webp
   done
   ```
4. Sesuaikan `width`/`height` dan `srcSet` di `Hero.tsx` serta preload di `index.html` bila rasio berubah.
5. Scene produk memakai ilustrasi SVG (`JuiceGlass`) yang warnanya diambil dari `src/data/site.ts`. Bila nanti ada foto per rasa, ganti `<JuiceGlass ... />` dengan `<img>` dan pertahankan pembungkus `motion.div` agar crossfade/rotate tetap bekerja.

## Catatan produksi

- Bundle JS ~136 kB gzip; Framer Motion adalah kontributor terbesar. Jika perlu lebih ringan, animasi parallax bisa dipindah ke rAF manual seperti situs referensi.
- Font dimuat dari Google Fonts. Untuk produksi, pertimbangkan self-host `woff2` + `font-display: swap`.
- Semua section memakai `transform` + `opacity`; hindari menambahkan animasi `width/height/top/left` agar tetap mulus.
- Uji di perangkat low-end: jumlah scene bisa dikurangi atau tinggi wrapper diturunkan.
- Form newsletter masih dummy (validasi + pesan sukses di client). Sambungkan ke API/Formspree/Resend saat produksi.
