'use client';
import { useState, type FormEvent } from 'react';
import { Camera, Phone } from '@phosphor-icons/react';
import { siWhatsapp, siTelegram } from 'simple-icons';
import { PHONE_HREF, PHONE_LABEL, WHATSAPP_URL } from '@/lib/gorynych-contacts';
import styles from './contact-section.module.css';
import story from './story.module.css';
export function ContactSection({ title = 'Покажите своё логово', context = '' }: {
    title?: string;
    context?: string;
}) {
    const [notice, setNotice] = useState(false);
    const [files, setFiles] = useState(0);
    function preview(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setNotice(true); }
    return <section id="contacts" className={`${story.chapter} ${styles.section}`}><div className={styles.intro}><p className={styles.hand}>Хорошие идеи начинаются с разговора</p><h2 className={story.title}>{title}</h2><p>Пришлите фото или расскажите, что задумали. Гор подскажет, с чего начать.</p></div><div className={styles.layout}><form onSubmit={preview} className={styles.form}><label className={styles.upload}><span aria-hidden="true"><Camera weight="regular"/></span><b>{files ? `Выбрано фото: ${files}` : 'Добавить фото'}</b><small>До 5 изображений</small><input type="file" accept="image/*" multiple aria-label="Фотографии помещения" onChange={event => setFiles(Math.min(5, event.target.files?.length ?? 0))}/></label><div className={styles.fields}><div className={styles.row}><label>Ваше имя<input name="name" autoComplete="name" placeholder="Как к вам обращаться?" required maxLength={80}/></label><label>Телефон<input name="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required minLength={6} maxLength={30}/></label></div><label>О вашем проекте<textarea name="message" defaultValue={context} placeholder="Например, ванная 4 м², плитка 60 × 60" rows={2} maxLength={1500}/></label><button className={story.button} type="submit">Обсудить проект <span aria-hidden="true">→</span></button><p className={styles.note} role="status">{notice ? 'Это макет формы. Отправку подключим при запуске сайта.' : 'Презентационный макет — данные никуда не отправляются.'}</p></div></form><aside className={styles.channels}><p>Или напишите напрямую</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span className={styles.whatsapp}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={siWhatsapp.path} fill="currentColor"/></svg></span><b>WhatsApp</b><span aria-hidden="true">↗</span></a><a href={PHONE_HREF}><span className={styles.phone}><Phone weight="fill" aria-hidden="true"/></span><b>{PHONE_LABEL}</b><span aria-hidden="true">↗</span></a><a href="#contacts" onClick={() => setNotice(true)}><span className={styles.telegram}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={siTelegram.path} fill="currentColor"/></svg></span><b>Telegram</b><span aria-hidden="true">↗</span></a><small>Санкт-Петербург<br />и Ленинградская область</small></aside></div></section>;
}
