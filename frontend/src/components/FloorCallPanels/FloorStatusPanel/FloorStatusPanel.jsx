import { genArray } from '../../../utils/genArray';
import { FloorPanelNumItem } from '../FloorPanelNumItem/FloorPanelNumItem';
import * as SC from './FloorStatusPanel.styled';

export const FloorStatusPanel = ({ currentFloor, direction }) => {
  const parkingFloor = 0;
  const directionStatus = () => {
    if (direction === -1) return 'down';
    if (direction === 1) return 'up';
    return '';
  };

  return (
    <SC.FloorStatusPanel>
      <SC.FloorPanelNumList>
        {genArray().map(e => (
          <FloorPanelNumItem
            key={e}
            num={e}
            parkingFloor={parkingFloor}
            currentFloor={currentFloor}
          />
        ))}
      </SC.FloorPanelNumList>
      <SC.FloorDirection className={directionStatus()} />
    </SC.FloorStatusPanel>
  );
};
