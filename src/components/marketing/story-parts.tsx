import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { services, type Project, type Service } from '@/lib/marketing-content';
import styles from './story.module.css';
export function SectionHeading({ children, intro, href, linkLabel = 'Смотреть все', center = false }: {
    children: ReactNode;
    intro?: string;
    href?: string;
    linkLabel?: string;
    center?: boolean;
}) {
    return <header className={`${styles.head} ${center ? styles.center : ''}`}><div><h2 className={styles.title}>{children}</h2>{intro && <p className={styles.intro}>{intro}</p>}</div>{href && <Link className={styles.textLink} href={href}>{linkLabel} <span aria-hidden="true">→</span></Link>}</header>;
}
export function ProjectCard({ project }: {
    project: Project;
}) {
    return <Link href={`/raboty/${project.slug}`} className={styles.work}><div className={styles.photo}><Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 30vw" style={{ objectPosition: project.position }}/></div><div className={styles.workCopy}><h3>{project.title}</h3><p>{project.subtitle}</p><span className={styles.arrow} aria-hidden="true">→</span></div></Link>;
}
export function ServiceCard({ service, className = '', illustrated = false }: {
    service: Service;
    className?: string | undefined;
    illustrated?: boolean;
}) {
    const photo = <Image src={service.image} alt={service.alt} fill sizes={illustrated ? '(max-width: 480px) 60vw, (max-width: 1100px) 35vw, 16vw' : '(max-width: 1100px) 50vw, 22vw'} />;
    return <Link href={`/uslugi/${service.slug}`} className={`${styles.service} ${illustrated ? styles.paintedService : ''} ${className}`}><div className={styles.photo}>{illustrated ? <><div className={styles.archOpening}>{photo}</div><Image className={styles.paintedFrame} src="/images/service-arch-v1.webp" fill alt="" sizes="(max-width: 1100px) 50vw, 24vw" quality={90}/></> : <>{photo}<StoneArch /></>}</div><div className={styles.serviceCopy}><h3>{service.title}</h3><p>{service.excerpt}</p></div></Link>;
}
function StoneArch() {
    return <svg className={styles.arch} viewBox="0 0 300 300" preserveAspectRatio="none" aria-hidden="true"><path d="M13 300V153a137 137 0 0 1 274 0v147" fill="none" stroke="#6c5941" strokeWidth="26"/><path d="M13 300V153a137 137 0 0 1 274 0v147" fill="none" stroke="#c4ad88" strokeWidth="22"/><path d="M25 300V153a125 125 0 0 1 250 0v147" fill="none" stroke="#8e7452" strokeWidth="2"/><path d="M2 201h23m-23 49h23m-23 48h23m250-97h23m-23 49h23m-23 48h23M13 153h24m-13-53 21 9m11-54 17 18m29-51 9 23m41-31v24m52-16-9 23m44 10-17 18m43 27-21 9m34 44h-24" fill="none" stroke="#8f7755" strokeWidth="2"/><path d="M0 161h31v12H0m269-12h31v12h-31M0 287h31v13H0m269-13h31v13h-31" fill="#b29a73" stroke="#756247" strokeWidth="1"/></svg>;
}
export function ServicesPreview() {
    return <section className={styles.chapter} id="services"><SectionHeading href="/uslugi" linkLabel="Все услуги">Что я делаю</SectionHeading><div className={styles.services}>{services.slice(0, 4).map(service => <ServiceCard key={service.slug} service={service}/>)}</div></section>;
}
export function CraftFeature() {
    return <section className={styles.chapter} id="craft"><div className={styles.craft}><div className={`${styles.photo} ${styles.craftPhoto}`}><Image src="/images/craft-miter-v1.webp" alt="Иллюстрация точного внешнего угла из керамогранита с запилом под 45 градусов" fill sizes="(max-width: 700px) 100vw, 40vw"/><span className={styles.angle}>45°</span></div><div><p className={styles.eyebrow}>Красота в деталях</p><h2 className={styles.title}>Углы, которыми<br />можно <em>гордиться</em></h2><p className={styles.intro}>Внешний угол — маленькая деталь, которая меняет вид всей ванной. Аккуратный запил под 45° соединяет две плоскости без лишнего декора.</p><ul className={styles.checks}><li>Чистая геометрия</li><li>Продуманное направление рисунка</li><li>Подходящая обработка для вашей плитки</li></ul><Link className={styles.textLink} href="/uslugi/zapil-45">Рассмотреть детали <span aria-hidden="true">→</span></Link></div></div></section>;
}
export function MasterSection() {
    return <section className={styles.chapter} id="master"><div className={styles.master}><div className={styles.photo}><Image src="/images/portfolio/georgiy.jpg" alt="Георгий в мастерской у станка для резки плитки" fill sizes="(max-width: 700px) 100vw, 35vw"/></div><div className={styles.masterCopy}><p className={styles.hand}>Это я, Гор. Работаю лично.</p><h2 className={styles.title}>Три головы в сказке.<br /><em>Один мастер в жизни.</em></h2><p>Меня зовут Георгий, но друзьям и заказчикам привычнее Гор. Укладываю плитку в Санкт-Петербурге и области. Сам приезжаю на замер, обсуждаю раскладку и отвечаю за результат.</p><p>Люблю, когда всё сходится: рисунок, швы, углы и ожидания хозяев. Поэтому сначала разговариваем, потом продумываем детали, и только после этого начинается работа.</p><div className={styles.badges}><span><b>20 лет</b>опыта</span><span><b>Лично</b>на всех этапах</span><span><b>До 5 лет</b>гарантии</span></div></div></div></section>;
}
export function ReviewsSection() {
    const reviews = [{ name: 'Анна', text: 'Помог определиться с раскладкой и всё объяснил заранее. Особенно радуют аккуратные углы и ровные швы.', object: 'Ванная комната' }, { name: 'Алексей', text: 'Понравилось внимание к деталям. Обсудили все примыкания, и результат получился именно таким, как представляли.', object: 'Керамогранит' }, { name: 'Марина', text: 'Наша кухня стала гораздо уютнее. Красиво подобран рисунок плитки, аккуратно сделаны розетки и края.', object: 'Кухонный фартук' }];
    return <section className={styles.chapter} id="reviews"><SectionHeading center>Слова хозяев <em>уютных логов</em></SectionHeading><div className={styles.reviews}>{reviews.map(review => <figure className={styles.review} key={review.name}><div className={styles.stars} aria-label="5 из 5">★★★★★</div><blockquote>«{review.text}»</blockquote><figcaption><b>{review.name}</b>{review.object}</figcaption></figure>)}</div></section>;
}
