import React from 'react';
import { Box, Text, ResponsiveContext, Spinner } from 'grommet';
import { MainNavbar } from './main-navbar';

interface BasePageProps {
  title?: string;
  children: React.ReactNode;
  loading?: boolean;
}

export function BasePage(props: BasePageProps) {
  const { children, title, loading } = props;
  return (
    <ResponsiveContext.Consumer>
      {(responsiveSize) => (
        <Box gap="medium" pad={{ left: 'medium', right: 'medium', bottom: 'large' }}>
          <MainNavbar responsiveSize={responsiveSize} />
          <Box>
            <Text size="xlarge" weight="bold">
              {title}
            </Text>
          </Box>
          {loading ? <Spinner /> : <Box>{children}</Box>}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}
