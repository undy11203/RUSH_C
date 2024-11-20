// import * as fs from 'fs';

// const imagePath = './image.png';

// // Чтение файла и конвертация в Base64

// let base64Image

// fs.readFile(imagePath, (err, data) => {
//     if (err) {
//         console.error('Ошибка чтения файла:', err);
//         return;
//     }
//     base64Image = `data:image/png;base64,${data.toString('base64')}`;
// });

export const mockData = {
    id: 1,
    name: "Пример контента",
    author: "Автор Имя",
    date_create: "2023-11-19T12:00:00Z", // Пример даты в ISO формате
    text: "<p><img src=\"https://masterpiecer-images.s3.yandex.net/bebabc543a1e11ee96095a1112d6d6c5:upscaled\"/>Это <strong>пример</strong> текста с <em>HTML</em> контентом.</p>",
    task: [
        {
            name: "Задача 1",
            description: "Описание задачи 1",
            text: "<p>Текст задачи 1 с <strong>HTML</strong> элементами.</p>",
            code_template: "console.log('Hello, world!');",
            image: [], // Пустой массив изображений для задачи
            id: "task1",
            hips: [
                { name: "Хип 1", description: "Описание хипа 1" },
                { name: "Хип 2", description: "Описание хипа 2" }
            ]
        },
        {
            name: "Задача 2",
            description: "Описание задачи 2",
            text: "<p>Текст задачи 2.</p>",
            code_template: "alert('Hello!');",
            id: "task2",
            hips: []
        }
    ]
};
