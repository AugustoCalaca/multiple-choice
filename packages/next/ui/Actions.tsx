import React, { memo, Props } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SvgIconComponent } from '@material-ui/icons';

import DropDownMenu from './DropDownMenu';
import DropDownMenuOptionItem from './DropDownMenuOptionItem';

import ErrorMessageIcon from './ErrorMessageIcon';

export interface IDropDownOption {
  text: string;
  icon?: SvgIconComponent;
  handler: () => void;
}

interface IProps extends Props<null> {
  options?: IDropDownOption[];
  loading?: boolean;
  error?: any;
  onDismissError?: () => void;
}

const Actions = (props: IProps) => {
  const { loading, error, options, onDismissError } = props;

  return (
    <div>
      {loading && (
        <LoaderContent>
          <CircularProgress color="primary" size={20} />
        </LoaderContent>
      )}
      {!loading && error && <ErrorMessageIcon error={error} onDismiss={onDismissError} />}
      {!loading && !error && options && (
        <DropDownMenu>
          {options.map((option) => (
            <DropDownMenuOptionItem key={option.text} {...option} />
          ))}
        </DropDownMenu>
      )}
    </div>
  );
};

export default memo(Actions);

const LoaderContent = styled.div`
  padding: 12px;
`;
