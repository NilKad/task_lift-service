import * as SC from './FloorPanelNumItem.styled';

export const FloorPanelNumItem = ({ num, parkingFloor, currentFloor }) => {
  return (
    <SC.FloorPanelNumItem className={num === currentFloor && 'active'}>
      <SC.Num>{num === parkingFloor ? 'P' : num}</SC.Num>
    </SC.FloorPanelNumItem>
  );
};
