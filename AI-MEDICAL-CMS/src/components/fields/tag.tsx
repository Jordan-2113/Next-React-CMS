import copy from "fast-copy";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { getRandString, mergeRefs } from "../../helper";
import { TabViewContext } from "../tab-view";

export type TagFieldProps = Field & React.InputHTMLAttributes<HTMLInputElement> & {
    values?: string[],
    maxTagsLength?: number,
    buildTagProps?(idx?: number): HTMLInputElement
}

const TagField = React.forwardRef((props: TagFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    const id = getRandString(10);
    const { unregister } = useFormContext() ?? {};
    const tabViewContext = React.useContext(TabViewContext);
    const [ tags, setTags ] = React.useState<{ id: string, name: string, submitted: boolean }[]>(props.values?.map(value => ({
        id: getRandString(8),
        name: value,
        submitted: true
    })) ?? []);
    const removedTags = React.useRef<{ id: string, name: string, submitted: boolean }[]>([]);
    const [ isExceeded, setIsExceeded ] = React.useState<boolean>(props.maxTagsLength != null && tags.length > props.maxTagsLength);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const filterProps = (props: any) => {
        const filter = new Set<keyof TagFieldProps>([ "errorMsg", "description", "buildTagProps" ]);
        const filteredProps: any = {};
        for (const key in props) {
            if (!filter.has(key as keyof TagFieldProps)) {
                filteredProps[key] = props[key];
            }
        }
        return filteredProps;
    }

    const handleTagClick = (e: React.FormEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        if (props.disabled) return;
        const tag = tags.find(x => x.id === id);
        setTags(tags.filter(x => x.id !== id));
        if (tag !== undefined) {
            removedTags.current.push(tag);
        }
        checkTagsIsExceedLimit();
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
            appendTag();
        }
    }

    const appendTag = () => {
        if (tags.filter(x => x.name === inputRef.current?.value).length === 0) {
            const newTags = copy(tags);
            newTags.push({
                id: getRandString(8),
                name: inputRef.current?.value ?? "",
                submitted: false
            })
            setTags(newTags);
        }
        if (inputRef.current != null) inputRef.current.value = "";
        checkTagsIsExceedLimit();
    }

    const checkTagsIsExceedLimit = () => {
        const isExceeded = props.maxTagsLength != null && tags.length > props.maxTagsLength;
        setIsExceeded(isExceeded);
    }
    
    const renderInput = (): JSX.Element => {
        return (
            <div className="field--container field--tags-el">
                <div className="field--tags-el-wrapper">
                    <div className="field--tags-el-values">
                        { tags.map((tag, idx) => {
                            return (
                                <div className="field--tags-el-tag" key={tag.id} { ...(tag.submitted ? {"data-submitted": true}: {}) }>
                                    { React.createElement("input", { type: "hidden", defaultValue: tag.name, ...(props.buildTagProps?.call(null, idx) || {}) }) }
                                    <div className="field--tags-el-tag-label">{ tag.name }</div>
                                    { (props.disabled == null || props.disabled === false) && <button
                                        className="field--tags-el-tag-close"
                                        type="button"
                                        onClick={e => handleTagClick(e, tag.id)}
                                    >✕</button> }
                                </div>
                            )
                        }) }
                    </div>
                    { !isExceeded && <input
                        { ...filterProps(props) }
                        ref={mergeRefs(inputRef, ref)}
                        id={id}
                        type="text"
                        onKeyPress={handleKeyPress}
                        onChange={() => {}}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            props.onBlur?.call(null, e);
                            e.target.value.length > 0 && appendTag();
                        }}
                    /> }
                </div>
                { tabViewContext?.activeLabel && <div className="field--label" field-label="">
                    { tabViewContext.activeLabel.name }
                </div> }
            </div>
        );
    }

    React.useEffect(() => {
        return () => unregister?.call(null, props.name);
    }, [ unregister, props.name ]);

    if (String.isNullOrWhitespace(props.title)) {
        return (
            <div className="field--tags">
                <label className="a11y" htmlFor={id}>{ props.placeholder }</label>
                { renderInput() }
                { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> }
            </div>
        )
    }
    return (
        <div className="field--tags">
            <div className="field--title">
                <label htmlFor={id}>{ props.title }</label>
            </div>
            { renderInput() }
            { !String.isNullOrWhitespace(props.errorMsg) && <span className="field--error" role="alert">{ props.errorMsg }</span> }
        </div>
    )
});

export default TagField;