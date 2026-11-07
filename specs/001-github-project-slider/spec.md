# Feature Specification: GitHub Senkronize 3'lü Proje Carousel'i & TR/EN Çoklu Dil

**Feature Branch**: `001-github-project-slider`

**Created**: 2026-11-06 (Updated: TR / EN Çoklu Dil Eklendi; Resume/CV Butonu Kullanıcı Talebiyle Kaldırıldı)

**Status**: Ready for Planning

**Input**: User description: "mehmetberkbozkurt.com üzerindeki 'Projects' bölümü dinamik repoları 3'lü carousel ile sunacak; ayrıca sitede TR / EN Çoklu Dil desteği (Header'da dil butonu, sayfa yenilenmeden anında geçiş, unvan: Software Developer, Java/Spring Boot odaklı kimliğin korunması) yer alacaktır. Resume / CV sekmesi/butonu portfolyoda yer almayacaktır."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Tam Senkronizasyon & Fork Desteği (Priority: P1)

Bir ziyaretçi portfolyo sitesini ziyaret ettiğinde, "Projects" bölümünde geliştiricinin (`mehmetberkk`) GitHub profilindeki hem orijinal çalışmalarını hem de diğer hesaplardan fork'ladığı açık kaynaklı projeleri güncel istatistikleriyle (yıldız sayısı, fork sayısı, ana dil vb.) birlikte görüntüler. Herhangi bir manuel site güncellemesine gerek kalmadan yeni açılan, güncellenen veya fork'lanan açık projeler otomatik olarak listelenir.

**Why this priority**: Geliştiricinin hem özgün hem de katkı sağladığı/çatalladığı tüm projeleri eksiksiz sergileyerek portfolyoyu zenginleştirmek ve tam dinamik senkronizasyon (Sıfır Hardcoded Veri) sağlamak.

**Independent Test**: Sayfa açıldığında GitHub API verileri çekilir, fork'lar dahil edilecek şekilde filtrelenir ve kullanıcıya güncel proje kartları gösterilir; carousel olmasa dahi veri doğruluğu tam olarak sağlanmış olur.

**Acceptance Scenarios**:

1. **Given** ziyaretçi portfolyo ana sayfasını açtığında, **When** "Projects" bölümüne kaydırdığında, **Then** `mehmetberkk` kullanıcısına ait herkese açık (public), arşivlenmemiş (fork edilmiş olanlar dahil) tüm depolar listelenir.
2. **Given** depolardan biri arşivlenmiş (`archived: true`) ise ya da profil README deposu (`repo.name.toLowerCase() === 'mehmetberkk'`) ise, **When** projeler yüklenip listelendiğinde, **Then** bu depolar proje kartları arasında yer almaz.
3. **Given** listelenen depolar, **When** görüntülendiğinde, **Then** her depoya ait ad, açıklama, ana programlama dili, konular/etiketler, yıldız sayısı, fork sayısı ve kaynak kod/demo bağlantıları kart üzerinde eksiksiz görünür.

---

### User Story 2 - Shadcn UI 3'lü Carousel ve Sıkı Boşluk Düzeni (Priority: P1)

Ziyaretçi projeler bölümüne baktığında:
- Geniş masaüstü ekranlarda (`lg` / `>= 1024px`): Yan yana tam 3 adet proje kartı (`lg:basis-1/3`).
- Orta ve tablet ekranlarda (`sm` ve `md` / `>= 640px`): Yan yana tam 2 adet proje kartı (`sm:basis-1/2`).
- Mobil ekranlarda (`< 640px`): Ekran genişliğini kaplayan tek proje kartı (`basis-full`).
Kartlar arasında dengeli ve sıkı boşluk (`-ml-1`, `pl-1` ve `p-1`) yer almalı; sağ/sol ok butonları (`<CarouselPrevious />` ve `<CarouselNext />`) veya fare/dokunmatik sürükleme (drag/swipe) ile diğer projelere akıcı bir şekilde geçilebilmelidir.

**Why this priority**: Modern Shadcn UI Carousel standardı (`embla-carousel-react`) ile ekran genişliğine göre en optimize kart dizilimini ve yüksek ergonomili gezinmeyi sunar.

