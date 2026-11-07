import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
            <div className="navbar__inner container">
                <a href="#hero" className="navbar__logo">
                    <span className="navbar__logo-bracket">{'{'}</span>
                    <span className="navbar__logo-text">MBERK</span>
                    <span className="navbar__logo-bracket">{'}'}</span>
                </a>

                <div className="navbar__right">
                    <ul className="navbar__links">
                        {t.nav.links.map(link => (
                            <li key={link.href}>
                                <a href={link.href} className="navbar__link">{link.label}</a>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="navbar__lang-toggle"
                        onClick={toggleLanguage}
                        aria-label={t.nav.langAria}
                        title={t.nav.langAria}
                    >
                        <span className={`navbar__lang-code ${language === 'tr' ? 'navbar__lang-code--active' : ''}`}>TR</span>
                        <span className="navbar__lang-separator">|</span>
                        <span className={`navbar__lang-code ${language === 'en' ? 'navbar__lang-code--active' : ''}`}>EN</span>
                    </button>

                    <button
                        className="navbar__theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? t.nav.themeAriaDark : t.nav.themeAriaLight}
                    >
                        <AnimatePresence mode="wait">
                            {theme === 'dark' ? (
                                <motion.span
                                    key="sun"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Sun size={20} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="moon"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Moon size={20} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        className="navbar__hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={t.nav.menuAria}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="navbar__mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {t.nav.links.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="navbar__mobile-link"
                                onClick={() => setMobileOpen(false)}
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
