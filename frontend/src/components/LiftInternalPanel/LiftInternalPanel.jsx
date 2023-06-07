import { DigitalDisplay } from './DigitalDisplay/DigitalDisplay';
import { NumericDisplay } from './DigitalDisplay/NumericDisplay/NumericDisplay';
import * as SC from './LiftInternalPanel.styled';
import { NumericPad } from './NumericPad/NumericPad';

export const LiftInternalPanel = ({
  load,
  currentFloor,
  direction,
  liftHandlerButton,
}) => {
  return (
    <SC.LiftInternalPanel>
      <SC.Panel>
        <DigitalDisplay currentFloor={currentFloor} direction={direction} />
        <NumericPad load={load} liftHandlerButton={liftHandlerButton} />
      </SC.Panel>
    </SC.LiftInternalPanel>
  );
};