**Independent Test**: Farklı ekran genişliklerinde (1200px, 800px, 390px) kart sayılarının sırasıyla 3, 2 ve 1 olduğu, `-ml-1` / `pl-1` / `p-1` boşluklarının korunduğu ve butonlar veya sürükleme ile kaydırılabildiği test edilebilir.

**Acceptance Scenarios**:

1. **Given** masaüstü ekran genişliğinde (`>= 1024px`), **When** projeler alanı görüntülendiğinde, **Then** görünür alanda tam 3 kart yan yana eşit yükseklikte listelenir.
2. **Given** tablet/orta ekran genişliğinde (`>= 640px` ve `< 1024px`), **When** projeler alanı görüntülendiğinde, **Then** görünür alanda tam 2 kart yan yana listelenir.
3. **Given** mobil ekran genişliğinde (`< 640px`), **When** projeler alanı görüntülendiğinde, **Then** görünür alanda tek kart (`basis-full`) yer alır.
4. **Given** kullanıcı ok butonlarına tıkladığında veya mouse/dokunmatik ile sürüklediğinde, **When** hareket tamamlandığında, **Then** kartlar akıcı şekilde sonraki/önceki konuma kayar.

---

### User Story 3 - Yükleme İskeleti ve Ağ/Limit Hata Yönetimi (Priority: P2)

Ziyaretçi sayfayı açtığında proje verileri harici servisten gelene kadar kartların yerinde uyumlu bir yükleme iskeleti (Skeleton Loader) görür. Servis kota aşımı (rate-limit) veya ağ hatası durumunda sayfa kırılmaz; ziyaretçiye zarif ve bilgilendirici bir hata/yedek ekranı sunulur.

**Why this priority**: Kullanıcı deneyimini kesintisiz tutmak ve API kota sınırlarına karşı dayanıklı olmak.

**Independent Test**: Ağ bağlantısı kesilerek veya API limiti simüle edilerek sistemin çökmeden zarif bir geri dönüş mesajı sunduğu doğrulanabilir.

**Acceptance Scenarios**:

1. **Given** proje verileri henüz yüklenirken, **When** projeler bölümü ekrana geldiğinde, **Then** gerçek kart boyutlarında ve tema ile uyumlu animasyonlu iskelet (skeleton) kartlar gösterilir.
2. **Given** API bağlantı hatası veya saatlik istek limiti aşıldığında, **When** veri çekimi başarısız olduğunda, **Then** ziyaretçiye durumu açıklayan ve doğrudan GitHub profiline yönlendiren şık bir yedek mesaj sunulur.

---

### User Story 4 - TR / EN Çoklu Dil Deneyimi (Priority: P1)

Ziyaretçi portfolyo sitesini incelediğinde:
- Header (üst gezinme çubuğu) üzerinde yer alan şık bir `TR | EN` dil değiştirme butonuna tıklar.
- Sayfa yeniden yüklenmeden (zero reload), sitenin tüm içeriği (Menü başlıkları, Hero unvanı ve karşılama metni, Hakkımda biyografisi, Yetenekler, Proje butonları, İletişim alanı ve Footer telif hakları) anında İngilizce veya Türkçe olarak güncellenir.
- İngilizce görünümde geliştiricinin unvanı `Software Developer` olarak sunulur; Hakkımda ve rol detayları Java, Spring Boot ve mikroservis ağırlıklı mühendislik kimliğini eksiksiz yansıtır.
- Portfolyoda harici CV/Resume sekmesi veya indirme butonu yer almaz; sade ve modern kişisel portfolyo düzeni korunur.
- Kullanıcının dil tercihi tarayıcıda (`localStorage`) hatırlanır, sayfayı tekrar ziyaret ettiğinde son seçtiği dille karşılaşır.

**Why this priority**: Geliştiricinin hem yerel hem de uluslararası şirketler ve teknik işe alım uzmanları tarafından profesyonelce değerlendirilebilmesini sağlamak; küresel erişilebilirliği artırmak.

**Independent Test**: Header'daki `TR | EN` düğmesine tıklandığında sayfa yenilenmeden tüm metinlerin saniyeden kısa sürede İngilizceye/Türkçeye dönüştüğü ve unvanın "Software Developer" olarak göründüğü test edilebilir.

**Acceptance Scenarios**:

