import * as SC from './FloorPanelNumItem.styled';

export const FloorPanelNumItem = ({ num, parkingFloor }) => {
  return (
    <SC.FloorPanelNumItem>
      <SC.Num>{num === parkingFloor ? 'P' : num}</SC.Num>
    </SC.FloorPanelNumItem>
  );
};
