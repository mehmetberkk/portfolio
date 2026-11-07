# Feature Specification: Favicon Logo & LinkedIn İletişim Entegrasyonu

**Feature Branch**: `002-logo-and-social-links`  
**Created**: 2026-11-06 (Updated with User Clarifications)  
**Status**: Ready for Implementation  
**Input**: "elimde bir logo var. bu logoyu headerdaki yıldırımlı iconun yerine kullanmak istiyorum. Ayrıca https://www.linkedin.com/in/mehmet-berk-bozkurt bu bağlantıyı linkedin logosu olarak github gibi eklemek istiyorum."

## Kararlaştırılan Kapsam & Yerleşim

1. **Favicon (Tarayıcı Sekmesi Yıldırımlı İkon):**
   - Kullanıcı `public/` dizini altına kendi logosunu (`public/logo.svg`, `public/logo.png` veya `public/favicon.svg`) ekleyecektir.
   - `index.html` dosyasındaki `<link rel="icon">` etiketi bu yeni logoya yönlendirilecek veya `favicon.svg` doğrudan güncellenecektir.
   - Header (Navbar) içerisindeki `{ MBERK }` marka yapısı mevcut haliyle korunacaktır.

2. **LinkedIn Sosyal Bağlantısı:**
   - `src/components/Contact.tsx` içerisindeki sosyal bağlantılar listesine GitHub'ın hemen yanına LinkedIn eklenecektir.
   - `lucide-react` kütüphanesinden `Linkedin` ikonu kullanılacaktır.
   - Bağlantı: `https://www.linkedin.com/in/mehmet-berk-bozkurt` (`target="_blank" rel="noopener noreferrer"`).

## Requirements

- **FR-001**: `index.html` ve `public/` dizininde tarayıcı sekme ikonu kullanıcının logosu ile değiştirilmeli, yıldırımlı SVG kaldırılmalıdır.
- **FR-002**: `src/components/Contact.tsx` içerisine `Linkedin` ikonu ve profil URL'i eklenmeli; mevcut GitHub ve LeetCode butonlarıyla aynı stil, animasyon ve hover özelliklerine sahip olmalıdır.
- **FR-003**: Proje hatasız derlenmeli (`npm run lint` ve `npm run build`).
