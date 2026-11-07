# Implementation Plan: Favicon Logo & LinkedIn Integration

**Branch**: `002-logo-and-social-links` | **Date**: 2026-11-06 | **Spec**: [spec.md](./spec.md)

## Summary

Tarayıcı sekmesindeki varsayılan mor yıldırımlı favicon ikonunu kullanıcının `public/` altına ekleyeceği özel logo ile güncellemek; `src/components/Contact.tsx` içerisine GitHub'ın hemen yanına LinkedIn bağlantısını (`Linkedin` ikonu ile) eklemek.

## Technical Context

**Language/Version**: TypeScript 5.8+, React 19.1+  
**Icons**: `lucide-react` (`Linkedin`, `Github`)  
**Assets**: `public/` dizini ve `index.html`  
**Target URL**: `https://www.linkedin.com/in/mehmet-berk-bozkurt`  

## Constitution Check

| Anayasa İlkesi | Durum | Uyum Analizi |
| :--- | :---: | :--- |
| **I. Tasarım Dili ve Arayüz Bütünlüğü** | ✅ GEÇTİ | LinkedIn ikonu Contact alanındaki GitHub/LeetCode butonlarıyla %100 aynı görsel standartta olacaktır. |
| **II. Sıfır Statik/Hardcoded Veri (Dinamiklik)** | ✅ GEÇTİ | Sosyal bağlantılar array yapılandırması üzerinden yönetilir. |
| **III. Performans ve Güvenlik** | ✅ GEÇTİ | Dış bağlantıda `target="_blank"` ve `rel="noopener noreferrer"` kullanılır. |
| **IV. Duyarlı Düzen** | ✅ GEÇTİ | 3 adet sosyal kart (`GitHub`, `LinkedIn`, `LeetCode`) mobilde ve masaüstünde esnek wrap ile hizalanır. |

## Project Structure

```text
public/
├── favicon.svg (veya logo.svg/png)  # Kullanıcının ekleyeceği yeni logo
index.html                           # Favicon referansı
src/
└── components/
    └── Contact.tsx                  # LinkedIn ikonu ve bağlantısı
```
