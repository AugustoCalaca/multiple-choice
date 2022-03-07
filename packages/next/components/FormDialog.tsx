import React, { forwardRef, memo, useCallback } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useMutation } from 'react-relay';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { MultipleChoiceType } from '../types/MultipleChoiceType';
import { Toast, TextField } from '../ui';

import FormFieldArray from './FormFieldArray';

import { MultipleChoiceAdd, updater } from './MultipleChoiceAdd';
import { MultipleChoiceEdit } from './MultipleChoiceEdit';

import { MultipleChoiceEditMutation } from './__generated__/MultipleChoiceEditMutation.graphql';
import { MultipleChoiceAddMutation } from './__generated__/MultipleChoiceAddMutation.graphql';
import { MultipleChoiceListItem_multipleChoice$data } from './__generated__/MultipleChoiceListItem_multipleChoice.graphql';

interface IProps {
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
  multipleChoice?: MultipleChoiceListItem_multipleChoice$data;
}

const validationSchema = yup.object().shape({
  question: yup.string().trim().min(3).max(200).required(),
  statements: yup.array().of(yup.string().trim().min(3).max(200).required()).required(),
  correctAnswer: yup.mixed().oneOf(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']).required(),
});

const SlideRef = (props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => {
  return <Slide direction="up" {...props} ref={ref} />;
};

const Transition = memo(forwardRef(SlideRef));

const FormDialog = (props: IProps) => {
  const [multipleChoiceAdd, isPendingAdd] = useMutation<MultipleChoiceAddMutation>(MultipleChoiceAdd);
  const [multipleChoiceEdit, isPendingEdit] = useMutation<MultipleChoiceEditMutation>(MultipleChoiceEdit);

  const formik = useFormik<Partial<MultipleChoiceType>>({
    initialValues: {
      question: '',
      statements: ['', '', ''],
      correctAnswer: '',
    },
    validationSchema,
    // @ts-ignore
    onSubmit(multipleChoice) {
      const castValues = validationSchema.cast(multipleChoice); // apply trim

      if (props.multipleChoice) {
        // @ts-ignore
        if (Object.entries(castValues).sort().toString() === Object.entries(props.multipleChoice).sort().toString()) {
          return Toast.type.show('Same data. Make a change in at least one field.');
        }

        const configEdit = {
          variables: {
            input: castValues,
          },
          onCompleted: () => {
            Toast.type.show('Multiple Choice successfully edited');
            props.onComplete();
          },
        };

        // @ts-ignore
        return multipleChoiceEdit(configEdit);
      }

      const configAdd = {
        variables: {
          input: multipleChoice,
        },
        updater,
        onCompleted: () => {
          Toast.type.show('Multiple Choice successfully added');
          props.onComplete();
        },
      };

      // @ts-ignore
      return multipleChoiceAdd(configAdd);
    },
  });

  const handleEnter = useCallback(() => {
    // @ts-ignore
    formik.setValues(props.multipleChoice ?? formik.initialValues, false);
  }, [formik, props.multipleChoice]);

  const handleExit = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  return (
    <Dialog
      open={props.opened}
      disableEscapeKeyDown
      TransitionComponent={Transition}
      TransitionProps={{
        onEnter: handleEnter,
        onExited: handleExit,
      }}
    >
      {(formik.isSubmitting || isPendingAdd || isPendingEdit) && <LinearProgress color="primary" />}

      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{formik.values.id ? 'Edit' : 'New'} Multiple Choice</DialogTitle>
        <DialogContentStyled>
          <Grid container direction="column" justifyContent="flex-start" spacing={2}>
            <Grid item>
              <TextField multiline fullWidth rowsMax={12} label="Question" name="question" formik={formik} />
            </Grid>

            <FormFieldArray formik={formik} />

            <Grid item>
              <TextField label="Correct Answer" fullWidth name="correctAnswer" formik={formik} />
            </Grid>
          </Grid>
        </DialogContentStyled>

        <DialogActions>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default memo(FormDialog);

const DialogContentStyled = styled(DialogContent)`
  width: 600px;
  max-width: calc(95vw - 50px);
`;
