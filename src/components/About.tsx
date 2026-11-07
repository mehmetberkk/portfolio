import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

export default function About() {
    const { ref, inView } = useInView(0.2);
    const { t } = useLanguage();

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">{t.about.title}</h2>
                    <p className="section-subtitle">
                        {t.about.subtitle}
                    </p>
                </motion.div>

                <div className="about__grid">
                    <motion.div
                        className="about__story"
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="about__terminal">
                            <div className="about__terminal-header">
                                <span className="about__terminal-dot" />
                                <span className="about__terminal-dot" />
                                <span className="about__terminal-dot" />
                                <span className="about__terminal-title">{t.about.terminalTitle}</span>
                            </div>
                            <div className="about__terminal-body">
                                <p><span className="about__prompt">$</span> {t.about.command}</p>
                                <br />
                                {t.about.bioParagraphs.map((para, idx) => (
                                    <div key={idx}>
                                        <p>{para}</p>
                                        <br />
                                    </div>
                                ))}
                                <p><span className="about__prompt">$</span> <span className="about__blink">_</span></p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about__skills"
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.35, duration: 0.6 }}
                    >
                        {t.about.skills.map((group, gi) => (
                            <motion.div
                                key={group.category}
                                className="about__skill-group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + gi * 0.1, duration: 0.5 }}
                            >
                                <h3 className="about__skill-category">{group.category}</h3>
                                <div className="about__skill-tags">
                                    {group.items.map(item => (
                                        <span key={item} className="about__skill-tag">{item}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}