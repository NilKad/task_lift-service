import * as SC from './FloorDirectionPanel.styled';

export const FloorDirectionPanel = ({ floorNum, parkingFloor, MAX_FLOOR }) => {
  return (
    <SC.FloorDirectionPanel>
      <SC.FloorInfo>
        <SC.FloorTitle>floor</SC.FloorTitle>
        <SC.FloorNumber>
          {floorNum === parkingFloor ? 'P' : floorNum}
        </SC.FloorNumber>
      </SC.FloorInfo>
      <SC.FloorDirection>
        <SC.DirectionWrapper>
          {floorNum !== MAX_FLOOR && (
            <SC.Direction className={'up '}>
              <SC.DirectionInt className={'up'} />
            </SC.Direction>
          )}
          {floorNum !== parkingFloor && (
            <SC.Direction className={'down'}>
              <SC.DirectionInt className={'down'} />
            </SC.Direction>
          )}
        </SC.DirectionWrapper>
      </SC.FloorDirection>
    </SC.FloorDirectionPanel>
  );
};
