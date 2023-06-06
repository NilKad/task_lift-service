import { genArray } from '../../../utils/genArray';
import { FloorPanelNumItem } from '../FloorPanelNumItem/FloorPanelNumItem';
import * as SC from './FloorStatusPanel.styled';

export const FloorStatusPanel = () => {
  // const MIN_FLOOR = 0;
  // const MAX_FLOOR = 12;
  const parkingFloor = 0;

  return (
    <SC.FloorStatusPanel>
      <SC.FloorPanelNumList>
        {genArray().map(e => (
          <FloorPanelNumItem key={e} num={e} parkingFloor={parkingFloor} />
        ))}
      </SC.FloorPanelNumList>
      <SC.FloorDirection />
    </SC.FloorStatusPanel>
  );
};
