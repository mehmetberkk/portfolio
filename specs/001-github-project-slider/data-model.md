# Data Model: GitHub Projects Shadcn Carousel

**Feature**: `specs/001-github-project-slider`  
**Date**: 2026-11-06 (Updated: Accurate Repo Language Resolution)  
**Status**: Completed

---

## 1. Varlıklar ve Tipler (Entities & Types)

### 1.1 GitHubRepo (Raw API Response Model)
```typescript
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}
```

### 1.2 Transformed Project Model (UI Model)
```typescript
export interface ProjectItem {
  id: number;
  name: string;
  description?: string; // UI kartlarında gösterilmez (kompakt görünüm)
  language: string;     // TSQL, Java, Python, TypeScript vb. ("Diğer" yerine gerçek dil)
  topics: string[];
  stars: number;
  forks: number;
  githubUrl: string;
  demoUrl: string | null;
  isFork: boolean;
  pushedAt: string;
}
```

### 1.3 Caching Model
```typescript
export interface CachedProjects {
  data: ProjectItem[];
  timestamp: number;
}
```

---

## 2. Filtreleme ve Dil Çözümleme Kuralları

| Durum | Kural | Sonuç |
| :--- | :--- | :--- |
| `repo.archived === true` | Filtrelenir | Listeden çıkarılır |
| `repo.name.toLowerCase() === 'mehmetberkk'` | Filtrelenir | Profil README reposu, listeden çıkarılır |
| `repo.name.toLowerCase() === 'portfolio'` | Filtrelenir | Portfolyo kaynak kodu reposu, listeden çıkarılır |
| `repo.fork === true` | Kabul edilir | Listede tutulur ve sergilenir |
| `repo.language === null` | `languages_url` & fallback | TSQL, Java, Python vb. gerçek dil çözümlenir ("Diğer" kaldırılır) |
| Kart Görünümü | Açıklama kaldırıldı | Başlık, gerçek dil rozeti, etiketler, istatistikler ve butonlar |
| Sıralama | `pushed_at` | En yeni push en başta yer alır |

---

## 3. Çoklu Dil ve Çeviri Veri Modeli (Localization Model)

### 3.1 Dil Tipleri
```typescript
export type Language = 'tr' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}
```

### 3.2 Translations Arayüzü
```typescript
export interface Translations {
  nav: {
    links: { label: string; href: string }[];
    langAria: string;
    themeAria: string;
  };
  hero: {
    tag: string;
    greeting: string;
    intro: string;
    name: string;
    roles: string[];
    description: string;
    viewProjects: string;
    contactMe: string;
    motto: string;
  };
  about: {
    title: string;
    subtitle: string;
    terminalTitle: string;
    command: string;
    bioParagraphs: string[];
    skills: { category: string; items: string[] }[];
  };
  projects: {
    title: string;
    subtitle: string;
    sourceCode: string;
    liveDemo: string;
    prevSlideAria: string;
    nextSlideAria: string;
    errorTitle: string;
    errorCta: string;
  };
  contact: {
    title: string;
    emailLabel: string;
    copy: string;
    copied: string;
  };
  footer: {
    rights: string;
  };
}
```

