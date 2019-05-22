import React from 'react';
import { Command } from 'gg-editor';
import IconFont from '../../common/IconFont';
import styles from './index.less';

const upperFirst = (str: string) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());
};

interface MenuItemProps {
  command: string;
  icon?: string;
  text?: string;
}
const MenuItem: React.SFC<MenuItemProps> = props => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <div className={styles.item}>
        <IconFont type={`icon-${icon || command}`} />
        <span>{text || upperFirst(command)}</span>
      </div>
    </Command>
  );
};

export default MenuItem;
