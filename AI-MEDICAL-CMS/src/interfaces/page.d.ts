import { IconName } from "@fortawesome/fontawesome-common-types";
import Promise from "bluebird";

type NavigatorItem = {
    id: string;
    title: string;
    icon?: IconName;
    parent?: string;
    order?: number;
    matchExectPath?: boolean;
    shouldShowInNavigator?: (authPayload: any) => boolean;
}

type PageComponentProps = {
    initiator?: (args: { params: { [key: string]: string }, query: { [key: string]: string | string[] } }) => Promise<{ props: any }>;
    captureQueryParams?: string[];
}

declare interface Page {
    compontent: React.FC<any> & PageComponentProps;
    path: string;
    navigator?: NavigatorItem;
    shouldShowPanel: boolean;
    requiredLogin: boolean;
}

type PageModule = {
    default: React.FC<any> & PageComponentProps;
    path: string;
    navigator?: NavigatorItem;
    shouldShowPanel: boolean;
    requiredLogin: boolean;
}