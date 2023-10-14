import copy from "fast-copy";
import * as React from "react";
import { filterKeys } from "../helper";

export type StyledButtonTheme = "light" | "normal";

export type StyledButtonProps = {
    type?: "1",
    themes?: StyledButtonTheme[]
}

const StyledButton = (props: React.PropsWithChildren<StyledButtonProps>): JSX.Element => {
    const child: React.ReactElement<HTMLElement> = React.Children.only(props.children) as React.ReactElement<HTMLElement>;

    const generateProps = (props: any, type?: string, themes?: StyledButtonTheme[]) => {
        const newProps: { [key: string]: any } = {
            ...copy(filterKeys(props, [ 'children' ])),
            children: props.children
        };
        const classNames: string[] = String.isNullOrWhitespace(props.className) ? [] : props.className.split(" ");
        classNames.push(`styled-button--${type ?? "1"}`);
        themes?.forEach(theme => {
            if (!String.isNullOrWhitespace(theme)) {
                classNames.push(theme);
            }
        });
        newProps.className = classNames.join(" ");

        return newProps;
    }

    return (
        <>
            { React.cloneElement(child, generateProps(child.props, props.type, props.themes)) }
        </>
    )
}

export const StyledButtonRow = (props: React.PropsWithChildren<{}>) => {
    return (
        <div className="button-row">
            { props.children }
        </div>
    )
}

export const StyledButtonRowItem = (props: React.PropsWithChildren<{}>) => {
    return (
        <div className="button-row--item">
            { props.children }
        </div>
    )
}

export default StyledButton;