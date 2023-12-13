// @ts-ignore
import { Command } from 'gg-editor';
import React from 'react';
import { Tooltip } from 'antd';
import IconFont from '../../common/IconFont';
import useStyles from './index.style';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

type ToolbarButtonProps = {
  command: string;
  icon?: string;
  text?: string;
};
const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
  const { styles } = useStyles();
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <Tooltip
        title={text || upperFirst(command)}
        placement="bottom"
        overlayClassName={styles.tooltip}
      >
        <IconFont type={`icon-${icon || command}`} />
      </Tooltip>
    </Command>
  );
};

export default ToolbarButton;