1. **Given** ziyaretçi sitede Türkçe dilindeyken, **When** Header'daki `TR | EN` butonuna tıkladığında, **Then** sayfa yenilenmeksizin tüm metinler (menüler, hero, hakkımda, yetenekler, proje butonları, iletişim ve footer) anında İngilizceye çevrilir.
2. **Given** İngilizce dil modu aktifken, **When** Hero ve Hakkımda bölümleri incelendiğinde, **Then** unvanın "Software Developer" olduğu ve içeriklerin Java, Spring Boot ve mikroservis uzmanlığını koruduğu görülür.
3. **Given** About veya diğer bölümler incelendiğinde, **Then** herhangi bir Resume/CV butonu veya sekmesi yer almaz.
4. **Given** ziyaretçi dili değiştirdiğinde, **When** sayfayı yenilediğinde veya tekrar ziyaret ettiğinde, **Then** son seçilen dil tercihi korunmuş olarak açılır.

---

### Edge Cases

- **Kota Aşımı (Rate Limiting):** GitHub REST API unauthenticated saatlik 60 istek sınırına takıldığında sistem kullanıcıya anlaşılır bir bildirim sunmalı ve varsa önbellekteki son verileri göstermelidir.
- **Fork Olan Projelerin Temsili:** Fork edilmiş repolarda orijinal isim ve açıklamalar doğru yansıtılmalı; boş açıklama durumunda standart varsayılan metin yer almalıdır.
- **Düşük Proje Sayısı (0 veya 1-3 Proje):** Filtreleme sonrası depolarda görünür kart sayısından az proje kalırsa Carousel navigasyon butonları devre dışı (disabled) olmalı veya gizlenmelidir.
- **Çok Uzun Proje Başlıkları veya Açıklamaları:** Uzun başlık ve açıklama metinleri kartın taşmasına neden olmamalı, satır sınırlaması (line-clamp) ve flexbox düzeni ile kart yükseklikleri eşit tutulmalıdır.
- **İlk Ziyaret / Boş Tercih (No Stored Locale):** Kullanıcı siteye ilk kez geldiğinde `localStorage` boşsa varsayılan dil olarak Türkçe (TR) veya tarayıcı dili devreye girmeli, hata oluşmamalıdır.
- **Eksik Çeviri Güvencesi (Translation Fallback):** Herhangi bir dil anahtarı hedef dilde tanımlı değilse yedek olarak varsayılan dil metni sunulmalı; ekranda ham çeviri kodu veya boş alan görünmemelidir.
- **Dil Değişimi Esnasında Durum Korunumu:** Dil değiştiğinde açık olan sekme (örneğin Deneyim veya Eğitim sekmesi), Carousel aktif slaydı ve sayfanın kaydırma (scroll) pozisyonu korunmalıdır.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistem, `https://api.github.com/users/mehmetberkk/repos?sort=updated&per_page=100` adresinden açık kaynak depoları dinamik olarak çekmelidir.
- **FR-002**: Sistem, fork'lanmış depoları (`fork: true`) proje listesine **DAHİL ETMELİDİR**; yalnızca arşivlenmiş depoları (`archived: true`), profil tanıtım deposunu (`repo.name.toLowerCase() === 'mehmetberkk'`) ve portfolyo web sitesinin kaynak kod deposunu (`repo.name.toLowerCase() === 'portfolio'`) filtreleyerek hariç tutmalıdır.
- **FR-003**: Her proje kartı (`Card` ve `CardContent`); Proje Adı (`name`), Ana Programlama Dili (`language`), Etiketler (`topics`), Yıldız Sayısı (`stargazers_count`), Fork Sayısı (`forks_count`), Kaynak Kod Bağlantısı (`html_url`) ve Canlı Demo Bağlantısı (`homepage`) alanlarını içermelidir. Proje açıklaması (`description`), kartların daha kompakt, dengeli ve eşit yükseklikte kalması amacıyla kart gövdesinde render edilmeyecektir.
- **FR-004**: Carousel bileşeni Shadcn UI `Carousel` (`embla-carousel-react`) yapısını kullanmalı ve şu responsive kart dağılımını sağlamalıdır:
  - Mobil (`< 640px`): `basis-full` (1 kart)
  - Orta/Tablet (`sm` / `>= 640px`): `sm:basis-1/2` (2 kart yan yana)
  - Masaüstü (`lg` / `>= 1024px`): `lg:basis-1/3` (3 kart yan yana)
