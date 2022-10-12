import React from 'react';
import { Box, Button, Spinner, Text } from 'grommet';
import { ProgramTile } from '../../../components/program-tile';
import { ProgramListFragmentFragment, useGetProgramsQuery } from '../../../generated/graphql';
import { RegisterDetails } from './types';

interface RegisterSelectProgramProps {
  details: RegisterDetails;
  onSubmit: (program: ProgramListFragmentFragment) => void;
  nextStep: () => void;
  prevStep: () => void;
  cancel: () => void;
}

export function RegisterSelectProgram(props: RegisterSelectProgramProps) {
  const { details, onSubmit, nextStep, prevStep, cancel } = props;
  const { data, loading } = useGetProgramsQuery({ variables: { filter: { isActive: true } } });

  if (loading) {
    return <Spinner />;
  }

  const programs = data?.getPrograms ?? [];

  return (
    <Box gap="medium">
      <Text>Vyberte program v rámci, ktorého sa chcete prihlásiť na turnaj:</Text>

      {programs.map((program) => (
        <ProgramTile
          key={program.id}
          program={program}
          onClick={() => onSubmit(program)}
          selected={details.program?.id === program.id}
          disabled={program.maxTeams && program.regCount >= program.maxTeams ? true : false}
          showNotice
        />
      ))}
      <Box justify="between" direction="row">
        <Button label="Späť" onClick={prevStep} />
        <Button plain label="Zrušiť" hoverIndicator onClick={cancel} />
        <Button primary label="Pokračovať" onClick={nextStep} disabled={!details.program?.id} />
      </Box>
    </Box>
  );
}
