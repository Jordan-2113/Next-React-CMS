import { MessageFormatElement } from "react-intl";

declare type MessageIds = FormatjsIntl.Message extends {
    ids: string;
} ? FormatjsIntl.Message['ids'] : string;

type ConfigsType = {
    redirectLogin?: boolean,
    mappers?: {
        displayName?: (payload: any) => string | null
    }
    supportLocales?: { [ lang: string ]: string },
    i18n?: {
        [ lang: string ]: Record<MessageIds, string> | Record<MessageIds, MessageFormatElement[]>
    }
}

export const configs: ConfigsType = {
    mappers: {
        displayName: (payload: any) => payload?.username
    }
}