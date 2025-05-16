import Icon from '@components/Atoms/Icon';
import {
  FieldFragmentFragment,
  Field_Agree,
  Field_Categories,
  Field_Dropdown,
  Field_Email,
  Field_MultiLineText,
  Field_Phone,
  Field_SingleLineText,
} from '@typings/graphql';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type AdditionalFieldProps = {
  hideOptionalFlag?: boolean;
};

type SelectProps = (
  | Field_Dropdown
  | (Field_Categories & {
      options?: {
        label?: string;
        value?: string;
        disabled?: boolean;
      }[];
    })
) &
  AdditionalFieldProps;
/**
 * Form Field is a utility component used to render the correct
 * form field based on the field type
 */
const FormField = ({
  typeName,
  ...props
}: FieldFragmentFragment & AdditionalFieldProps) => {
  switch (typeName) {
    case 'Field_Dropdown':
      return <Select {...(props as SelectProps & AdditionalFieldProps)} />;

    case 'Field_Categories':
      return (
        <Categories {...(props as Field_Categories & AdditionalFieldProps)} />
      );

    case 'Field_MultiLineText':
      return (
        <Textarea {...(props as Field_MultiLineText & AdditionalFieldProps)} />
      );

    case 'Field_Agree':
      return <Agree {...(props as Field_Agree)} />;

    case 'Field_Email':
      return (
        <Input
          typeName={typeName}
          {...(props as Field_Email & AdditionalFieldProps)}
        />
      );

    case 'Field_Phone':
      return (
        <Input
          typeName={typeName}
          {...(props as Field_Phone & AdditionalFieldProps)}
        />
      );

    default:
      return (
        <Input
          typeName={typeName}
          {...(props as Field_SingleLineText & AdditionalFieldProps)}
        />
      );
  }
};

const Categories = ({
  handle,
  categories: fieldOptions,
  ...props
}: Field_Categories & AdditionalFieldProps) => {
  const { register, getValues, setValue, watch } = useFormContext();
  const fieldHandle = `category[${handle}]`;

  // Remap options to match dropdown options object
  let options = fieldOptions.map(
    ({ title, slug }): { label: string; value: string; disabled: boolean } => ({
      label: title,
      value: slug,
      disabled: false,
    })
  );

  // Register the category field
  register(fieldHandle);

  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      const categorySelectChanged =
        name === handle + '-select' && type === 'change';

      if (categorySelectChanged && values[handle + '-select'] !== '') {
        const selected = options.find((option) => {
          return option?.value === values[handle + '-select'];
        });

        const selectedOptions = {
          ...values.category[handle],
          [selected?.value]: selected?.label,
        };

        // Category select field changed
        setValue(fieldHandle, selectedOptions); // update the category field
        setValue(handle + '-select', ''); // select initial empty value option (i.e. the placeholder)
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, options, setValue, fieldHandle, handle]);

  const categories = getValues(fieldHandle);

  const filteredOptions = options.map((option) => {
    option.disabled =
      !!categories && Object.keys(categories).includes(option?.value);
    return option;
  });

  return (
    <Select
      {...props}
      handle={`${handle}-select`}
      options={filteredOptions}
      placeholder={`Select a ${props.name.toLowerCase()}`}
    />
  );
};

