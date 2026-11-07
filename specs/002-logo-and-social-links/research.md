# Research & Technical Decisions: Logo & LinkedIn Integration

**Feature**: `specs/002-logo-and-social-links`  
**Date**: 2026-11-06  
**Status**: In Progress (Pending Logo Asset Input)

---

## 1. "Header'daki Yıldırımlı İkon" Tespiti ve Konumu

### Bulgu
Projede iki kritik "yıldırımlı ikon" ve başlık alanı bulunmaktadır:
1. **Tarayıcı Sekmesi / Favicon (`public/favicon.svg` & `index.html`):**
   `index.html` dosyasının `<head>` başlığında tanımlı olan `public/favicon.svg` dosyası doğrudan mor bir yıldırım sembolüdür (`<path fill="#863bff" d="M25.946 44.938...`). Tarayıcı sekmelerinde sayfa başlığının solunda bu yıldırımlı ikon görünür.
2. **Üst Menü / Navbar Başlığı (`src/components/Navbar.tsx`):**
   Sitenin en üstündeki sabit gezinme çubuğunda (header/navbar) marka alanı `{ MBERK }` şeklinde metin olarak yer almaktadır.

### Karar
Kullanıcının ileteceği logo:
- `public/favicon.svg` içerisine yerleştirilerek tarayıcı sekme başlığındaki yıldırım ikonu değiştirilecektir.
- Aynı zamanda Navbar'ın solundaki logo alanına (`navbar__logo`) şık bir ikon olarak entegre edilerek hem tarayıcı sekmesinde hem de site başlığında (header) görsel bütünlük sağlanacaktır.

---

## 2. LinkedIn Butonunun Entegrasyonu

### Bulgu
1. `src/components/Contact.tsx` içinde şu an:
   ```typescript
   const socials = [
       { label: 'GitHub', href: 'https://github.com/mehmetberkk', icon: Github },
       { label: 'LeetCode', href: 'https://leetcode.com/u/mberkkk', icon: LeetCodeIcon },
   ];
   ```
   Sosyal butonlar burada büyük butonlar halinde yer almaktadır.
2. Projede `lucide-react` kütüphanesi mevcuttur ve `Linkedin` ikonu doğrudan kullanılabilir.

### Karar
1. `Contact.tsx` içerisine `Linkedin` eklenerek GitHub'ın hemen yanına konumlandırılacaktır:
   ```typescript
   { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehmet-berk-bozkurt', icon: Linkedin }
   ```
2. Eğer kullanıcı LinkedIn ve GitHub ikonlarının sitenin en üst başlığında (Navbar/Header içinde) da yer almasını istiyorsa, Navbar'daki tema değiştirme butonunun soluna GitHub ve LinkedIn ikon bağlantıları eklenebilecektir.