- **FR-005**: Carousel yapısı, `<CarouselContent className="-ml-1">` ve `<CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">` yapısını kullanmalı, her item içinde `<div className="p-1 h-full">` ile kartlar eşit boyda (`h-full`) hizalanmalıdır.
- **FR-006**: Gezinme butonları (`<CarouselPrevious />` ve `<CarouselNext />`) ekranda yalnızca ok simgelerinden (`<ChevronLeft />`, `<ChevronRight />`) oluşan modern ikon butonları olarak görünmeli; "Previous slide" ve "Next slide" metinleri görsel olarak gizlenerek (`.sr-only` / visually hidden) yalnızca ekran okuyucu erişilebilirliği için korunmalıdır. Butonlar koyu arka planla uyumlu modern vurgu rengine (`--color-accent-primary`), yuvarlatılmış köşelere ve üzerine gelindiğinde (hover) görsel geri bildirime sahip olmalıdır. Gezinme ayrıca fare/dokunmatik sürükleme (drag/swipe) hareketlerini desteklemelidir.
- **FR-007**: Veriler yüklenirken mevcut tema renkleriyle uyumlu iskelet yükleyici (Skeleton Loader) gösterilmelidir.
- **FR-008**: API kota aşımı veya ağ hatası durumunda sistem kırılmamalı, kullanıcıya yedek mesaj veya önbellekteki veriler sunulmalıdır.
- **FR-009**: Kart yükseklikleri, içerik metni uzunluğundan bağımsız olarak bir satırda/slider slaytında eşit boyda (`h-full` / `equal height`) olmalıdır.
- **FR-010**: Yeni bileşenler sitenin mevcut CSS değişkenleri, aydınlık/karanlık teması ve tasarım dili ile %100 uyumlu olmalıdır.
- **FR-011**: Fork edilmiş veya API'de `language` alanı boş/null dönen tüm projelerde deponun GitHub üzerindeki gerçek yazılım dili (TSQL, Java, Python vb.) `languages_url` çözümlemesi ve koruma katmanı ile kartın altında gösterilmeli; projenin altında 'Diğer' ifadesi yer almamalıdır.
- **FR-012**: Header (Navbar) sağ alanında (tema değiştirme butonunun yanında) konumlandırılmış, aktif dili görsel olarak vurgulayan modern bir `TR | EN` dil değiştirme butonu/anahtarı yer almalıdır.
- **FR-013**: Dil seçimi değiştirildiğinde sayfa yenilenmeksizin (zero reload) tüm site bileşenleri (Navbar menüleri, Hero alanı karşılama/unvan/buton metinleri, Hakkımda biyografisi, Deneyim, Eğitim, Yetenekler sekmeleri, Proje başlıkları ve kart butonları ["Kaynak Kod" / "Source Code", "Canlı Demo" / "Live Demo"], İletişim butonları ve Footer telif metinleri) seçilen dilde anında render edilmelidir.
- **FR-014**: İngilizce dil modunda geliştiricinin ana unvanı `Software Developer` olarak tanımlanmalı; Hakkımda biyografisi ve rol açıklamaları Java, Spring Boot ve mikroservis mimarisi uzmanlığını eksiksiz yansıtmalıdır.
- **FR-015**: Portfolyo arayüzünde harici Resume/CV butonu veya sekmesi yer almayacaktır; sade ve odaklı terminal biyografisi ve yetenek listesi korunacaktır.
- **FR-016**: Kullanıcının seçtiği dil tercihi `localStorage` içine kaydedilmeli ve kullanıcı siteyi sonraki ziyaretlerinde veya sekme yenilendiğinde aynı dille karşılanmalıdır.

### Key Entities *(include if feature involves data)*

