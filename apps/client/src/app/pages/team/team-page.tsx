import { appPath } from '@teams2/common';
import { Box, Button, Tag } from 'grommet';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BasePage } from '../../components/base-page';
import { LabelValue } from '../../components/label-value';
import { Panel } from '../../components/panel';
import { useGetTeamLazyQuery } from '../../generated/graphql';

export function TeamPage() {
  const navigate = useNavigate();
  const [getTeam, { data: teamData, loading: teamLoading, error: teamError }] =
    useGetTeamLazyQuery();
  const [navLink, setNavLink] = useState<string>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTeam({ variables: { id } });
    }
  }, [getTeam, id]);

  useEffect(() => {
    if (navLink) {
      navigate(navLink);
    }
    return () => {
      setNavLink(undefined);
    };
  }, [navLink, navigate]);

  if (!id || teamError) {
    if (!navLink) {
      setNavLink(appPath.page404);
    }
  }

  return (
    <BasePage title="Tím" loading={teamLoading}>
      <Box gap="medium">
        <Panel title="Detaily tímu">
          <LabelValue label="Názov" value={teamData?.getTeam?.name} />
        </Panel>
        <Panel title="Registrácie">
          <Button label="Registrácia" onClick={() => setNavLink(appPath.teamRegistration(id))} />
          <Box direction="row" wrap>
            {teamData?.getTeam?.events.map((e) => (
              <Tag key={e.id} onClick={() => setNavLink(appPath.event(e.id))} value={e.name} />
            ))}
          </Box>
        </Panel>
        <Panel title="Faktúry">
          <p>Here be data</p>
        </Panel>
      </Box>
    </BasePage>
  );
}
