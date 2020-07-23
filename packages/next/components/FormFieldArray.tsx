import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Field, FieldArray, FormikProvider, FormikContextType } from 'formik';

import { TextField } from '../ui';

type Props = {
  formik: FormikContextType<any>;
};

const FormFieldArray = ({ formik }: Props) => (
  <FormikProvider value={formik}>
    <FieldArray
      name="statements"
      render={(arrayHelpers) => (
        <>
          {formik.values.statements &&
            formik.values.statements.map((_, index) => {
              const characterA = 65;
              const actualChar = String.fromCharCode(characterA + index);
              return (
                <Grid key={index} item>
                  <Field name={`statements.${index}`}>
                    {({ field, form }) => {
                      return (
                        <TextField
                          fullWidth
                          multiline
                          rowsMax={12}
                          label={`Statement ${actualChar}`}
                          name={field.name}
                          formik={form}
                          InputProps={{
                            endAdornment: (
                              <>
                                {formik.values.statements.length > 3 && (
                                  <IconButton
                                    color="primary"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    <RemoveCircleIcon />
                                  </IconButton>
                                )}

                                {formik.values.statements.length < 10 && (
                                  <IconButton
                                    color="primary"
                                    onClick={() => {
                                      arrayHelpers.push('');
                                    }}
                                  >
                                    <AddCircleIcon />
                                  </IconButton>
                                )}
                              </>
                            ),
                          }}
                        />
                      );
                    }}
                  </Field>
                </Grid>
              );
            })}
        </>
      )}
    />
  </FormikProvider>
);

export default FormFieldArray;
