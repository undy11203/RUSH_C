"use client"
import '@toast-ui/editor/dist/toastui-editor.css';

import dynamic from 'next/dynamic';


const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), {
    ssr: false // Отключение серверного рендеринга для этого компонента
});

const colorPlugin = dynamic(() => import('@toast-ui/editor-plugin-color-syntax'), {
    ssr: false // Отключение серверного рендеринга для плагина
});

export default function Admin() {

    return (
        <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            plugins={[[colorPlugin]]}
        />
    )
}