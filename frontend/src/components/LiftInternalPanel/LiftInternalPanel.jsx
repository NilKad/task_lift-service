import { DigitalDisplay } from './DigitalDisplay/DigitalDisplay';
import { NumericDisplay } from './DigitalDisplay/NumericDisplay/NumericDisplay';
import * as SC from './LiftInternalPanel.styled';
import { NumericPad } from './NumericPad/NumericPad';

export const LiftInternalPanel = () => {
  return (
    <SC.LiftInternalPanel>
      <SC.Panel>
        <DigitalDisplay />
        <NumericPad />
      </SC.Panel>
    </SC.LiftInternalPanel>
  );
};
