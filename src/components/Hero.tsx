import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';
import './Hero.css';

const roles = ['Software Developer', 'Spring Boot', 'Microservices', 'Cyber Security'];

const codeSnippet = `public class Developer {

    private String name = "Mehmet Berk";
    private String role = "Software Dev";
    private String[] stack = {
        "Java", "Spring Boot",
        "Kafka", "Docker"
    };
    private boolean passionate = true;

    public String getMotto() {
        return "Clean, efficient"
             + " and secure code.";
    }
}`;

export default function Hero() {
    return (
        <section id="hero" className="hero">
            <div className="hero__grid container">
                <div className="hero__content">
                    <motion.div
                        className="hero__tag"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Terminal size={14} />
                        <span>~/Mehmet Berk Bozkurt</span>
                    </motion.div>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, type: 'spring', stiffness: 80, damping: 18 }}
                    >
                        Merhaba,
                        <br />
                        ben <span className="hero__title-accent">Mehmet Berk Bozkurt</span>
                    </motion.h1>

                    <motion.div
                        className="hero__role"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5 }}
                    >
                        <span className="hero__cursor">&gt;</span>
                        <TypingEffect words={roles} />
                    </motion.div>

                    <motion.p
                        className="hero__description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.5 }}
                    >
                        Java ekosistemi ve Mikroservis mimarisi üzerine güçlü bir temele
                        sahip yazılım geliştiriciyim. Temiz, verimli ve güvenli kod
                        yazmaya çalışıyorum.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95, duration: 0.5 }}
                    >
                        <a href="#projects" className="hero__btn hero__btn--primary">
                            Projelerimi Gör
                        </a>
                        <a href="#contact" className="hero__btn hero__btn--ghost">
                            İletişime Geç
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 60, damping: 15 }}
                >
                    <div className="hero__code-block">
                        <div className="hero__code-header">
                            <span className="hero__code-dot hero__code-dot--red" />
                            <span className="hero__code-dot hero__code-dot--yellow" />
                            <span className="hero__code-dot hero__code-dot--green" />
                            <span className="hero__code-filename">Developer.java</span>
                        </div>
                        <pre className="hero__code-content"><code>{codeSnippet}</code></pre>
                    </div>
                </motion.div>
            </div>

            <motion.a
                href="#about"
                className="hero__scroll"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                aria-label="Aşağı kaydır"
            >
                <ChevronDown size={24} />
            </motion.a>
        </section>
    );
}

function TypingEffect({ words }: { words: string[] }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        const speed = deleting ? 40 : 80;

        if (!deleting && text === current) {
            const pause = setTimeout(() => setDeleting(true), 1800);
            return () => clearTimeout(pause);
        }

        if (deleting && text === '') {
            setDeleting(false);
            setWordIndex(prev => (prev + 1) % words.length);
            return;
        }

        const timer = setTimeout(() => {
            setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
        }, speed);

        return () => clearTimeout(timer);
    }, [text, deleting, wordIndex, words]);

    return (
        <span className="hero__typed">
            {text}
            <span className="hero__blink">_</span>
        </span>
    );
}