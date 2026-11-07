import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useInView } from './useInView';
import { useLanguage } from '../context/LanguageContext';
import LeetCodeIcon from '../icons/LeetCodeIcon';
import './Contact.css';

const EMAIL = 'mehmetberkbozkurt18@gmail.com';

const socials = [
    { label: 'GitHub', href: 'https://github.com/mehmetberkk', icon: Github },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehmet-berk-bozkurt', icon: Linkedin },
    { label: 'LeetCode', href: 'https://leetcode.com/u/mberkkk', icon: LeetCodeIcon },
];

export default function Contact() {
    const { ref, inView } = useInView(0.2);
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section id="contact" className="contact section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">{t.contact.title}</h2>
                </motion.div>

                <motion.div
                    className="contact__content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="contact__email-block">
                        <div className="contact__email-label">
                            <Mail size={18} />
                            <span>{t.contact.emailLabel}</span>
                        </div>
                        <div className="contact__email-row">
                            <a href={`mailto:${EMAIL}`} className="contact__email-address">
                                {EMAIL}
                            </a>
                            <button
                                className="contact__copy-btn"
                                onClick={copyEmail}
                                aria-label={t.contact.copyAria}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                <span>{copied ? t.contact.copied : t.contact.copy}</span>
                            </button>
                        </div>
                    </div>

                    <div className="contact__socials">
                        {socials.map((social, i) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact__social-link"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -3 }}
                            >
                                <social.icon size={22} />
                                <span>{social.label}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
