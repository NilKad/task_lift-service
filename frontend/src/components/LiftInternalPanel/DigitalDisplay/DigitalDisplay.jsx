import { DirectionDisplay } from './DirectionDisplay/DirectionDisplay';
import { NumericDisplay } from './NumericDisplay/NumericDisplay';
import * as SC from './DigitalDisplay.styled';

export const DigitalDisplay = ({ currentFloor, direction }) => {
  return (
    <SC.DigitalDisplay>
      <NumericDisplay currentFloor={currentFloor} />
      <DirectionDisplay direction={direction} />
    </SC.DigitalDisplay>
  );
};
