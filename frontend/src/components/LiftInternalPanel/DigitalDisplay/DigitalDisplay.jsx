import { DirectionDisplay } from './DirectionDisplay/DirectionDisplay';
import { NumericDisplay } from './NumericDisplay/NumericDisplay';
import * as SC from './DigitalDisplay.styled';

export const DigitalDisplay = () => {
  return (
    <SC.DigitalDisplay>
      <NumericDisplay />
      <DirectionDisplay />
    </SC.DigitalDisplay>
  );
};
