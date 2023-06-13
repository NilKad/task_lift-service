import * as SC from './FloorDirectionPanel.styled';

export const FloorDirectionPanel = ({
  floorNum,
  parkingFloor,
  MAX_FLOOR,
  currentFloor,
  floorDirectionHandler,
  activeDirections,
}) => {
  const {} = activeDirections;
  const isFloorActive = currentFloor === floorNum ? 'active' : '';
  // const direction = () => {};
  const callDirection = str => {
    for (const e of floorInfo) {
      if (e.floor !== floorNum) continue;
      if ((str === 'up' && 'continue_up' in e) || (str === 'down' && 'continue_down' in e))
        return 'active';
    }
    return '';
  };
  const isShowLifgtButton = () => {};
  const onClickHandler = e => {
    //* check isue this floor and direction
    const classList = e.target.classList;
    if (classList.contains('up') && callDirection('up') === '') {
      floorDirectionHandler({ floorNum, floorDirection: 'up' });
    }
    if (classList.contains('down') && callDirection('down') === '') {
      floorDirectionHandler({ floorNum, floorDirection: 'down' });
    }
  };
  return (
    <SC.FloorDirectionPanel>
      <SC.FloorInfo>
        <SC.FloorTitle>floor</SC.FloorTitle>
        <SC.FloorNumber className={isFloorActive}>
          {floorNum === parkingFloor ? 'P' : floorNum}
        </SC.FloorNumber>
      </SC.FloorInfo>
      <SC.FloorDirection>
        <SC.DirectionWrapper>
          {floorNum !== MAX_FLOOR && (
            <SC.Direction className={`up ${up}  `} onClick={e => onClickHandler(e)}>
              <SC.DirectionInt className={'up'} />
            </SC.Direction>
          )}
          {floorNum !== parkingFloor && (
            <SC.Direction className={`down ${down} `} onClick={e => onClickHandler(e)}>
              <SC.DirectionInt className={'down'} />
            </SC.Direction>
          )}
        </SC.DirectionWrapper>
      </SC.FloorDirection>
    </SC.FloorDirectionPanel>
  );
};
