import * as SC from './DirectionDisplay.styled';

export const DirectionDisplay = () => {
  return (
    <SC.DirectionDisplay>
      <SC.Direction2 className={'up active'}>
        <SC.DirectionInt2 className="up" />
      </SC.Direction2>
      <SC.Direction2 className={'down '}>
        <SC.DirectionInt2 className="down" />
      </SC.Direction2>
    </SC.DirectionDisplay>
  );
};
