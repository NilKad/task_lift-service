import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/Container/Container';
import { FloorCallPanels } from '../components/FloorCallPanels/FloorCallPanels';
import { LiftInternalPanel } from '../components/LiftInternalPanel/LiftInternalPanel';
import { Section } from '../components/Section/Section';
import * as SC from './LiftService.styled';

export const LiftService = () => {
  const isLoading = useRef(false);
  const [liftState, setLiftState] = useState({});

  return (
    <Section>
      <Container>
        {isLoading(
          <SC.LiftService>
            <FloorCallPanels />
            <LiftInternalPanel />
          </SC.LiftService>
        )}
      </Container>
    </Section>
  );
};
