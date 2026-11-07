export type Language = 'tr' | 'en';

export interface Translations {
  nav: {
    links: { label: string; href: string }[];
    langAria: string;
    themeAriaDark: string;
    themeAriaLight: string;
    menuAria: string;
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
    codeFilename: string;
    codeRole: string;
    codeMotto: string;
    scrollAria: string;
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
    copyAria: string;
  };
  footer: {
    rights: string;
  };
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}
