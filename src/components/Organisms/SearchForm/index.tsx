import Icon from '@components/Atoms/Icon';
import FormField from '@components/Utilities/FormField';
import SectionInner from '@components/Utilities/SectionInner';
import { Field_Categories, GetFormieQuery } from '@typings/graphql';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const SearchForm = ({
  searchQuery,
  setRelatedToCategories,
  relatedToCategories,
  form,
  onChange,
  onClear,
  showClearButton = false,
}: GetFormieQuery & {
  searchQuery?: string;
  setRelatedToCategories: Dispatch<SetStateAction<any>>;
  relatedToCategories: { slug?: string[] }[];
  onChange: (_values: any) => void;
  onClear: (_values: any) => void;
  showClearButton?: boolean;
}) => {
  type FormInputs = Record<any, any>;
  const formMethods = useForm<FormInputs>({
    defaultValues: { search: searchQuery || null },
  });

  const { setValue } = formMethods;

  const categoryFieldArray = form.pages[0].rows
    .flatMap(({ rowFields }) => rowFields)
    .filter(
      ({ __typename }) => __typename === 'Field_Categories'
    ) as Field_Categories[];

  useEffect(() => {
    // initialise the displayed topics if the url contains query params for topic categories
    const categories = {};

    // Map over all category fields
    categoryFieldArray.map((field) => {
      categories[field.handle] = {}; // Initialise a new object for the category group

      // Map over the categories associated with the field
      field.categories.map(({ slug, title }) => {
        // If the field category is in the selected categories
        if (relatedToCategories?.[0].slug.includes(slug)) {
          // Add an key and value for each category and
          // attach it to the category group
          categories[field.handle][slug] = title;
        }
      });
    });

    setValue('category', categories);

    const subscription = formMethods.watch((values) => {
      onChange(values);
    });

    return () => subscription.unsubscribe();
  }, [
    searchQuery,
    formMethods,
    formMethods.watch,
    onChange,
    setRelatedToCategories,
    relatedToCategories,
    categoryFieldArray,
    setValue,
  ]);

  return (
    <div className='bg-tints-light-gray py-medium'>
      <SectionInner>
        <FormProvider {...formMethods}>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Form Fields */}
            {!!form?.pages?.[0]?.rows[0] && (
              <>
                {form.pages[0].rows.map((row, rowIndex) => {
                  const { __typename, rowFields } = row;

                  return (
                    <div
                      key={form.id + __typename + rowIndex}
                      className={`flex flex-wrap gap-x-small sm:flex-nowrap sm:gap-normal`}
                    >
                      {rowFields.map(({ id, typeName, ...props }) => (
                        <fieldset
                          key={id}
                          className={`group relative mb-0 basis-full disabled:opacity-25`}
                          disabled={formMethods.formState.isSubmitting}
                        >
                          <FormField
                            id={id}
                            typeName={typeName}
                            {...props}
                            hideOptionalFlag
                          />
                        </fieldset>
                      ))}
                    </div>
                  );
                })}
              </>
            )}
          </form>
          <div className='flex flex-wrap justify-center gap-medium pt-medium'>
            {!!categoryFieldArray?.length && (
              <div className='flex flex-wrap items-center justify-center gap-small'>
                {categoryFieldArray.map(({ id, handle }) => {
                  return formMethods.watch(`category[${handle}]`) !==
                    undefined ? (
                    <SelectedCategories key={id} handle={handle} />
                  ) : null;
                })}
              </div>
            )}

            {showClearButton ? (
              <button
                className='no-defaults small box-border flex items-center gap-xx-small border py-xx-small px-x-small sm:px-small sm:py-x-small'
                onClick={() => {
                  formMethods.reset();
                  onClear({});
                }}
              >
                Clear filters
                <Icon name='close' small />
              </button>
            ) : null}
          </div>
        </FormProvider>
      </SectionInner>
    </div>
  );
};

const SelectedCategories = ({ handle }) => {
  const { getValues, setValue } = useFormContext();
  const fieldHandle = `category[${handle}]`;
  const selectedCategories = getValues(fieldHandle);

  return !!Object.keys(selectedCategories)?.length ? (
    <>
      {Object.keys(selectedCategories).map((key) => (
        <span
          className='small flex items-center gap-xx-small whitespace-nowrap rounded-full bg-black py-xx-small px-x-small text-white sm:px-small sm:py-x-small'
          key={key}
        >
          {selectedCategories[key]}
          <button
            type='button'
            className='no-defaults'
            onClick={() => {
              delete selectedCategories[key];
              setValue(fieldHandle, selectedCategories);
              setValue(handle + '-select', '');
            }}
          >
            <Icon name='close' />
          </button>
        </span>
      ))}
    </>
  ) : null;
};

export default SearchForm;
