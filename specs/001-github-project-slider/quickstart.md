# Quickstart & Verification Guide: GitHub Projects Shadcn Carousel

**Feature**: `specs/001-github-project-slider`  
**Date**: 2026-11-06 (Updated: Accurate Repo Language Resolution)  
**Status**: Ready

---

## 1. Hazırlık ve Kurulum

Gerekli bağımlılıkların yüklendiğinden emin olun:
```bash
npm install
```

---

## 2. Geliştirme Sunucusunu Başlatma

```bash
npm run dev
```

---

## 3. Doğrulama Senaryoları (Verification Scenarios)

### Senaryo 1: Gerçek Dil Rozetleri Doğrulaması (3, 4, 5, 6. Projeler)
1. Tarayıcıda `#projects` alanına kaydırın.
2. Karuseldeki projeleri inceleyin:
   - `Rapid-Flashcard-Stream`: `TypeScript`
   - `rent-a-car-b2b`: `Java`
   - `Country-Transportation-Database`: `TSQL` ("Diğer" yerine)
   - `appointment-system`: `Java` ("Diğer" yerine)
   - `e-commerce`: `Java` ("Diğer" yerine)
   - `trendyol-review-bot`: `Python` ("Diğer" yerine)
3. Hiçbir projede "Diğer" etiketinin kalmadığını doğrulayın.

### Senaryo 2: Masaüstü 3'lü Görünüm ve Shadcn Carousel Sürükleme
1. Ekran genişliğini `>= 1024px` (örn. 1280px) yapın.
2. Görünür alanda tam **3 adet kart** (`lg:basis-1/3`) olduğunu ve kart aralıklarının sıkı ve simetrik (`-ml-1`, `pl-1`, `p-1`) olduğunu doğrulayın.
3. Fare ile tutup sürükleyerek (mouse drag) kartların akıcı bir şekilde bir sonraki gruba kaydığını test edin.
4. Sağ/sol ok butonlarına tıklayarak geçişlerin sorunsuz çalıştığını kontrol edin.

### Senaryo 3: Tablet (2 Kart) ve Mobil (1 Kart) Görünümü
1. Ekran genişliğini `640px - 1023px` aralığına getirin; yan yana tam **2 kart** (`sm:basis-1/2`) görüntülendiğini doğrulayın.
2. Ekran genişliğini `< 640px` (mobil) boyutuna getirin; ekranda tek kart (`basis-full`) odaklandığını ve dokunmatik parmak sürüklemesinin (touch swipe) çalıştığını test edin.

### Senaryo 4: Kompakt Kartlar ve İskelet Uyumu
1. Kartlarda açıklama (description) alanının yer almadığını, doğrudan başlık, dil rozeti, etiketler ve butonların yer aldığını doğrulayın.
2. Yükleme iskeletinin kartlarla simetrik boyutta olduğunu teyit edin.

### Senaryo 5: Header'dan TR | EN Dil Değiştirme (Zero-Reload)
1. Header'daki `TR | EN` butonuna tıklayın.
2. Sayfa yeniden yüklenmeden (zero reload) tüm menülerin, Hero unvanının ("Software Developer"), biyografinin ve butonların anında İngilizceye dönüştüğünü doğrulayın.
3. Tekrar tıklayarak kusursuz şekilde Türkçeye geri döndüğünü kontrol edin.

### Senaryo 6: Dil Kalıcılığı ve Sade Arayüz Doğrulaması
1. Dil İngilizce iken sayfayı yenileyin (`F5`); sayfanın İngilizce olarak açıldığını ve `localStorage` değerinin korunduğunu teyit edin.
2. About veya diğer bölümlerde istenmeyen herhangi bir Resume/CV butonu veya sekmesinin yer almadığını doğrulayın.

---

## 4. Statik Kod Analizi ve Tip Doğrulaması

```bash
npm run lint
npm run build
```
