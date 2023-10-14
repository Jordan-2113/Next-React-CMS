import * as React from "react";
import {
    Control,
    FieldValues,
    FormProvider,
    FormState,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
    UseFormClearErrors,
    UseFormGetFieldState,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormProps,
    UseFormRegister,
    UseFormReset,
    UseFormResetField,
    UseFormReturn,
    UseFormSetError,
    UseFormSetFocus,
    UseFormSetValue,
    UseFormTrigger,
    UseFormUnregister,
    UseFormWatch
} from "react-hook-form";

export type FormProps = UseFormProps & {
    form?: UseFormReturn<FieldValues>,
    onSubmit: SubmitHandler<SubmitHandler<FieldValues>>,
    onError?: SubmitErrorHandler<SubmitHandler<FieldValues>>,
    children(values: {
        watch: UseFormWatch<FieldValues>,
        getValues: UseFormGetValues<FieldValues>,
        getFieldState: UseFormGetFieldState<FieldValues>,
        setError: UseFormSetError<FieldValues>,
        clearErrors: UseFormClearErrors<FieldValues>,
        setValue: UseFormSetValue<FieldValues>,
        trigger: UseFormTrigger<FieldValues>,
        state: FormState<FieldValues>,
        resetField: UseFormResetField<FieldValues>,
        reset: UseFormReset<FieldValues>,
        handleSubmit: UseFormHandleSubmit<FieldValues>,
        unregister: UseFormUnregister<FieldValues>,
        control: Control<FieldValues, object>,
        register: UseFormRegister<FieldValues>,
        setFocus: UseFormSetFocus<FieldValues>,
    }): React.ReactElement<HTMLElement>
}

const useHookForm = (props: FormProps) => {
    const newForm = useForm({
        mode: props.mode,
        reValidateMode: props.reValidateMode,
        defaultValues: props.defaultValues,
        resolver: props.resolver,
        context: props.context,
        shouldFocusError: props.shouldFocusError,
        shouldUnregister: props.shouldUnregister,
        shouldUseNativeValidation: props.shouldUseNativeValidation,
        criteriaMode: props.criteriaMode,
        delayError: props.delayError,
    });
    return props.form ?? newForm;
}

const Form = React.forwardRef((props: FormProps, ref: React.ForwardedRef<HTMLFormElement>): JSX.Element => {
    const {
        watch,
        getValues,
        getFieldState,
        setError,
        clearErrors,
        setValue,
        trigger,
        formState,
        resetField,
        reset,
        handleSubmit,
        unregister,
        control,
        register,
        setFocus,
        ...rest
    } = useHookForm(props);

    return (
        <FormProvider
            { ...rest }
            watch={watch}
            getValues={getValues}
            getFieldState={getFieldState}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
            trigger={trigger}
            formState={formState}
            resetField={resetField}
            reset={reset}
            handleSubmit={handleSubmit}
            unregister={unregister}
            control={control}
            register={register}
            setFocus={setFocus}
        >
            <form ref={ref} onSubmit={handleSubmit(props.onSubmit, props.onError)}>
                { props.children({
                    watch,
                    getValues,
                    getFieldState,
                    setError,
                    clearErrors,
                    setValue,
                    trigger,
                    state: formState,
                    resetField,
                    reset,
                    handleSubmit,
                    unregister,
                    control,
                    register,
                    setFocus,
                }) }
            </form>
        </FormProvider>
    )
});

export default Form;