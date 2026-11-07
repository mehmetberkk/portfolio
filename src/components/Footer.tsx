import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span className="footer__logo">
                    <span className="footer__bracket">{'{'}</span>
                    MBERK
                    <span className="footer__bracket">{'}'}</span>
                </span>
                <p className="footer__copy">
                    © {year} Mehmet Berk Bozkurt. {t.footer.rights}
                </p>
            </div>
        </footer>
    );
}