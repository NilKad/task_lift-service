import { Container } from '../components/Container/Container'
import { FloorCallPanels } from '../components/FloorCallPanels/FloorCallPanels';
import { LiftInternalPanel } from '../components/LiftInternalPanel/LiftInternalPanel';
import { Section } from '../components/Section/Section';
import * as SC from './LiftService.styled';

export const LiftService = () => {
  return <Section>
    <Container>
      <SC.LiftService>
        <FloorCallPanels />
        <LiftInternalPanel />

      </SC.LiftService>
    </Container>
  </Section>
}