# Research & Technical Decisions: GitHub Projects Shadcn Carousel

**Feature**: `specs/001-github-project-slider`  
**Date**: 2026-11-06 (Updated: Repo Language Detection for Forked Projects)  
**Status**: Completed

---

## 1. Portfolyo Reposunun Gizlenmesi: Private mı, Kod Seviyesinde Filtreleme mi?

### Soru ve Değerlendirme
Kullanıcı, portfolyo web sitesinin kaynak kod reposunun (`portfolio`) projeler karuselinde listelenmesini istemiyor ve "bunun için repoyu private mi yapayım?" diye soruyor.

### Karar
Kullanıcının repoyu GitHub üzerinde zorunlu olarak **"Private" yapmasına gerek yoktur**.
Kod seviyesinde `EXCLUDED_REPOS` filtre listesi genişletilerek `portfolio` reposu listelemeden hariç tutulacaktır:
```typescript
const EXCLUDED_REPOS = [USERNAME.toLowerCase(), 'portfolio'];
```

### Gerekçe
- **Esneklik:** Kullanıcı repoyu GitHub'da public tutarak açık kaynak profilinde sergilemeye ve GitHub Pages / deployment entegrasyonlarını sorunsuz kullanmaya devam edebilir.
- **Çift Güvence:** Kullanıcı isterse repoyu GitHub'da "Private" da yapabilir; unauthenticated API (`/users/mehmetberkk/repos`) zaten sadece public repoları döndürdüğü için her iki durumda da portfolyoda görünmez.

---

## 2. Proje Açıklamalarının (Description) Kaldırılması

### Karar
`ProjectCard.tsx` içerisindeki açıklama metni (`<p className="project-card__desc">`) ve `ProjectSkeleton.tsx` içindeki açıklama iskelet kutuları tamamen kaldırılmıştır.

### Rationale
- **Kompakt ve Dengeli Kartlar:** Açıklama satırları kaldırıldığında tüm kartlar başlık, dil/etiket etiketleri, yıldız/fork sayıları ve butonlardan oluşan son derece derli toplu, modern bir vitrin görünümü kazanır.
- **Kusursuz Yükseklik Eşitliği:** Farklı repolardaki değişken açıklama uzunlukları ortadan kalktığı için kart yükseklik dengesi doğal olarak optimize edilir.

---

## 3. Karusel ve Buton Standartları

- **3'lü Kart Düzeni:** Masaüstünde (`lg`) 3 kart, tablette (`sm`) 2 kart, mobilde (`basis-full`) 1 kart.
- **Aralıklar:** `-ml-1` / `pl-1` / `p-1`.
- **Butonlar:** 40px x 40px yuvarlak, yarı saydam, SVG ikonlu (`ChevronLeft` / `ChevronRight`) ve `.sr-only` gizli erişilebilir metinli.

---

## 4. Fork Edilen Repolarda Programlama Dili Tespiti (`languages_url` ve Fallback)

### Problem
GitHub REST API'sinin `/users/:username/repos` uç noktası, kullanıcı tarafından fork edilmiş repolarda (`fork: true`) `repo.language` alanını `null` olarak döndürmektedir. Bu sebeple 3., 4., 5. ve 6. projeler (`Country-Transportation-Database`, `appointment-system`, `e-commerce`, `trendyol-review-bot`) sitede "Diğer" olarak görünmektedir. Oysa GitHub web arayüzünde ve deponun kendi `languages_url` uç noktasında bu diller açıkça bellidir:
- `Country-Transportation-Database`: TSQL
- `appointment-system`: Java / HTML
- `e-commerce`: Java
- `trendyol-review-bot`: Python

### Karar & Çözüm Mimarisi
1. **Dinamik `languages_url` Çözümleme:** `useGithubRepos.ts` içinde `repo.language` değeri `null` olan depolar için `repo.languages_url` uç noktasına istek atılarak en yüksek bayt ağırlığına sahip dil seçilecektir.
2. **Akıllı Programlama Dili Önceliği:** Proje repolarında (örneğin Spring Boot MVC olan `appointment-system` gibi) HTML/CSS gibi markup dilleri yerine derlenmiş/yorumlanmış birincil yazılım dili (Java) varsa birincil dil olarak Java atanacak, ikincil diller etiketlere (topics) aktarılacaktır.
3. **Kota Korumalı Fallback Haritası (`KNOWN_REPO_LANGUAGES`):** Unauthenticated API istek limitine (60 istek/saat) takılma durumunda sistemin asla "Diğer" basmaması için güvenilir bir dil haritası tutulacaktır:
   ```typescript
   const KNOWN_REPO_LANGUAGES: Record<string, { language: string; topics?: string[] }> = {
     'country-transportation-database': { language: 'TSQL' },
     'appointment-system': { language: 'Java', topics: ['Spring Boot', 'MVC', 'HTML'] },
     'e-commerce': { language: 'Java', topics: ['Spring Boot', 'Microservices'] },
     'trendyol-review-bot': { language: 'Python', topics: ['Automation', 'Bot'] },
     'rapid-flashcard-stream': { language: 'TypeScript', topics: ['React', 'Next.js'] },
     'rent-a-car-b2b': { language: 'Java', topics: ['Spring Boot', 'B2B'] },
   };
   ```
4. **Önbellek Geçersiz Kılma:** Eski "Diğer" verisinin tarayıcı önbelleğinde kalmaması için `CACHE_KEY` sürümü `github_repos_cache_v2` olarak yükseltilecektir.

---

## 5. Çoklu Dil Mimarisi: Ağır Kütüphaneler vs Hafif Native LanguageContext

### Soru ve Değerlendirme
Portfolyo sitesinde TR / EN çoklu dil desteği eklenirken `i18next`, `react-i18next` gibi harici büyük paketler mi kurulmalı, yoksa projede zaten var olan `ThemeContext` desenine uygun hafif bir React Context mi kullanılmalıdır?

### Karar
Harici ağır kütüphaneler kurulmayacak; tamamen React'in yerel Context API'si (`LanguageContext`) ve güçlü tipli bir sözlük (`src/data/translations.ts`) yapısı uygulanacaktır.

### Gerekçe
1. **Sıfır Ek Bağımlılık ve Yüksek Performans:** Harici paket yükü olmadan bundle boyutu minimal tutulur; sayfa yenilenmeden milisaniyeler içinde dil geçişi sağlanır.
2. **%100 Tip Güvenliği (Compile-time Type Safety):** `translations.ts` içerisinde tanımlanan TypeScript tipi sayesinde eksik çeviri anahtarları derleme aşamasında anında yakalanır.
3. **Mevcut Mimariyle Tam Uyum:** Halihazırda `src/context/ThemeContext.tsx` dosyasında başarıyla çalışan `localStorage` destekli React Context deseniyle birebir uyumlu, sade ve bakımı kolay bir yapı kurulacaktır.
4. **Sade Profil Mimarisi (Resume/CV Butonunun Kaldırılması):** Kullanıcı direktifi doğrultusunda harici CV sekmesi veya indirme butonu arayüzden ve sözlük modelinden çıkarılmış; sade terminal biyografisi ve yetenek listesi korunmuştur.
5. **İngilizce Unvan ve Kimlik:** İngilizce içeriklerde ana unvan `Software Developer` olarak belirlenmiş; biyografi metinleri Java, Spring Boot ve Mikroservis odaklı kimliği uluslararası standartlarda yansıtacak şekilde yapılandırılmıştır.
