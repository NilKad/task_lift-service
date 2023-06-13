import * as SC from './LiftSimulate.styled';
import liftBackground from '../../img/lift.jpg';
import arrow from '../../img/arrow.png';

export const LiftSimulate = ({ doorOpened, timerDoorClose, doorOpening }) => {
  // console.log(dataFromServer);
  // const isOpen = doorOpened ? 'open' : '';
  const isOpen = doorOpening ? 'open' : '';
  return (
    <SC.LiftSimulate>
      {/* <p>{JSON.stringify(dataFromServer)}</p>
      <p>{dataFromServer.toString()}</p> */}
      <SC.LiftFrame
        style={{
          backgroundImage: `url(${liftBackground})`,
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'contain',
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
          <SC.ArrowImg src={arrow} width={'100px'} />
          <SC.ArrowImg className={'rotate'} src={arrow} width={'100px'} />
        </SC.Arrow>
      </SC.LiftFrame>
    </SC.LiftSimulate>
  );
};
