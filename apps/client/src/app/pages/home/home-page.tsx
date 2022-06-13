import { Box, Spinner } from 'grommet';
import { Link } from 'react-router-dom';

import { BasePage } from '../../components/base-page';
import { EventInfoTile } from '../../components/event-info-tile';
import { useGetEventsQuery } from '../../generated/graphql';

interface HomePageProps {
  responsiveSize?: string;
}

export function HomePage(props: HomePageProps) {
  const { data: eventsData, loading: eventsLoading } = useGetEventsQuery();
  return (
    <BasePage title="Turnaje">
      <Link to="/profile">Click here for protected profile.</Link>
      {eventsLoading ? (
        <Spinner />
      ) : (
        <Box gap="medium">
          {eventsData?.getEvents.map((event) => (
            <EventInfoTile key={event.id} event={event} />
          ))}
        </Box>
      )}
    </BasePage>
  );
}
