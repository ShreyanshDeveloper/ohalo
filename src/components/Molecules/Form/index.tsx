import { gql, useMutation, useQuery } from '@apollo/client';
import Button from '@components/Atoms/Button';
import FormField from '@components/Utilities/FormField';
import { FormFragment, GetFormieDocument } from '@typings/graphql';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TitleGroup from '../TitleGroup';
import parse from 'html-react-parser';

const Form = (props: Partial<FormFragment>) => {
  const {
    form: [{ handle }],
    sectionTitles,
  } = props;
  const [showSuccess, setShowSuccess] = useState(false);
  const [mutationQuery, setMutationQuery] = useState(
    gql(`mutation save_enquiryForm_Submission{ fullName }`)
  );
  const methods = useForm();
  const { error, loading, data } = useQuery(GetFormieDocument, {
    variables: {
      handle,
    },
  });
  const [
    postFormSubmission,
    {
      data: postSubmissionData,
      loading: postSubmissionLoading,
      error: postSubmissionError,
    },
  ] = useMutation(mutationQuery, {
    onCompleted: ({ save_enquiryForm_Submission }) => {
      if (save_enquiryForm_Submission) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const query = gql(`
        mutation FormSubmission(
          ${data.form.pages[0].rows.map(({ rowFields }) => {
            return rowFields.map(({ handle }) => {
              return `$${handle}: String`;
            });
          })}
        ) {
          save_${data.form.handle}_Submission(
            ${data.form.pages[0].rows.map(({ rowFields }) => {
              return rowFields.map(({ handle }) => {
                return `${handle}: $${handle}`;
              });
            })}
          ) {
            ${data.form.pages[0].rows.map(({ rowFields }) => {
              return rowFields.map(({ handle }) => {
                return handle;
              });
            })}
          }
        }
      `);

      setMutationQuery(query);
    }
  }, [loading, error, data]);

  // Handle loading of the form field data - used to render the form
  if (error) return <p>Something is wrong!</p>;

  /**
   * Handles the submission of the data -
   * Calling the Apollo useMutation hook
   */
  const onSubmit = async (submissionData) => {
    const { agree, ...formData } = submissionData;

    // Flatten agree field data
    // Convert boolean to string value
    if (agree) {
      Object.keys(agree).map((key) => {
        formData[key] = agree[key] ? '1' : '0';
      });
    }

    try {
      const response = await postFormSubmission({
        variables: {
          ...formData,
        },
      });

      if (!response?.errors) {
        if (
          data?.form?.settings?.submitAction === 'url' ||
          data?.form?.settings?.submitAction === 'entry'
        ) {
          const redirectUrl =
            data?.form?.settings?.redirectUrl ||
            data?.form?.settings?.redirectEntry?.uri;
			
			console.log("redirectUrl",redirectUrl);
			
			const updatedHref = redirectUrl.replace(
			  'https://cms.ohalo.co/web/',
			  process.env.NEXT_PUBLIC_FRONT_BASE_URL || ''
			);
			
			const updatedHref1 = updatedHref.replace(
			  'https://ohalo.frb.io/',
			  'https://cms.ohalo.co/'
			);
			
			const updatedHref2 = updatedHref1.replace(
			  'https://www.ohalo.co/',
			  process.env.NEXT_PUBLIC_FRONT_BASE_URL || ''
			);
			
          if (updatedHref2) {
            window.open(updatedHref2, '_blank');
          }
        }
        methods.reset();
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  return loading ? (
    <p>loading...</p>
  ) : (
    <div>
      {!!sectionTitles?.length && (
        <TitleGroup isColumnTitleGroup {...sectionTitles[0]} />
      )}

      {/* Error State */}
      {!!postSubmissionError && (
        <div className='text-status-error'>
          {data?.form?.settings?.errorMessageHtml ? (
            parse(data?.form?.settings?.errorMessageHtml)
          ) : (
            <p>Error submitting the form, please look below for any errors.</p>
          )}
        </div>
      )}

      {/* Success State */}
      {!!postSubmissionData && showSuccess ? (
        <div
          className={
            'fixed bottom-medium left-1/2 z-10 -translate-x-1/2 border-b-4 border-status-verify bg-white p-small px-medium shadow-xl'
          }
        >
          {data?.form?.settings?.submitActionMessageHtml ? (
            parse(data.form.settings.submitActionMessageHtml)
          ) : (
            <p>Thank you for your submission.</p>
          )}
        </div>
      ) : null}

      {/* Form */}
      {!!data && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-x-small'>
              {/* Loading State */}
              {!!postSubmissionLoading && !!methods.formState.isSubmitting ? (
                <p className='fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-tints-light-blue p-small shadow-md'>
                  Submitting...
                </p>
              ) : null}

              {/* Form Fields */}
              {!!data?.form?.pages?.[0]?.rows[0].rowFields && (
                <>
                  {data.form.pages[0].rows.map((row, rowIndex) => {
                    const { __typename, rowFields } = row;

                    return (
                      <div
                        key={data.form.id + __typename + rowIndex}
                        className={`flex flex-wrap gap-x-small sm:flex-nowrap sm:gap-normal`}
                      >
                        {rowFields.map(({ id, typeName, ...props }) => (
                          <fieldset
                            key={id}
                            className={`group relative mb-0 basis-full disabled:opacity-25`}
                            disabled={methods.formState.isSubmitting}
                          >
                            <FormField id={id} typeName={typeName} {...props} />
                          </fieldset>
                        ))}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <Button
              type='submit'
              label={
                methods.formState.isSubmitting
                  ? 'Submitting...'
                  : data?.form?.pages?.[0]?.settings?.submitButtonLabel ||
                    'Submit'
              }
              disabled={methods.formState.isSubmitting}
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default Form;
