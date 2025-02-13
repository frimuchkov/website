import React from 'react';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/expand-icon.svg';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from 'src/common';
import { useStablecoinFaqStyles } from './stablecoin-faq.styles';
import { FAQ } from '../constants';

export type StablecoinFaqProps = {
  className?: string;
};

export const StablecoinFaq: React.FC<StablecoinFaqProps> = (props) => {
  const classes = useStablecoinFaqStyles();

  return (
    <div className={props.className}>
      <Typography variant="h2" align="center" className={classes.title}>
        FAQ
      </Typography>
      {FAQ.map((faqItem) => (
        <Accordion key={faqItem.title}>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <Typography variant="h5">{faqItem.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            {faqItem.body.map((faqBodyText) => (
              <Typography variant="body1" key={faqBodyText}>
                {faqBodyText}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
