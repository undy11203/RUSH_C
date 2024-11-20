"use client"
import { useEffect, useState } from "react";
import { mockModules } from "./ModulesMock";
import styles from './Catalog.module.css'; // Импортируем стили

interface Content {
    name_content: string;
    is_paid: boolean;
    id: string;
    numeric_in_module: number;
    cost: number;
}
  
  
interface Module {
    name_module: string;
    description_module: string;
    id: string;
    contents: Content[];
}

export default function Catalog() {
    const [modules, setModules] = useState<Module[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setModules(mockModules);
        // const response = await axios.get<Module[]>('YOUR_BACKEND_URL/catalog');
        // setModules(response.data);
      } catch (err) {
        console.log(err)
        setError('Ошибка при загрузке данных');
      }
    };

    fetchModules();
  }, []);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Каталог</h1>
            {modules.map((module) => (
                <div key={module.id} className={styles.moduleContainer}>
                <h2 className={styles.moduleTitle}>{module.name_module}</h2>
                <p className={styles.moduleDescription}>{module.description_module}</p>
                <ul className={styles.contentsList}>
                    {module.contents.map((content) => (
                    <li key={content.id} className={styles.contentItem}>
                        <p>{content.name_content}</p>
                        <p>Цена: {content.cost}</p>
                        <p>{content.is_paid ? 'Платный' : 'Бесплатный'}</p>
                    </li>
                    ))}
                </ul>
            </div>
        ))}
        </div>
    );
}