const Select = ({
  id,
  handle,
  name,
  options,
  errorMessage,
  required,
  hideOptionalFlag,
  placeholder,
}: SelectProps) => {
  const { register, getFieldState } = useFormContext();
  const fieldState = getFieldState(handle);

  return (
    <>
      <span className='relative'>
        <select
          className={`peer w-full appearance-none rounded-none border-b bg-transparent pb-x-small pt-small outline-none placeholder:text-[transparent] valid:border-status-verify placeholder-shown:valid:border-black invalid:border-status-error placeholder-shown:invalid:border-black focus:border-primary focus:placeholder:text-gray-3 ${
            fieldState.error ? '!border-status-error' : ''
          }`}
          {...register(handle, {
            required: { value: required, message: errorMessage },
          })}
          defaultValue=''
        >
          {/* Output an initial option which is disabled */}
          {!!placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}

          {/* Output options from the data provided */}
          {options?.map(({ label, value, disabled }) => {
            return (
              <option
                key={`${handle}-${value}`}
                value={value}
                disabled={disabled}
              >
                {label}
              </option>
            );
          })}
        </select>
        <Icon
          name='chevron'
          className='pointer-events-none absolute top-1/2 right-0 -translate-y-1/2'
        />
      </span>
      <label
        htmlFor={id + '' || handle}
        className={`sr-only absolute top-0 left-0 block translate-y-0 text-x-small transition-all duration-200 ease-in-out group-focus-within:text-x-small group-focus-within:text-primary peer-placeholder-shown:translate-y-small peer-placeholder-shown:text-normal group-focus-within:peer-placeholder-shown:translate-y-0 group-focus-within:peer-placeholder-shown:text-x-small peer-valid:text-status-verify peer-valid:peer-placeholder-shown:text-black peer-invalid:text-status-error peer-invalid:peer-placeholder-shown:text-black ${
          fieldState.error ? '!text-status-error' : ''
        }`}
      >
        {`${name}${!hideOptionalFlag && !required ? ' (Optional)' : ''}`}
      </label>
      <FieldErrorMessage fieldState={fieldState} />
    </>
  );
};

const Textarea = ({
  id,
  name,
  handle,
  placeholder,
  errorMessage,
  required,
  hideOptionalFlag,
}: Field_MultiLineText & AdditionalFieldProps) => {
  const { register, getFieldState } = useFormContext();
  const fieldState = getFieldState(handle);
  return (
    <>
      <textarea
        id={id + '' || handle}
        name={handle}
        className={`peer w-full border-b bg-transparent pb-x-small pt-small outline-none placeholder:text-[transparent] valid:border-status-verify placeholder-shown:valid:border-black invalid:border-status-error placeholder-shown:invalid:border-black focus:border-primary focus:placeholder:text-gray-3 ${
          fieldState.error ? '!border-status-error' : ''
        }`}
        placeholder={placeholder || ''}
        {...register(handle, {
          required: { value: required, message: errorMessage },
        })}
      />
      <label
        htmlFor={id + '' || handle}
        className={`absolute top-0 left-0 block translate-y-0 text-x-small transition-all duration-200 ease-in-out group-focus-within:text-x-small group-focus-within:text-primary peer-placeholder-shown:translate-y-small peer-placeholder-shown:text-normal group-focus-within:peer-placeholder-shown:translate-y-0 group-focus-within:peer-placeholder-shown:text-x-small peer-valid:text-status-verify peer-valid:peer-placeholder-shown:text-black peer-invalid:text-status-error peer-invalid:peer-placeholder-shown:text-black ${
          fieldState.error ? '!text-status-error' : ''
        }`}
      >
        {`${name}${!hideOptionalFlag && !required ? ' (Optional)' : ''}`}
      </label>
      <FieldErrorMessage fieldState={fieldState} />
    </>
  );
};

const Agree = ({
  id,
  handle,
  description,
  defaultState,
  errorMessage,
  required,
}: Field_Agree) => {
  const fieldHandle = 'agree[' + handle + ']';
  const { register, getFieldState } = useFormContext();
  const fieldState = getFieldState(fieldHandle);
  const desc = JSON.parse(description)[0];
  return (
    <>
      <label className='small mt-medium block'>
        <input
          type='checkbox'
          className='mr-small'
          name={fieldHandle}
          {...register(fieldHandle, {
            required: { value: required, message: errorMessage },
          })}
          defaultChecked={defaultState}
        />
        {desc?.type === 'paragraph' && desc?.content ? (
          <>
            {desc.content.map(({ type, ...rest }, index) => {
              switch (type) {
                case 'text':
                  if (rest?.marks?.length) {
                    return rest.marks.map(({ type, ...markRest }) => {
                      if (type === 'link') {
                        return (
                          <a
                            key={`${id}-${index}`}
                            {...markRest.attrs}
                            className='underline underline-offset-4 hover:text-primary'
                          >
                            {rest.text}
                          </a>
                        );
                      }
                      return null;
                    });
                  }
                  return <span key={`${id}-${index}`}>{rest.text}</span>;
                default:
                  return null;
              }
            })}
          </>
        ) : null}
      </label>
      <FieldErrorMessage fieldState={fieldState} />
    </>
  );
};

