import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { useMutation } from '@multiple-choice/relay';

import { IDropDownOption, Actions, Toast, Alert } from '../ui';

import FormDialog from './FormDialog';

import { MultipleChoiceDelete, deleteUpdater } from './MultipleChoiceDelete';
import { MultipleChoiceDeleteMutation } from './__generated__/MultipleChoiceDeleteMutation.graphql';
import { MultipleChoiceListItem_multipleChoice$data } from './__generated__/MultipleChoiceListItem_multipleChoice.graphql';

type Props = {
  data: MultipleChoiceListItem_multipleChoice$data;
};

const CardItem = (props: Props) => {
  const [multipleChoiceDelete, isPending] = useMutation<MultipleChoiceDeleteMutation>(MultipleChoiceDelete);

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formCallback = useCallback(() => {
    setFormOpen(false);
  }, []);

  const handleEdit = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(async () => {
    const confirmDelete = await Alert.type.confirm(`Do you really want to delete?`);

    setLoading(true);
    if (!confirmDelete) {
      setLoading(false);
      return;
    }

    const config = {
      variables: {
        input: {
          id: props.data.id,
        },
      },
      onCompleted: (data) => {
        Toast.type.show(data.MultipleChoiceDelete.success);
      },
      updater: (store) => deleteUpdater(store, { id: props.data.id }),
    };

    multipleChoiceDelete(config);
  }, [props.data.id, multipleChoiceDelete]);

  const options = useMemo<IDropDownOption[]>(() => {
    return [
      { text: 'Edit', icon: EditIcon, handler: handleEdit },
      { text: 'Delete', icon: DeleteIcon, handler: handleDelete },
    ];
  }, [handleDelete, handleEdit]);

  return (
    <>
      <FormDialog opened={formOpen} onCancel={formCallback} onComplete={formCallback} multipleChoice={props.data} />

      <Card variant="outlined">
        <CardHeader
          action={<Actions options={options} loading={isPending || loading} />}
          title="Question"
          subheader={`${props.data.question}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            A) {props.data.statementA}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            B) {props.data.statementB}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            C) {props.data.statementC}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            D) {props.data.statementD}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            E) {props.data.statementE}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButtonStyled onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </IconButtonStyled>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Correct Answer:</Typography>
            <Typography paragraph>
              Alternative - <strong>{props.data.correctAnswer}</strong>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default CardItem;

const IconButtonStyled = styled(IconButton)`
  && {
    transform: rotate(0deg);
    margin-left: auto;
    transition: ${({ theme }) =>
      theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })};
    ${(props) => props['aria-expanded'] && `transform: rotate(180deg)`}
  }
`;
