"use client"
// import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mockData } from "./ContentMock";
import styles from "./Content.module.css"

interface Hips {
    name: string;
    description: string;
}


interface Task {
    name: string;
    description: string;
    text: string;
    code_template: string;
    id: string;
    hips: Hips[];
}
  
  
interface Content {
    id: unknown
    name: string;
    author: string;
    date_create: string; // Лучше форматировать в Date на UI
    text: string;
    task: Task[];
}

export default function Catalog() {
    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();
    const segments = pathname?.split('/');
    const lastSegment = segments?.pop();
    const id  = lastSegment;
    useEffect(() => {
        if (id) {
          const fetchContent = async () => {
            try {
                setContent(mockData)
            //   const response = await axios.get<Content>(`YOUR_BACKEND_URL/content/${id}`);
            //   setContent(response.data);
            } catch (err) {
                console.log(err)
              setError('Ошибка при загрузке контента');
            }
          };
    
          fetchContent();
        }
    }, [id]);

    // const replaceImageSources = (html: string, images: string[]): string => {
    //     // Создаем временный элемент, чтобы парсить HTML-строку
    //     const div = document.createElement('div');
    //     div.innerHTML = html;
    //     const imgElements = div.getElementsByTagName('img');

    //     Array.from(imgElements).forEach((img) => {
    //         const src = img.getAttribute('src');
    //         if (src && src.includes('?')) {
    //             // Заменяем src на первое изображение из массива
    //             img.setAttribute('src', images[0]); // или можно использовать подходящий индекс из images
    //         }
    //     });
    //     return div.innerHTML; // Возвращаем обновленный HTML
    // };
    // const renderedText = content ? replaceImageSources(content.text, content.image) : '';

    // const renderImage = (src: string) => {
    //     return src.startsWith('data:image/') ? src : `${src}`;
    // };

    if (error) return <div>{error}</div>;
    if (!content) return null; // Если data is null
    return (
        <div className={styles.container}>
            <h1>{content.name}</h1>
            <h2>Автор: {content.author}</h2>
            <p>Дата создания: {new Date(content.date_create).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: content.text }} className={styles.taskText} />
            <h3>Задачи:</h3>
            {content.task.length > 0 ? (
                <ul>
                    {content.task.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                            <h4>{task.name}</h4>
                            <p>{task.description}</p>
                            <div dangerouslySetInnerHTML={{ __html: task.text }} className={styles.taskText} />
                            <div className={styles.hipItem}>
                                {task.hips.map((hip, index) => (
                                    <div key={index}>
                                        <p>{hip.name}</p>
                                        <p>{hip.description}</p>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Задачи отсутствуют.</p>
            )}
        </div>
    )
}