<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles:
  - PRINCIPLE_2: "II. Sıfır Statik/Hardcoded Veri (Dynamic GitHub Sync)" updated to explicitly include forked repositories.
  - PRINCIPLE_4: Renamed from "IV. Duyarlı ve Esnek Düzen (Responsive 2-Card Layout & Slider)" to "IV. Duyarlı ve Esnek Düzen (Responsive 3-Card Carousel Layout)" to mandate 3-card desktop, 2-card tablet, and 1-card mobile distribution.
- Added sections: None
- Removed sections: None
- Follow-up TODOs: None
-->

# mehmetberkbozkurt.com Constitution

## Core Principles

### I. Tasarım Dili ve Arayüz Bütünlüğü (UI Consistency & Design System)
Yeni eklenecek tüm bileşenler; projenin mevcut renk paleti, tipografisi, kart kenar yumuşatma
(border-radius) değerleri ve aydınlık/karanlık tema (light/dark mode) değişkenleriyle eksiksiz
uyumlu olmak ZORUNDADIR (MUST). Harici, izole ve tema değişkenlerini baypas eden özel stil
tanımları yapılamaz.
*Gerekçe:* Kişisel portfolyonun görsel kalitesini, profesyonel marka algısını ve kullanıcı
deneyimi bütünlüğünü korumak.

### II. Sıfır Statik/Hardcoded Veri (Dynamic GitHub Sync & Fork Support)
Portfolyoda yer alan proje verileri statik JSON dosyaları veya kod içine gömülü diziler üzerinden
sunulamaz; doğrudan GitHub REST API (`users/mehmetberkk/repos`) üzerinden dinamik olarak
çekilmek ZORUNDADIR (MUST). Geliştiricinin profilindeki hem özgün hem de fork edilmiş
(`fork: true`) tüm açık kaynaklı depolar listeye dahil edilmelidir; yalnızca arşivlenmiş
depolar (`archived: true`) ve profil tanıtım deposu (`repo.name.toLowerCase() === 'mehmetberkk'`)
filtrelenerek hariç tutulmalıdır.
*Gerekçe:* Bakım maliyetini ve manuel güncelleme gereksinimini sıfırlayarak portfolyoyu her zaman
güncel tutmak ve geliştiricinin katkıda bulunduğu tüm çalışmaları eksiksiz yansıtmak.

### III. Performans ve Rate-Limit Koruması (Caching & Resilient Fetching)
GitHub REST API rate-limit sınırına (saatlik 60 kimliksiz istek) takılmamak adına istemci veya
veri katmanında uygun önbellekleme (Cache-Control, SWR veya depolama önbelleği) uygulanmak
ZORUNDADIR (MUST). İsteğe bağlı `GITHUB_TOKEN` desteği yapılandırılabilir olmalı; olası API
hatalarında zarif geri dönüş (graceful fallback) mekanizmaları sunulmalıdır.
*Gerekçe:* Kesintisiz kullanıcı deneyimi sağlamak ve API kotası aşımlarında sayfanın
işlevsiz kalmasını engellemek.

### IV. Duyarlı ve Esnek Düzen (Responsive 3-Card Carousel Layout)
Projeler bölümü, modern Carousel (`embla-carousel-react`) altyapısı ile responsive bazda şu kart
dağılımını sağlamak ZORUNDADIR (MUST):
- Masaüstü ekranlarda (`lg` / `>= 1024px`): Yan yana tam 3 adet proje kartı (`lg:basis-1/3`).
- Tablet ve orta boy ekranlarda (`sm` ve `md` / `>= 640px`): Yan yana tam 2 adet proje kartı (`sm:basis-1/2`).
- Mobil ekranlarda (`< 640px`): Ekran genişliğini kaplayan tek proje kartı (`basis-full`).
Kartlar arasında `-ml-1` / `pl-1` / `p-1` dengeli ve sıkı boşluk yapısı kullanılmalı, hem ok
butonları hem de akıcı fare/dokunmatik sürükleme (drag/swipe) desteklenmelidir.
*Gerekçe:* Ekran genişliğine göre optimum alan kullanımı, yüksek okunabilirlik ve modern dokunmatik/fare
ergonomisi sunmak.

### V. Temiz Kod ve Mimari Sadakat (Clean Architecture & Code Quality)
Gereksiz ve kalabalık yorum satırlarından kaçınılmalı, kod kendini ifade edecek açıklıkta
yazılmalıdır (`clean-code`). Projenin mevcut dizin mimarisine (`src/components/`, `src/types/`,
`src/services/` vb.) ve TypeScript standartlarına kesinlikle sadık kalınmak ZORUNDADIR (MUST).
*Gerekçe:* Kod tabanının sürdürülebilirliğini, okunabilirliğini ve gelecekteki geliştirmelerin
çevikliğini garanti altına almak.

## Teknoloji Standartları ve Kısıtlar (Technology Standards & Constraints)

- **Frontend Çatısı:** React 19, TypeScript ve Vite mimarisine tam uyum.
- **Stil Yönetimi:** Vanilla CSS ve CSS Variables (Dark/Light tokens) kullanılmalı; temel tema
  değişkenleri korunmalıdır.
- **UI Primitifleri & Karusel:** `embla-carousel-react` tabanlı Shadcn UI Carousel ve Card
  bileşen standartları benimsenmelidir.
- **Animasyon & İkonografi:** Animasyonlar için Framer Motion, simgeler için `lucide-react`
  tercih edilmelidir.

## Geliştirme İş Akışı ve Kalite Kapıları (Development Workflow & Quality Gates)

- **Tip ve Biçim Güvenliği:** Kod değişiklikleri `tsc -b` ve `eslint .` kalite kontrollerinden
  hatasız geçmek zorundadır.
- **Hata ve Yüklenme Durumları:** Harici veri çekme süreçlerinde loading (skeleton/spinner) ve
  hata (error state) durumları UI üzerinde eksiksiz ele alınmalıdır.

## Governance

Bu anayasa (`constitution.md`), mehmetberkbozkurt.com projesinin geliştirme süreçlerinde en üst düzey
bağlayıcı rehberdir. Tüm kod değişiklikleri, bileşen eklemeleri ve yeniden yapılandırmalar bu belgedeki
prensiplere uygunluk açısından doğrulanmalıdır. Anayasada yapılacak değişiklikler versiyon artışı ve
gerekçe belirtilmesini gerektirir.

- MAJOR: Temel prensiplerin kaldırılması veya geriye dönük uyumsuz kural değişiklikleri.
- MINOR: Yeni prensipler, standartlar veya mimari kısıtların eklenmesi.
- PATCH: Yazım düzeltmeleri, ifade netleştirmeleri ve küçük biçimlendirme güncellemeleri.

**Version**: 1.1.0 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-06
