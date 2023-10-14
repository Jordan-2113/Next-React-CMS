import * as React from "react";
import { getRandString, mergeRefs } from "../../helper";
import { useCKEditor, CKEditorEventAction } from "ckeditor4-react";
import { TabViewContext } from "../tab-view";
import AppContext from "../../contexts/app";
import { useIntl } from "react-intl";
import { useFormContext } from "react-hook-form";

export type EditorFieldProps = Field & Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "style" | "id"> & {
    //
}

const EditorField = React.forwardRef((props: EditorFieldProps, ref: React.ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    const intl = useIntl();
    const id = getRandString(10);
    const { unregister } = useFormContext() ?? {};
    const appContext = React.useContext(AppContext);
    const tabViewContext = React.useContext(TabViewContext);
    const [ element, setElement ] = React.useState<HTMLTextAreaElement | null>(null);
    const elRef = React.useRef<HTMLTextAreaElement | null>(null);
    const { error } = useCKEditor<string>({
        element,
        editorUrl: './ckeditor/ckeditor.js',
        config: {
            skin: appContext.theme === "light" ? "moono-lisa" : "moono-dark",
            contentsCss: [
                './css/editor.css?v='+Date.now()
            ],
            toolbar: [
                { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
                { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
                { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar', 'EmojiPanel' ] },
                { name: 'tools', items: [ 'Maximize' ] },
                { name: 'document', items: [ 'Source' ] },
                '/',
                { name: 'styles', items: [ 'Styles', 'Font', 'FontSize', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
                { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
            ]
        },
        subscribeTo: [ 'blur', 'change', 'focus' ],
        dispatchEvent: ({ type, payload }) => {
            if ( type === CKEditorEventAction.change ) {
                handleEditorChange(payload.editor);
            }
        }
    })

    const handleEditorChange = (editor: any) => {
        if (elRef.current != null) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
            nativeInputValueSetter?.call(elRef.current, editor.getData());
            const ev = document.createEvent("Event");
            ev.initEvent("change", true, true);
            elRef.current.dispatchEvent(ev);
        }
    }

    const filterProps = (props: any) => {
        const filter = new Set<keyof (EditorFieldProps & React.InputHTMLAttributes<HTMLTextAreaElement>)>([ "errorMsg", "description", "style", "id" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof EditorFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }
    
    const renderInput = () => {
        const filteredProps = filterProps(props);
        return (
            <div className="field--container field--editor-el">
                { error ? <div>{ intl.formatMessage({ id: "field-editor.error", defaultMessage: "Error while loading the editor." }) }</div> : <textarea
                    { ...filteredProps }
                    id={id}
                    ref={mergeRefs(setElement, elRef, ref)}
                    aria-invalid={!!!props.errorMsg ? "false" : "true"}
                    aria-errormessage={`${id}-error-msg`}
                /> }
                { tabViewContext?.activeLabel && (error === false || error == null) && <div className="field--label" field-label="">
                    { tabViewContext.activeLabel.name }
                </div> }
            </div>
        )
    }

    React.useEffect(() => {
        if (element != null) {
            // turn off spellCheck may prevented the large amount of text will crash the browser
            element.spellcheck = false;
        }
        return () => unregister?.call(null, props.name);
    }, [ element ,unregister, props.name ]);

    return (
        <div className="field--editor">
            <div className="field--title">
                <label htmlFor={id}>{ props.title }</label>
            </div>
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" id={`${id}-error-msg`} role="alert">{ props.errorMsg }</span> }
        </div>
    )
})

export default EditorField;