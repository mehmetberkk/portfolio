---
description: "Task list for GitHub Carousel, Compact Cards, Language Resolution, TR/EN Multilingual Architecture and Resume/CV Removal"
---

# Tasks: GitHub Projects Showcase & TR/EN Multilingual Architecture

**Input**: Design documents from `specs/001-github-project-slider/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Completed Core Enhancements (US1, US2, US3)

**Status**: Completed and Verified

- [X] T001 [US1] Exclude `portfolio` source repository from dynamic project showcase in `src/hooks/useGithubRepos.ts`
- [X] T002 [US1] Remove description paragraph from `src/components/ProjectCard.tsx` and optimize styles in `src/components/ProjectCard.css`
- [X] T003 [US1] Remove description skeleton boxes from `src/components/ProjectSkeleton.tsx` for compact card parity
- [X] T004 [US1] Implement dynamic `languages_url` resolution and fallback mapping in `src/hooks/useGithubRepos.ts` to replace 'Diğer' with true languages (TSQL, Java, Python, TypeScript)
- [X] T005 [US2] Style rounded SVG icon buttons with `.sr-only` accessibility in `src/components/Projects.css` and `src/components/ui/carousel.tsx`

---

## Phase 2: User Story 4 - TR / EN Çoklu Dil Mimarisi (Priority: P1)

**Goal**: Implement zero-reload client-side translation using native `LanguageContext`, build `translations.ts` dictionary with professional English copy (Software Developer title, Java/Spring Boot/Microservices bio), add `TR | EN` toggle button to Header, and connect all portfolio components to the active language.

- [X] T006 [US4] Sitedeki mevcut tüm Türkçe portfolyo metinlerini çıkartıp `src/types/language.ts` ve `src/data/translations.ts` altında `tr` ve `en` sözlükleri olarak hazırla.
- [X] T007 [US4] `localStorage` kalıcılığı (`portfolio-language`) ve varsayılan dil fallback mantığı içeren `LanguageContext` ve `useLanguage` hook'unu `src/context/LanguageContext.tsx` dosyasında oluştur, `src/App.tsx` bileşenini `LanguageProvider` ile sarmala.
- [X] T008 [US4] Header bileşenine (`src/components/Navbar.tsx` ve `src/components/Navbar.css`) mevcut tema toggle butonunun yanında yer alacak, aktif dili görsel olarak vurgulayan `TR | EN` dil değiştirme butonunu ekle ve menü bağlantılarını aktif dile bağla.
- [X] T009 [P] [US4] `src/components/Hero.tsx` bileşenindeki unvanı ("Software Developer"), karşılama metinlerini, dönen rol etiketlerini ve aksiyon butonlarını `useLanguage` hook'una bağla.
- [X] T010 [P] [US4] `src/components/About.tsx` bileşenindeki terminal biyografi metinlerini ve yetenek kategorilerini `useLanguage` hook'una bağla.
- [X] T011 [P] [US4] `src/components/Projects.tsx` ve `src/components/ProjectCard.tsx` içerisindeki bölüm başlığı, alt başlık ve kart aksiyon butonlarını `useLanguage` hook'una bağla.
- [X] T012 [P] [US4] `src/components/Contact.tsx` ve `src/components/Footer.tsx` bileşenlerindeki e-posta başlığı, kopyalama geri bildirim metinleri ve telif yazılarını `useLanguage` hook'una bağla.
- [X] T013 Run static code analysis with `npm run lint` and verify TypeScript production build with `npm run build`.

---

## Phase 4: Resume / CV Butonunun Kaldırılması (Kullanıcı Talebi)

**Goal**: Kullanıcının "resume sekmesi istememiştim onu kaldır" direktifi doğrultusunda About bileşenindeki CV butonunu, ilgili CSS stillerini, sözlük tiplerini ve public PDF dosyalarını tamamen temizlemek.

- [X] T014 [US4] `src/components/About.tsx` bileşeninden `.about__cv-action` ve `FileText` içeren CV/Resume butonunu kaldır; `src/components/About.css` dosyasından `.about__cv-action` ve `.about__cv-btn` stillerini temizle.
- [X] T015 [US4] `src/types/language.ts` ve `src/data/translations.ts` dosyalarından `cvUrl` ve `viewCv` alanlarını kaldır.
- [X] T016 [US4] `public/cv-tr.pdf` ve `public/cv-en.pdf` geçici dosyalarını sil ve `npm run lint` ile `npm run build` komutlarını çalıştırarak eksiksiz derlendiğini doğrula.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Completed)**: Prerequisites for earlier features are fully met.
- **Phase 2 (User Story 4 - Localization)**:
  - T006 (`translations.ts` & types) must be completed first.
  - T007 (`LanguageContext.tsx` & `App.tsx`) depends on T006.
  - T008 (Navbar `TR | EN` toggle) depends on T007.
  - T009, T010, T011, T012 (Component UI integrations) can run in parallel [P] once T007 is ready.
- **Phase 3 (Quality & Verification)**: Runs after all tasks in Phase 2 are complete.

### Parallel Execution Opportunities
- Tasks T009, T010, T011, and T012 touch separate component files (`Hero.tsx`, `About.tsx`, `Projects.tsx`/`ProjectCard.tsx`, `Contact.tsx`/`Footer.tsx`) and can be developed in parallel.
