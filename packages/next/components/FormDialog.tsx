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
import { useMutation } from '@multiple-choice/relay';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { MultipleChoiceType } from '../types/MultipleChoiceType';
import { Toast, TextField } from '../ui';

import { MultipleChoiceAdd, updater } from './MultipleChoiceAdd';
import { MultipleChoiceEdit } from './MultipleChoiceEdit';

import { MultipleChoiceEditMutation } from './__generated__/MultipleChoiceEditMutation.graphql';
import { MultipleChoiceAddMutation } from './__generated__/MultipleChoiceAddMutation.graphql';

interface IProps {
  opened: boolean;
  multipleChoice?: MultipleChoiceType | null;
  onComplete: () => void;
  onCancel: () => void;
}

const validationSchema = yup.object().shape({
  question: yup.string().trim().min(3).max(200).required(),
  statementA: yup.string().trim().min(3).max(200).required(),
  statementB: yup.string().trim().min(3).max(200).required(),
  statementC: yup.string().trim().min(3).max(200).required(),
  statementD: yup.string().trim().min(3).max(200).required(),
  statementE: yup.string().trim().min(3).max(200).required(),
  correctAnswer: yup.mixed().oneOf(['a', 'b', 'c', 'd', 'e']).required(),
});

const SlideRef = (props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => {
  return <Slide direction="up" {...props} ref={ref} />;
};

const Transition = memo(forwardRef(SlideRef));

const FormDialog = (props: IProps) => {
  const [multipleChoiceAdd, isPendingAdd] = useMutation<MultipleChoiceAddMutation>(MultipleChoiceAdd);
  const [multipleChoiceEdit, isPendingEdit] = useMutation<MultipleChoiceEditMutation>(MultipleChoiceEdit);

  const formik = useFormik<MultipleChoiceType>({
    initialValues: {
      question: '',
      statementA: '',
      statementB: '',
      statementC: '',
      statementD: '',
      statementE: '',
    },
    validationSchema,
    onSubmit(multipleChoice) {
      const castValues = validationSchema.cast(multipleChoice); // apply trim

      if (props.multipleChoice) {
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

      return multipleChoiceAdd(configAdd);
    },
  });

  const handleEnter = useCallback(() => {
    formik.setValues(props.multipleChoice ?? formik.initialValues, false);
  }, [formik, props.multipleChoice]);

  const handleExit = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  return (
    <Dialog
      open={props.opened}
      disableBackdropClick
      disableEscapeKeyDown
      onEnter={handleEnter}
      onExited={handleExit}
      TransitionComponent={Transition}
    >
      {(formik.isSubmitting || isPendingAdd || isPendingEdit) && <LinearProgress color="primary" />}

      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{formik.values!._id ? 'Edit' : 'New'} Multiple Choice</DialogTitle>
        <DialogContentStyled>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={12} label="Question" name="question" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={12} label="Statement A" name="statementA" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={9} label="Statement B" name="statementB" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={9} label="Statement C" name="statementC" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={9} label="Statement D" name="statementD" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField multiline rowsMax={9} label="Statement E" name="statementE" formik={formik} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Correct Answer" name="correctAnswer" formik={formik} />
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
