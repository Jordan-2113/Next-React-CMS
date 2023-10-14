import { TextFieldProps } from "../components/fields/text"
import { TextareaFieldProps } from "../components/fields/textarea"

type TextFieldTemplate = {
    kind: "text-field",
    config: TextFieldProps
}

type TextareaFieldTemplate = {
    kind: "textarea-field",
    config: TextareaFieldProps
}

export type Template = {
    items: (TextFieldTemplate | TextareaFieldTemplate)[]
}