import * as SC from './LiftSimulate.styled';
import liftBackground from '../../img/lift.jpg';
import arrow from '../../img/arrow.png';

export const LiftSimulate = ({ doorOpened, timerDoorClose, doorOpening, enterExitHandler }) => {
  const isOpen = doorOpening ? 'open' : '';
  return (
    <SC.LiftSimulate>
      <SC.LiftFrame
        style={{
          backgroundImage: `url(${liftBackground})`,
        }}
      >
        <SC.LiftDoor className={`left ${isOpen} `}>
          <SC.ExtBorder className={'ext'} />
          <SC.IntBorder className={'int'} />
        </SC.LiftDoor>
        <SC.LiftDoor className={`rigth ${isOpen} `}>
          <SC.ExtBorder className={'ext'} />
          <SC.IntBorder className={'int'} />
        </SC.LiftDoor>
        <SC.Arrow className={isOpen ? 'arrowShow' : ''}>
          <SC.ArrowImg src={arrow} width={'100px'} onClick={enterExitHandler} />
          <SC.ArrowImg
            className={'rotate'}
            src={arrow}
            width={'100px'}
            onClick={enterExitHandler}
          />
        </SC.Arrow>
      </SC.LiftFrame>
    </SC.LiftSimulate>
  );
};
