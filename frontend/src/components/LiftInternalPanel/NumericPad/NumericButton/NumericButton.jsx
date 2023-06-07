import * as SC from './NumericButton.styled';

export const NumericButton = ({
  floorNum,
  parkingFloor,
  isActive,
  liftHandlerButton,
}) => {
  const ca = () => {
    // return floorNum === 0 ? 'grow1' : 'grow3';
    return '';
  };
  return (
    <SC.ButtonItem className={ca()}>
      <SC.NumericButton
        type="button"
        className={isActive && 'active'}
        onClick={liftHandlerButton}
      >
        {floorNum === parkingFloor ? 'P' : floorNum}
      </SC.NumericButton>
    </SC.ButtonItem>
  );
};
