/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import MaskedInput from 'react-text-mask'
import { getRandString, mergeRefs } from '../../helper'
import { TabViewContext } from '../tab-view'

export type TextFieldProps = Field &
    React.InputHTMLAttributes<HTMLInputElement> & {
        mask?: Array<string | RegExp>
        guide?: boolean
        placeholderChar?: string
    }

const TextField = React.forwardRef(
    (
        props: TextFieldProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ): JSX.Element => {
        const id = getRandString(10)
        const { unregister } = useFormContext() ?? {}
        const tabViewContext = React.useContext(TabViewContext)
        const [errorUrlMessage, setErrorUrlMessage] = React.useState('')
        const filterProps = (props: any) => {
            const filter = new Set<keyof TextFieldProps>([
                'errorMsg',
                'mask',
                'description'
            ])
            const filteredProps: any = {}
            for (const key in props) {
                if (!filter.has(key as keyof TextFieldProps)) {
                    filteredProps[key] = props[key]
                }
            }
            return filteredProps
        }
        const renderInputUrl = (): JSX.Element => {
            const filteredProps = filterProps(props)
            if (String.isNullOrWhitespace(filteredProps.className)) {
                filteredProps.className = 'field--text-input'
            } else {
                filteredProps.className = [
                    ...filteredProps.className.split(' '),
                    'field--text-input'
                ].join(' ')
            }
            return (
                <div className='field--container'>
                    {Array.isNullOrEmpty(props.mask) ? (
                        React.createElement('input', {
                            ...filteredProps,
                            ref: mergeRefs(ref),
                            id,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value
                                const onlyNumbers = /^[A-Za-z0-9-\u4e00-\u9fa5]*$/.test(value) // Regular expression to allow only alphabets, numbers, "-", chinese
                                if (!onlyNumbers) {
                                    setErrorUrlMessage('此欄位只能包含字母、數字和“-”。');
                                    e.target.setCustomValidity('此欄位只能包含字母、數字和“-”。')
                                } else {
                                    setErrorUrlMessage('');
                                    e.target.setCustomValidity('')
                                    props.onChange?.call(null, e)
                                }
                            },
                            'aria-invalid': !!!props.errorMsg ? 'false' : 'true',
                            'aria-errormessage': `${id}-error-msg`
                        })
                    ) : (
                        <MaskedInput
                            mask={props.mask ?? []}
                            guide={props.guide}
                            placeholderChar={props.placeholderChar}
                            render={(renderRef, renderProps) =>
                                React.createElement<HTMLInputElement>('input', {
                                    ...renderProps,
                                    ...filteredProps,
                                    ref: mergeRefs(renderRef, ref),
                                    id,
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value
                                        const onlyNumbers = /^[A-Za-z0-9-\u4e00-\u9fa5]*$/.test(
                                            value
                                        ) // Regular expression to allow only alphabets, numbers, "-", chinese

                                        if (!onlyNumbers) {
                                            setErrorUrlMessage('此欄位只能包含字母、數字和“-”。');
                                            e.target.setCustomValidity(
                                                'Please enter only alphabets, chinese, numbers, "-".'
                                            )
                                        } else {
                                            setErrorUrlMessage('');
                                            e.target.setCustomValidity('')
                                        }
                                        props.onChange?.call(null, e);
                                        (renderProps as any).onChange?.call(null, e)
                                    },
                                    'aria-invalid': !!!props.errorMsg ? 'false' : 'true',
                                    'aria-errormessage': `${id}-error-msg`
                                })
                            }
                        />
                    )}
                    {tabViewContext?.activeLabel && (
                        <div className='field--label' field-label=''>
                            {tabViewContext.activeLabel.name}
                        </div>
                    )}
                </div>
            )
        }

        const renderInput = (): JSX.Element => {
            const filteredProps = filterProps(props)
            if (String.isNullOrWhitespace(filteredProps.className)) {
                filteredProps.className = 'field--text-input'
            } else {
                filteredProps.className = [
                    ...filteredProps.className.split(' '),
                    'field--text-input'
                ].join(' ')
            }
            return (
                <div className='field--container'>
                    {Array.isNullOrEmpty(props.mask) ? (
                        React.createElement('input', {
                            ...filteredProps,
                            ref: mergeRefs(ref),
                            id,
                            'aria-invalid': !!!props.errorMsg ? 'false' : 'true',
                            'aria-errormessage': `${id}-error-msg`
                        })
                    ) : (
                        <MaskedInput
                            mask={props.mask ?? []}
                            guide={props.guide}
                            placeholderChar={props.placeholderChar}
                            render={(renderRef, renderProps) =>
                                React.createElement<HTMLInputElement>('input', {
                                    ...renderProps,
                                    ...filteredProps,
                                    ref: mergeRefs(renderRef, ref),
                                    id,
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        props.onChange?.call(null, e)
                                            ; (renderProps as any).onChange?.call(null, e)
                                    },
                                    'aria-invalid': !!!props.errorMsg ? 'false' : 'true',
                                    'aria-errormessage': `${id}-error-msg`
                                })
                            }
                        />
                    )}
                    {tabViewContext?.activeLabel && (
                        <div className='field--label' field-label=''>
                            {tabViewContext.activeLabel.name}
                        </div>
                    )}
                </div>
            )
        }

        React.useEffect(() => {
            return () => unregister?.call(null, props.name)
        }, [unregister, props.name])

        if (String.isNullOrWhitespace(props.title)) {
            return (
                <div className='field--text'>
                    <label className='a11y' htmlFor={id}>
                        {props.placeholder}
                    </label>
                    {renderInput()}
                    {!String.isNullOrWhitespace(props.errorMsg) && (
                        <span className='field--error' id={`${id}-error-msg`} role='alert'>
                            {props.errorMsg}
                        </span>
                    )}
                </div>
            )
        }
        if (props.title === 'URL Slug') {
            return (
                <div className='field--text'>
                    <div className='field--title'>
                        <label htmlFor={id}>{props.title}</label>
                    </div>
                    {renderInputUrl()}
                    {!String.isNullOrWhitespace(props.errorMsg) && (
                        <span className='field--error' id={`${id}-error-msg`} role='alert'>
                            {props.errorMsg}
                        </span>
                    )}
                    {errorUrlMessage && <span className='field--error' role='alert'>{errorUrlMessage}</span>}
                </div>
            )
        }
        return (
            <div className='field--text'>
                <div className='field--title'>
                    <label htmlFor={id}>{props.title}</label>
                </div>
                {renderInput()}
                {!String.isNullOrWhitespace(props.errorMsg) && (
                    <span className='field--error' id={`${id}-error-msg`} role='alert'>
                        {props.errorMsg}
                    </span>
                )}
            </div>
        )
    }
)

export default TextField
