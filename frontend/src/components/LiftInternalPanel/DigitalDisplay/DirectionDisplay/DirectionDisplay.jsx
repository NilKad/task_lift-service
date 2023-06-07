import * as SC from './DirectionDisplay.styled';

export const DirectionDisplay = ({ direction }) => {
  const retDirection = str => {};
  return (
    <SC.DirectionDisplay>
      <SC.Direction2 className={`up ${direction === 1 && 'active'}`}>
        <SC.DirectionInt2 className="up" />
      </SC.Direction2>
      <SC.Direction2 className={`down ${direction === -1 && 'active'}`}>
        <SC.DirectionInt2 className="down" />
      </SC.Direction2>
    </SC.DirectionDisplay>
  );
};
