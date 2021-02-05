import clsx from 'clsx';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';

import { Typography } from 'src/common/typography';
import { useTypewriterStyles } from './typewriter-effect.styles';

export interface TypewriterProps {
  children: string;
  delay?: number;
  className?: string;
}

export const Typewriter: React.VFC<TypewriterProps> = (props) => {
  const { children, delay = 200, className } = props;

  const classes = useTypewriterStyles();
  const [text, setText] = useState('');
  const [pointer, setPointer] = useState(0);

  useDebounce(
    () => {
      if (pointer < children.length) {
        setText(text + children[pointer]);
        setPointer(pointer + 1);
      } else {
        setText('');
        setPointer(0);
      }
    },
    delay,
    [pointer]
  );

  return (
    <Typography variant="inherit" className={clsx(classes.carret, className)}>
      {text}
    </Typography>
  );
};
