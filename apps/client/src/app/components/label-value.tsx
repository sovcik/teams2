import React from 'react';
import { Box, Text } from 'grommet';
import { ReactNode } from 'react';
import { LabelValueGroupContext } from './label-value-group';

interface LabelValueProps {
  label: string;
  labelWidth?: string;
  value?: string | null;
  direction?: 'row' | 'column';
  children?: ReactNode;
}

export const LabelValue = (props: LabelValueProps) => {
  const { label, value = '', direction = 'column', labelWidth, children } = props;
  return (
    <LabelValueGroupContext.Consumer>
      {(context) => {
        const dir = direction ?? context.direction;

        return (
          <Box direction={dir} border={{ side: 'bottom', color: 'light-3' }} gap="xsmall">
            <Box
              width={{
                width: (labelWidth ?? context.labelWidth ?? dir === 'row') ? '50%' : '100%',
                min: (labelWidth ?? context.labelWidth ?? dir === 'row') ? '50%' : '100%',
              }}
            >
              <Text weight="bold">{label}</Text>
            </Box>
            {typeof value === 'string' && <Text>{value}</Text>}
            {children}
          </Box>
        );
      }}
    </LabelValueGroupContext.Consumer>
  );
};
