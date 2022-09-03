import { useEffect, useRef, useState } from 'react';

const CKEditor = ({ setFieldValue, fieldName, value }) => {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        }
        setEditorLoaded(true)
    }, []);


    return (
        <>
            {editorLoaded ?
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setFieldValue(fieldName, data);
                    }}
                /> : <p>Not Loading Editor</p>}
        </>
    )
}

export default CKEditor;