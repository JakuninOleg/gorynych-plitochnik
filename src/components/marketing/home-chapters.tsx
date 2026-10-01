import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/lib/marketing-content'
import { BrandCrown } from './brand-crown'
import { SectionHeading, ServiceCard } from './story-parts'
import { StoryChapter } from './story-chapter'
import story from './story.module.css'
import styles from './home-chapters.module.css'

export function HomeCraft() {
  return <StoryChapter id="craft" theme="craft">
    <div className={styles.craft}>
      <div className={styles.craftIllustration}>
        <Image src="/images/craft-dragon-v1.webp" alt="Трёхголовый Гор аккуратно обрабатывает край плитки у верстака; перед ним образец угла с запилом под 45 градусов" fill sizes="(max-width:700px) 92vw, 34vw" quality={90} />
      </div>
      <div className={styles.craftCopy}>
        <p className={story.eyebrow}>Красота в деталях · запил 45°</p>
        <h2 className={story.title}>Углы, которыми<br />можно <em>гордиться</em></h2>
        <p className={styles.lead}>Когда две плитки встречаются, важен каждый миллиметр. Аккуратный запил собирает угол в одну чистую линию.</p>
        <ul className={styles.craftChecks}><li>Рисунок продолжается через угол</li><li>Чистый стык без лишнего декора</li><li>Красивые ниши, короба и примыкания</li></ul>
        <div className={styles.detailCard}>
          <div className={styles.detailPhoto}><Image src="/images/craft-miter-v1.webp" alt="Крупный план тонкого внешнего угла керамогранита" fill sizes="(max-width:700px) 35vw, 180px" /></div>
          <div><span className={styles.angle}>45°</span><p>Маленькая деталь.<br />Большая разница.</p><Link className={story.textLink} href="/uslugi/zapil-45">Рассмотреть запил →</Link></div>
        </div>
      </div>
    </div>
  </StoryChapter>
}

export function HomeServices() {
  return <StoryChapter id="services" theme="services">
    <SectionHeading center intro="От маленького фартука до целого уютного логова.">Что я <em>делаю</em></SectionHeading>
    <div className={styles.catalog}>{services.map(service => <ServiceCard illustrated className={styles.serviceCard} service={service} key={service.slug} />)}</div>
    <Link className={styles.catalogLink} href="/uslugi">Открыть всю витрину услуг <span aria-hidden="true">→</span></Link>
  </StoryChapter>
}

export function HomeMaster() {
  return <StoryChapter id="master" theme="master">
    <div className={styles.master}>
      <figure className={styles.portrait}>
        <div className={styles.masterPhoto}><Image src="/images/portfolio/georgiy.jpg" alt="Георгий в своей мастерской у станка для плитки" fill sizes="(max-width:700px) 90vw, 30vw" quality={90} /></div>
        <figcaption>Это я, Гор. Работаю лично.</figcaption>
        <span className={styles.seal} aria-hidden="true"><BrandCrown /></span>
      </figure>
      <div className={styles.masterCopy}>
        <p className={story.eyebrow}>Знакомьтесь, ваш мастер</p>
        <h2 className={story.title}>Три головы в сказке.<br /><em>Один мастер в жизни.</em></h2>
        <p>Меня зовут Георгий. Для друзей и заказчиков — Гор. Укладываю плитку в Санкт-Петербурге и области: сам приезжаю на замер, продумываю раскладку и отвечаю за результат.</p>
        <p>Люблю, когда сходится всё: рисунок, швы, углы и ваши ожидания. Поэтому сначала разговариваем и разбираемся в деталях. А потом превращаем ваше логово в уютный дом.</p>
        <div className={styles.credentials}><span><b>20 лет</b>в ремесле</span><span><b>Лично</b>на всех этапах</span><span><b>До 5 лет</b>гарантии</span></div>
        <p className={styles.signature}>Ровно. Надёжно. Надолго.<span>Гор</span></p>
      </div>
    </div>
  </StoryChapter>
}

const reviews = [
  { name:'Анна', object:'Ванная комната', text:'Помог определиться с раскладкой и всё объяснил заранее. Особенно радуют аккуратные углы и ровные швы.' },
  { name:'Алексей', object:'Керамогранит', text:'Понравилось внимание к деталям. Обсудили все примыкания, и результат получился именно таким, как представляли.' },
  { name:'Марина', object:'Кухонный фартук', text:'Наша кухня стала гораздо уютнее. Красиво подобран рисунок плитки, аккуратно сделаны розетки и края.' },
]

export function HomeReviews() {
  return <StoryChapter id="reviews" theme="reviews">
    <SectionHeading center intro="Самые приятные слова — после последней уложенной плитки.">Письма из <em>уютных логов</em></SectionHeading>
    <div className={styles.letters}>{reviews.map(review => <figure className={styles.letter} key={review.name}>
      <div className={styles.stars} aria-label="5 из 5">★★★★★</div>
      <blockquote>«{review.text}»</blockquote>
      <figcaption><div><b>{review.name}</b><span>{review.object}</span></div><span className={styles.letterSeal} aria-hidden="true">Г</span></figcaption>
    </figure>)}</div>
    <p className={styles.reviewNote}>Хорошая плитка делает счастливее.</p>
  </StoryChapter>
}
