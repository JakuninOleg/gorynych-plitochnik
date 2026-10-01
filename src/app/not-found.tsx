import Link from 'next/link';
import { MarketingShell } from '@/components/marketing/marketing-shell';
import story from '@/components/marketing/story.module.css';
export default function NotFound() { return <MarketingShell><section className={story.chapter}><p className={story.eyebrow}>404</p><h1 className={story.title}>В этом логове пока пусто</h1><p className={story.intro}>Страница не найдена. Вернёмся туда, где есть плитка, работы и хорошие идеи.</p><div className={story.actions}><Link href="/" className={story.button}>На главную →</Link><Link href="/uslugi" className={story.secondary}>Посмотреть услуги</Link></div></section></MarketingShell>; }
