import { difDate } from '../../utils/difDate';
import * as SC from './LIftStatus.styled';

export const LIftStatus = ({ props }) => {
  //
  const { doorOpened, isMovement, timeFloortoFloor, timerDoorClose, timerAutoDoorClose } = props;

  return (
    <SC.LIftStatus>
      <SC.Block>
        <p>Movement - {isMovement ? 'Yes' : 'No'}</p>
        <p>Door - {doorOpened ? 'Open' : 'Close'}</p>
      </SC.Block>
      <SC.Block>
        <p>Timer FloorToFloor - {timeFloortoFloor ? difDate(timeFloortoFloor) : 0}c</p>
        <p>Timing Door of Close - {timerDoorClose ? difDate(timerDoorClose) : 0}c</p>
      </SC.Block>
      <SC.Block>
        <p>__ - 0c</p>
        <p>Auto Door Close - {timerAutoDoorClose ? difDate(timerAutoDoorClose) : 0}c</p>
      </SC.Block>
    </SC.LIftStatus>
  );
};
