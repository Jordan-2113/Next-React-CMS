import * as React from "react";
import VariableScope from "./variable-scope";

export type LanguageOptionProps = {
    langs: { code: string, label: string }[]
}

const LanguageOption = (props: LanguageOptionProps): JSX.Element => {
    const { values: queryParams, pushOrReplaceValues } = React.useContext(VariableScope);

    return (
        <div className="inline-option">
            <div className="inline-option--controls">
                <div className="inline-option--control">
                    <div className="language-option">
                        { props.langs.map((lang, idx) => {
                            if ((queryParams?.lang === lang.code) || (idx === 0 && (queryParams == null || props.langs.filter(x => x.code === queryParams["lang"]).length === 0))) {
                                return (<button key={idx} type="button" className="language-option--el active">{ lang.label }</button>);
                            }
                            return (
                                <button type="button" className="language-option--el" key={idx} onClick={() => pushOrReplaceValues({ lang: lang.code })}>
                                    { lang.label }
                                </button>
                            );
                        }) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguageOption;