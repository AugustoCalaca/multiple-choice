import React, { memo, useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu, { MenuProps } from '@material-ui/core/Menu';

import DropDownMenuContext from './DropDownMenuContext';

const DropDownMenu = (props: Partial<MenuProps>) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | null>();

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setTargetElem(event.currentTarget);
  }, []);

  const handleClose = useCallback((event?: React.MouseEvent<HTMLElement>) => {
    event && event.stopPropagation();
    setTargetElem(null);
  }, []);

  const handleClick = useCallback(
    (handler: () => void) => {
      handleClose();
      handler();
    },
    [handleClose],
  );

  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit">
        <MoreHorizIcon />
      </IconButton>

      <Menu {...props} anchorEl={targetElem} open={!!targetElem} onClose={handleClose}>
        <DropDownMenuContext.Provider value={handleClick}>{props.children}</DropDownMenuContext.Provider>
      </Menu>
    </div>
  );
};

export default memo(DropDownMenu);
