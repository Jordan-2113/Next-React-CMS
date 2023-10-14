interface RowProps<T> extends React.PropsWithChildren<{}> {
    title: string;
    description: string;
    actions?: BaseRowAction[];
    attributes?: { [key: string]: string },
    onClick?: (e: React.MouseEvent<T>) => void;
}

interface BaseRowAction {
    id?: string;
    label: string;
    requiredConfirm: boolean;
    absolutePath?: boolean;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

interface RowAction extends BaseRowAction {
    link: string;
}