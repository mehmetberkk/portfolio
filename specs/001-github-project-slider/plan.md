# Implementation Plan: GitHub Projects Carousel & TR/EN Çoklu Dil (Resume/CV Kaldırıldı)

**Branch**: `001-github-project-slider` | **Date**: 2026-11-06 (Updated: Resume/CV Sekmesi/Butonu Kaldırıldı) | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-github-project-slider/spec.md` with user directive: "resume sekmesi istememiştim onu kaldır."

## Summary

1. **GitHub Projeler Karuseli:** Açıklamasız kompakt kartlar, fork repo desteği, Shadcn UI 3'lü kaydırıcı düzeni ve `languages_url` ile dinamik programlama dili çözümlemesi.
2. **TR / EN Çoklu Dil Desteği:** Harici ağır kütüphaneler kurmaksızın yerel `LanguageContext` ve `translations.ts` sözlük mimarisi ile sayfa yenilenmeden tek tıkla TR | EN geçişi. İngilizce çeviride unvanın "Software Developer" olması, Java/Spring Boot/Mikroservis odaklı kimliğin korunması.
3. **Resume / CV Kaldırılması:** Kullanıcı talebi doğrultusunda About bileşenindeki CV/Resume butonu (`about__cv-action`), ilgili CSS kuralları, sözlükteki `cvUrl` / `viewCv` anahtarları ve `public/` altındaki geçici PDF dosyaları tamamen kaldırılacaktır.

## Technical Context

**Language/Version**: TypeScript 5.8+, React 19.1+  
**State Architecture**: Native React Context (`src/context/LanguageContext.tsx`) + `localStorage` kalıcılığı (`portfolio-language: 'tr' | 'en'`)  
**Translations Dictionary**: `src/data/translations.ts` — tüm modüller için güçlü tip güvenli (`Translations`) TR ve EN sözlükleri (Resume / `cvUrl` / `viewCv` hariç)  
**Header Language Toggle**: Navbar sağ alanında temaya uyumlu şık `TR | EN` geçiş butonu  
**English Persona & Identity**: Unvan: `Software Developer`; uzmanlık: Java Ecosystem, Spring Boot, Microservices, Clean & Secure Code  
**Excluded Features**: Harici Resume / CV sekmesi veya indirme butonu yer almayacaktır (`about__cv-action` ve `public/cv-*.pdf` elenir)  
**Data Filtering**: `EXCLUDED_REPOS = [USERNAME.toLowerCase(), 'portfolio']`  
**Carousel Layout**: Shadcn Carousel (`embla-carousel-react`), 3 kart masaüstü (`lg:basis-1/3`), 2 kart tablet (`sm:basis-1/2`), 1 kart mobil (`basis-full`)  
**Accessibility**: 40px x 40px yuvarlak butonlar, `.sr-only` gizli etiketler, klavye ve ekran okuyucu uyumluluğu  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Anayasa İlkesi | Durum | Uyum Analizi |
| :--- | :---: | :--- |
| **I. Tasarım Dili ve Arayüz Bütünlüğü** | ✅ GEÇTİ | Resume butonunun kaldırılması ile About bölümündeki terminal estetiği sade ve orijinal haline döner. |
| **II. Sıfır Statik/Hardcoded Veri (Dinamiklik)** | ✅ GEÇTİ | Tüm metinler `translations.ts` sözlüğünden dinamik olarak beslenir. |
| **III. Performans ve Rate-Limit Koruması** | ✅ GEÇTİ | Sıfır harici paket; anında ve sıfır gecikmeli state güncellemesi. |
| **IV. Duyarlı ve Esnek Düzen (Responsive)** | ✅ GEÇTİ | Mobil ve masaüstü düzenlerinde hiçbir bozulma veya taşma riski bulunmaz. |
| **V. Temiz Kod ve Mimari Sadakat** | ✅ GEÇTİ | Kullanılmayan CV stilleri ve tip tanımları temizlenerek kod tabanının yalınlığı korunur. |

## Project Structure & Planned Touch-Points

```text
src/
├── context/
│   ├── ThemeContext.tsx      # Karanlık/Aydınlık tema yöneticisi
│   └── LanguageContext.tsx   # TR / EN durum ve localStorage yöneticisi
├── data/
│   ├── translations.ts       # TR ve EN sözlükleri (cvUrl/viewCv kaldırılacak)
│   └── projects.json         # Statik yedek veri
├── components/
│   ├── ui/
│   │   ├── carousel.tsx      # Shadcn Carousel bileşeni
│   │   └── card.tsx          # Shadcn Card bileşeni
│   ├── Navbar.tsx            # TR | EN dil değiştirme butonu
│   ├── Navbar.css            # TR | EN buton stilleri
│   ├── Hero.tsx              # Software Developer unvanı, dinamik motto ve butonlar
│   ├── About.tsx             # Terminal biyografisindeki CV butonu kaldırılacak
│   ├── About.css             # .about__cv-action ve .about__cv-btn stilleri temizlenecek
│   ├── Projects.tsx          # Dinamik bölüm başlığı, alt başlık ve butonlar
│   ├── ProjectCard.tsx       # Çok dilli kart butonları
│   ├── Contact.tsx           # Dinamik e-posta ve kopyalama metinleri
│   ├── Footer.tsx            # Dinamik telif metni
│   └── ...
├── types/
│   └── language.ts           # cvUrl ve viewCv alanları Translations tipinden çıkarılacak
public/
├── cv-tr.pdf                 # Kaldırılacak
└── cv-en.pdf                 # Kaldırılacak
```

## Complexity Tracking

> *Resume/CV sekmesinin ve butonunun kaldırılması mimariyi daha da basitleştirir. Tip modelinde ve UI bileşeninde ölü kod (dead code) bırakılmayacak, temiz kod ilkelerine tam uyulacaktır.*