const Input = ({
  id,
  handle,
  typeName,
  name,
  defaultValue,
  placeholder,
  errorMessage,
  required,
  hideOptionalFlag,
  ...rest
}: (Field_SingleLineText | Field_Email | Field_Phone) &
  AdditionalFieldProps) => {
  const { register, getFieldState, resetField, watch } = useFormContext();
  const fieldState = getFieldState(handle);
  const inputType = getInputType(typeName);

  return (
    <>
      <input
        id={id + '' || handle}
        type={inputType}
        className={`peer relative w-full border-b bg-transparent pb-x-small pt-small outline-none placeholder:text-[transparent] valid:border-status-verify placeholder-shown:valid:border-black invalid:border-status-error placeholder-shown:invalid:border-black focus:border-primary focus:placeholder:text-gray-3 ${
          fieldState.error ? '!border-status-error' : ''
        } ${handle === 'search' ? 'pr-normal' : ''}`}
        placeholder={placeholder || ''}
        defaultValue={defaultValue}
        {...register(handle, {
          required: { value: required, message: errorMessage },
          validate: (value) => {
            if (inputType === 'email') {
              const { blockedDomains } = rest as Field_Email;
              const inputParts = value?.length ? value.split('@') : [];

              if (
                inputParts.length === 2 &&
                blockedDomains.includes(inputParts[1])
              ) {
                return errorMessage;
              }

              return true;
            }
          },
        })}
      />
      <label
        htmlFor={id + '' || handle}
        className={`absolute top-0 left-0 block translate-y-0 text-x-small transition-all duration-200 ease-in-out group-focus-within:text-x-small group-focus-within:text-primary peer-placeholder-shown:translate-y-small peer-placeholder-shown:text-normal group-focus-within:peer-placeholder-shown:translate-y-0 group-focus-within:peer-placeholder-shown:text-x-small peer-valid:text-status-verify peer-valid:peer-placeholder-shown:text-black peer-invalid:text-status-error peer-invalid:peer-placeholder-shown:text-black ${
          fieldState.error ? '!text-status-error' : ''
        }`}
      >
        {`${name}${!hideOptionalFlag && !required ? ' (Optional)' : ''}`}
      </label>

      {/* Search Icon */}
      {handle === 'search' ? (
        watch(handle) === '' || watch(handle) === undefined ? (
          <Icon name='search' className='absolute right-0 top-[22px]' />
        ) : (
          <button
            type='button'
            className='no-defaults absolute right-0 top-[22px]'
            onClick={() => resetField(handle, { defaultValue: '' })}
          >
            <Icon name='close' />
          </button>
        )
      ) : null}
      <FieldErrorMessage fieldState={fieldState} />
    </>
  );
};

const FieldErrorMessage = ({ fieldState }) => {
  return (
    <p className='small text-status-error'>
      {fieldState?.error?.message ? fieldState.error.message : ''}
    </p>
  );
};

const getInputType = (typeName: FieldFragmentFragment['typeName']) => {
  const inputTypeAlias = {
    Field_SingleLineText: 'text',
    Field_Email: 'email',
    Field_Phone: 'tel',
  };

  return inputTypeAlias[typeName];
};

export default FormField;
