import React from 'react';

import { formatDate } from '@teams2/dateutils';
import { Anchor, Box, Spinner, Text } from 'grommet';

import { LabelValue } from '../../../components/label-value';
import { LabelValueGroup } from '../../../components/label-value-group';
import { NoteList } from '../../../components/note-list';
import { ClosableSidebar } from '../../../components/sidebar';
import { SidebarPanel, SidebarPanelGroup } from '../../../components/sidebar-panel';
import { TagList } from '../../../components/tag-list';
import {
  useAddTagToTeamMutation,
  useCreateNoteMutation,
  useDeleteTagMutation,
  useGetNotesQuery,
  useGetRegistrationQuery,
} from '../../../generated/graphql';
import { fullAddress } from '../../../utils/format-address';

import { FieldInvoiceIssuedOn } from './field-invoiceIssuedOn';
import { FieldPaidOn } from './field-paidOn';
import { FieldShipmentGroup } from './field-shipmentGroup';
import { FieldShippedOn } from './field-shippedOn';
import { FieldTeamSize } from './field-teamSize';
import { FieldTeamSizeConfirmedOn } from './field-teamSizeConfirmedOn';
import { appPath } from '@teams2/common';
import { formatFullName } from '../../../utils/format-fullname';

interface RegistrationSidebarProps {
  registrationId?: string;
  onClose: () => unknown;
}

export function RegistrationSidebar(props: RegistrationSidebarProps) {
  const { registrationId, onClose } = props;

  const {
    data: notesData,
    loading: notesLoading,
    refetch: notesRefetch,
  } = useGetNotesQuery({
    variables: { type: 'registration', ref: registrationId ?? '0' },
  });

  const { data: regData, loading: regLoading } = useGetRegistrationQuery({
    variables: { id: registrationId ?? '0' },
  });

  const [removeTag] = useDeleteTagMutation();
  const [addTag] = useAddTagToTeamMutation();

  const [createNote] = useCreateNoteMutation({ onCompleted: () => notesRefetch() });

  const registration = regData?.getRegistration;

  if (!registration) {
    return null;
  }

  return (
    <ClosableSidebar
      onClose={onClose}
      show={!!registration}
      width="350px"
      title="Registrácia"
      gap="small"
    >
      <SidebarPanel>
        <LabelValueGroup direction="column" gap="small">
          <LabelValue label="Turnaj">
            <Anchor label={registration.event.name} href={appPath.event(registration.event.id)} />
          </LabelValue>
          <LabelValue label="Tím">
            <Box direction="row" gap="small" width="100%">
              <Anchor href={appPath.team(registration.team.id)} label={registration.team.name} />
            </Box>
          </LabelValue>
        </LabelValueGroup>
      </SidebarPanel>

      <SidebarPanelGroup title="Team" gap="medium">
        <Box overflow={{ vertical: 'auto' }} gap="medium">
          <SidebarPanel>
            <LabelValueGroup direction="column" gap="small">
              <LabelValue label="Zriaďovateľ tímu" value={fullAddress(registration.team.address)} />
            </LabelValueGroup>
          </SidebarPanel>
          <SidebarPanel label="Tréneri">
            <LabelValueGroup direction="column" gap="small" labelWidth="250px">
              {registration.team.coaches
                .filter((coach) => !coach.deletedOn)
                .map((coach) => (
                  <LabelValue
                    label={formatFullName(coach.firstName, coach.lastName)}
                    key={coach.id}
                  >
                    <Text>{coach.username}</Text>
                    <Text>{coach.phone}</Text>
                  </LabelValue>
                ))}
            </LabelValueGroup>
          </SidebarPanel>
          <SidebarPanel label="Štítky tímu">
            <TagList
              tags={registration.team.tags}
              onRemove={(id) => removeTag({ variables: { id } })}
              onAdd={(tag) =>
                addTag({ variables: { teamId: registration.team.id, tagId: tag.id } })
              }
            />
          </SidebarPanel>
          <SidebarPanel label="Registrácia">
            <LabelValueGroup direction="column" gap="small" labelWidth="250px">
              <LabelValue label="Registrácia" value={formatDate(registration.registeredOn)} />
              <FieldInvoiceIssuedOn registration={registration} />
              <FieldPaidOn registration={registration} />
              <FieldShipmentGroup registration={registration} />
              <FieldShippedOn registration={registration} />
              <FieldTeamSize registration={registration} />
              <FieldTeamSizeConfirmedOn registration={registration} />
            </LabelValueGroup>
          </SidebarPanel>
          <SidebarPanel label="Poznámky k registrácii">
            {notesLoading ? (
              <Spinner />
            ) : (
              <NoteList
                notes={notesData?.getNotes ?? []}
                limit={10}
                onCreate={(text) =>
                  createNote({
                    variables: { input: { type: 'registration', ref: registration.id, text } },
                  })
                }
              />
            )}
          </SidebarPanel>
        </Box>
      </SidebarPanelGroup>
    </ClosableSidebar>
  );
}

export default RegistrationSidebar;
