import { motion } from 'framer-motion';
import { useInView } from './useInView';
import './About.css';

const skills = [
    { category: 'Diller', items: ['Java', 'Python', 'SQL'] },
    { category: 'Frameworks', items: ['Spring Boot', 'Hibernate', 'Spring Security', 'Selenium'] },
    { category: 'Araçlar & Teknolojiler', items: ['Docker', 'Kafka', 'Eureka', 'Feign', 'Zookeeper', 'Git', 'PostgreSQL', 'MSSQL', 'Linux'] },
    { category: 'Mimari & Metodoloji', items: ['Microservices', 'Hexagonal Architecture', 'DDD', 'REST API', 'Agile/Scrum'] },
    { category: 'Güvenlik', items: ['OWASP Top 10', 'Penetration Testing', 'SQLi', 'XSS', 'IDOR'] },
];

export default function About() {
    const { ref, inView } = useInView(0.2);

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Hakkımda</h2>
                    <p className="section-subtitle">
                        Güvenli kod yazmaya çalışan bir yazılım geliştiricisiyim.
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
                                <span className="about__terminal-title">about.sh</span>
                            </div>
                            <div className="about__terminal-body">
                                <p><span className="about__prompt">$</span> cat hakkımda.txt</p>
                                <br />
                                <p>
                                    Ege Üniversitesi Bilgisayar Mühendisliği mezunuyum.
                                    Java ekosistemi ve Mikroservis mimarisi üzerine güçlü
                                    bir temele sahibim.
                                </p>
                                <br />
                                <p>
                                    Yaptığım Siber Güvenlik stajımda
                                    OWASP Top 10 metodolojisiyle web uygulamalarında
                                    penetrasyon testleri gerçekleştirdim. SQL Injection,
                                    XSS ve IDOR gibi kritik açıklıkları tespit ettim.
                                </p>
                                <br />
                                <p>
                                    Spring Boot ile güvenilir backend uygulamaları
                                    geliştirmeye, temiz, verimli ve güvenli kod
                                    yazmaya çalışıyorum.
                                </p>
                                <br />
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
                        {skills.map((group, gi) => (
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