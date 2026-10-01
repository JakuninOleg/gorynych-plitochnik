'use client';
import { useId, useState } from 'react';
import { SectionHeading } from './story-parts';
import { StoryChapter } from './story-chapter';
import { RoomIllustration } from './room-illustration';
import story from './story.module.css';
import styles from './tile-calculator.module.css';
const palettes = [{ name: 'Камень', color: '#b1aa99', light: '#d5cebc' }, { name: 'Песок', color: '#bda77f', light: '#e6d5b7' }, { name: 'Синий', color: '#48768a', light: '#aac1c8' }, { name: 'Мрамор', color: '#e3e0d5', light: '#faf5e6' }] as const;
const formats = [{ label: '30 × 60', w: 60, h: 30 }, { label: '60 × 60', w: 60, h: 60 }, { label: '20 × 20', w: 20, h: 20 }] as const;
export function TileCalculator() {
    const id = useId().replace(/[^a-zA-Z0-9]/g, '');
    const [roomType, setRoomType] = useState<'bathroom' | 'kitchen' | 'hall'>('bathroom');
    const [length, setLength] = useState('2.4');
    const [width, setWidth] = useState('1.8');
    const [height, setHeight] = useState('2.6');
    const [format, setFormat] = useState(0);
    const [palette, setPalette] = useState(2);
    const [surface, setSurface] = useState<'walls' | 'floor'>('walls');
    const [offset, setOffset] = useState(false);
    const [rotate, setRotate] = useState(false);
    const [grout, setGrout] = useState('#e7ddc4');
    const [preview, setPreview] = useState(false);
    const roomLength = Math.min(8, Math.max(1, Number(length) || 2.4));
    const roomWidth = Math.min(8, Math.max(1, Number(width) || 1.8));
    const roomHeight = Math.min(4, Math.max(2, Number(height) || 2.6));
    const area = surface === 'floor' ? roomLength * roomWidth : 2 * (roomLength + roomWidth) * roomHeight - 1.8;
    const amount = Math.max(0, area);
    const tile = formats[format] ?? formats[0];
    const tw = (rotate ? tile.h : tile.w) * .8;
    const th = (rotate ? tile.w : tile.h) * .8;
    const col = palettes[palette] ?? palettes[0];
    function chooseRoom(room: 'bathroom' | 'kitchen' | 'hall') {
        setRoomType(room);
        setLength(room === 'bathroom' ? '2.4' : room === 'kitchen' ? '3.2' : '3.8');
        setWidth(room === 'bathroom' ? '1.8' : room === 'kitchen' ? '2.8' : '1.5');
        setSurface(room === 'hall' ? 'floor' : 'walls');
    }
    return <StoryChapter id="calculator" theme="calculator"><SectionHeading center intro="Выберите плитку и раскладку — посмотрите, как меняется ваше будущее логово.">Посмотрите раскладку <em>до ремонта</em></SectionHeading><div className={styles.shell}><div className={styles.visual}><span className={styles.sketch}>Мастерская раскладок</span><RoomIllustration className={styles.room} id={id} room={roomType} tileLabel={tile.label} tileWidth={tw} tileHeight={th} palette={col} grout={grout} surface={surface} offset={offset} length={roomLength} width={roomWidth} /><p className={styles.legend}>Живая схема помещения, а не фотография объекта</p></div><div className={styles.controls}><fieldset><legend>Выберите помещение</legend><div className={styles.choices}>{([{ value: "bathroom", label: "Ванная" }, { value: "kitchen", label: "Кухня" }, { value: "hall", label: "Прихожая" }] as const).map(room => <button key={room.value} type="button" aria-pressed={roomType === room.value} onClick={() => chooseRoom(room.value)}>{room.label}</button>)}</div></fieldset><fieldset><legend>Размер вашего логова</legend><div className={styles.dimensions}>{[{ label: 'Длина', value: length, setter: setLength, min: 1, max: 8 }, { label: 'Ширина', value: width, setter: setWidth, min: 1, max: 8 }, { label: 'Высота', value: height, setter: setHeight, min: 2, max: 4 }].map(field => <label key={field.label}>{field.label}<span><input aria-label={`${field.label} помещения в метрах`} type="number" value={field.value} min={field.min} max={field.max} step="0.1" onChange={event => field.setter(event.target.value)} onBlur={event => field.setter(String(Math.min(field.max, Math.max(field.min, Number(event.target.value) || field.min))))}/> м</span></label>)}</div></fieldset><fieldset><legend>Где укладываем</legend><div className={styles.choices}><button type="button" aria-pressed={surface === 'walls'} onClick={() => setSurface('walls')}>Стены</button><button type="button" aria-pressed={surface === 'floor'} onClick={() => setSurface('floor')}>Пол</button></div></fieldset><fieldset><legend>Формат плитки, см</legend><div className={`${styles.choices} ${styles.formats}`}>{formats.map((item, index) => <button type="button" aria-pressed={format === index} onClick={() => setFormat(index)} key={item.label}>{item.label}</button>)}</div></fieldset><fieldset><legend>Фактура и цвет</legend><div className={styles.swatches}>{palettes.map((item, index) => <button style={{ background: item.color }} aria-label={item.name} aria-pressed={palette === index} onClick={() => setPalette(index)} key={item.name} title={item.name} type="button"><span>{item.name}</span></button>)}</div></fieldset><fieldset><legend>Раскладка</legend><div className={styles.choices}><button type="button" aria-pressed={!offset} onClick={() => setOffset(false)}>Прямо</button><button type="button" aria-pressed={offset} onClick={() => setOffset(true)}>Со смещением</button><button type="button" aria-pressed={rotate} onClick={() => setRotate(value => !value)}>↻ 90°</button></div></fieldset><label className={styles.grout}>Цвет шва<input type="color" value={grout} onChange={event => setGrout(event.target.value)}/></label></div></div><div className={styles.bottom}><div aria-live="polite"><span>Площадь облицовки</span><strong>≈ {amount.toFixed(1).replace('.', ',')} м²</strong><small>Запас и подрезку уточним по раскладке</small></div><div className={styles.estimate}><span>Примерный ориентир</span><b>от {Math.round(amount * 1600).toLocaleString('ru-RU')} ₽</b><small>Демонстрационный расчёт, не смета</small></div><button className={story.button} type="button" onClick={() => setPreview(true)}>Отправить раскладку Гору <span aria-hidden="true">→</span></button></div>{preview && <p role="status" className={story.note}>Раскладка готова. Отправка в этом макете пока не подключена.</p>}</StoryChapter>;
}
