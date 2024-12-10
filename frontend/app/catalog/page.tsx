"use client"
import { useEffect, useState } from "react";
import { mockModules } from "./ModulesMock";

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
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

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
        <>
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, margin: '30px' }}>
                <div style={{
                      color: '#7D7B9B',
                      fontSize: '27px',
                      fontWeight: '600',
                      lineHeight: '32.68px',
                      textUnderlinePosition: 'from-font',
                      textDecorationSkipInk: 'none',
                  }}
                >
                  <h1>
                      Программа курса
                  </h1>
                </div>
                {modules.map((module, index) => (
                    <div 
                        style={{color: '#D9D9D9'}}
                        key={module.id} 
                        onMouseEnter={() => setSelectedModule(module)}
                        onMouseLeave={() => setSelectedModule(null)}
                    >
                        <h2 style={{
                            border: '1px solid #A49FEFB2',
                            padding: '10px',
                            backgroundColor: '#7D7B9B26',
                            fontWeight: 'bold',
                        }}>{index+1}. {module.name_module}</h2>
                        <ul style={{
                            listStyle: 'none',
                            padding: '0',
                            margin: '0'
                        }}>
                            {module.contents.map((content, indexContent) => (
                                <li key={content.id} style={{
                                    border: '1px solid #A49FEFB2',
                                    padding: '10px',
                                    marginTop: '-1px',
                                    marginLeft: '60px',
                                    backgroundColor: '#7D7B9B26',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                    }}>
                                        <span>{index+1}.{indexContent+1}. {content.name_content}</span>
                                        <span>Цена: {content.cost}</span>
                                    </div>
                                    <p>{content.is_paid ? 'Платный' : 'Бесплатный'}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div style={{ 
              flex: 1, 
              margin: '59px',
              minHeight: '200px',
              backgroundColor: '#7D7B9B26',
              border: '1px solid #7D7B9B80',
            }}>
                <h1 style={{textAlign: 'center', marginTop: '10px'}}>Описание модуля</h1>
                {selectedModule && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'flex-start',
                      padding: '20px',
                    }}>
                        <p>{selectedModule.description_module}</p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}