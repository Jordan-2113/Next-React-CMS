import { IconName } from "@fortawesome/fontawesome-common-types";

interface MainPanelProps extends React.PropsWithChildren<{}> {
    displayName: (payload: any) => string | null;
    items: PanelNavigatorItem[];
    supportLocales?: { [ lang: string ]: string };
}

interface PanelNavigatorItem {
    title: string;
    icon?: IconName;
    path: string;
    matchExectPath?: boolean;
    children?: PanelNavigatorItem[];
    order?: number;
    shouldShowInNavigator: boolean
}