- **GitHub Repository Entity**:
  - `id`: Benzersiz depo kimliği.
  - `name`: Proje başlığı/adı.
  - `description`: Proje açıklaması (boşluk durumunda yedek metin atanabilir).
  - `language`: Ana geliştirme dili (örn. Java, TypeScript).
  - `topics`: Projeyle ilişkili etiketler dizisi.
  - `stargazers_count`: Yıldız sayısı.
  - `forks_count`: Çatallanma (fork) sayısı.
  - `html_url`: GitHub depo bağlantısı.
  - `homepage`: Varsa canlı çalışan demo URL'i.
  - `fork`: Çatal olma durumu (boolean - artık filtrelenmeyecek, dahil edilecektir).
  - `archived`: Arşiv durumu (boolean - filtrelenecektir).
  - `pushed_at`: Son güncelleme zaman damgası.

- **Carousel State Entity**:
  - `canScrollPrev`: Geri kaydırılabilir mi (boolean).
  - `canScrollNext`: İleri kaydırılabilir mi (boolean).
  - `selectedIndex`: Aktif slayt indeksi.
  - `scrollSnaps`: Snap noktaları dizisi.

- **Locale & Translation Entity**:
  - `language`: Aktif dil kodu (`'tr'` veya `'en'`).
  - `setLanguage`: Dili değiştiren ve `localStorage` içine kaydeden fonksiyon.
  - `translations`: Sayfa genelindeki tüm modüller için hazırlanmış TR ve EN çeviri sözlüğü.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Ziyaretçiler sayfayı açtığında proje kartları veya yükleme iskeleti 200ms içinde görünür olmalı; toplam veri yükleme süresi standart ağ koşullarında 1.5 saniyenin altında tamamlanmalıdır.
- **SC-002**: Masaüstü ekranlarda (`>= 1024px`) yan yana tam 3 kart, orta ekranlarda (`>= 640px`) tam 2 kart, mobilde (`< 640px`) tam 1 kart eksiksiz hizalanmalı ve kart yükseklikleri eşit olmalıdır.
- **SC-003**: `mehmetberkk` hesabına ait fork edilmiş açık repolar dahil tüm güncel projeler listede yer almalı; sadece `mehmetberkk` tanıtım deposu ve arşivli repolar elenmiş olmalıdır.
- **SC-004**: Kartlar arasındaki yatay ve dikey boşluklar `-ml-1`, `pl-1` ve `p-1` kurallarına tam uyumlu olmalı, taşma yapmamalıdır.
- **SC-005**: Karusel yön butonlarında hiçbir metin ('Previous slide' / 'Next slide') görsel olarak ekranda yer almamalı, yalnızca şık ok ikonları görünmeli ve ekran okuyucular için `aria-label` / `.sr-only` ile %100 erişilebilir kalmalıdır. 3'ten fazla proje listelendiğinde ziyaretçiler Carousel butonları veya fare/dokunmatik sürükleme ile tüm projelere %100 başarıyla erişebilmelidir.
- **SC-006**: Proje kartlarındaki dış bağlantılar (GitHub ve Demo) yeni sekmede (`target="_blank"`, `rel="noopener noreferrer"`) güvenle açılmalıdır.
- **SC-007**: Header'daki `TR | EN` butonuna tıklandığında sayfa yenilenmeksizin 50 milisaniyenin altında tüm UI metinleri seçilen dile dönüşmelidir.
- **SC-008**: İngilizce modunda unvan istisnasız `Software Developer` olmalı, Java/Spring Boot/Mikroservis uzmanlık odağı korunmalı ve arayüzde Türkçe kalmış metin yer almamalıdır.
- **SC-009**: Tarayıcı kapatılıp açıldığında veya sekme yenilendiğinde ziyaretçinin seçtiği dil tercihi korunmalıdır.
- **SC-010**: Hakkımda bölümünde veya menülerde istenmeyen Resume/CV sekmesi veya butonunun bulunmadığı doğrulanmalıdır.

## Assumptions

- Shadcn UI `Carousel` bileşenleri (`Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`) için `embla-carousel-react` paketinin projeye ekleneceği kabul edilmiştir.
- Projede Tailwind CSS sınıflarının (`-ml-1`, `pl-1`, `basis-full`, `sm:basis-1/2`, `lg:basis-1/3`, `p-1`, `h-full`) ya da bunlara karşılık gelen CSS kurallarının Carousel yapısını destekleyecek şekilde yapılandırılacağı öngörülmüştür.
- Ziyaretçilerin modern web tarayıcıları kullandığı ve dokunmatik/fare sürükleme olaylarının sorunsuz çalıştığı kabul edilmiştir.
