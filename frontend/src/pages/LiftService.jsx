import { useEffect, useMemo, useState } from 'react';
import { Container } from '../components/Container/Container';
import { FloorCallPanels } from '../components/FloorCallPanels/FloorCallPanels';
import { LiftInternalPanel } from '../components/LiftInternalPanel/LiftInternalPanel';
import { Section } from '../components/Section/Section';
import * as SC from './LiftService.styled';
import {
  addCallFloor,
  getLiftStatus,
  sendCallFloorDirection,
  sendCurrentStatus,
} from '../services/apiService';
import { LIftStatus } from '../components/LIftStatus/LIftStatus';
import { difDate } from '../utils/difDate';
import { floorInfoToArray } from '../helpers/floorInfoToArray';

const T_MOVEMENT = 2;
const T_DOOR_OPEN_CLOSE = 2;
const T_AUTO_DOOR_CLOSE = 5;
const MIN_FLOOR = 0;
const MAX_FLOOR = 12;

const PARKING_FLOOR = 0;

export const LiftService = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isMovement, setIsMovement] = useState(false);
  const [direction, setDirection] = useState(0);
  const [load, setLoad] = useState([]);
  const [doorOpened, setDoorOpened] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [floorInfo, setFloorInfo] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const [timeFloortoFloor, setTimeFloortoFloor] = useState(null);
  const [timerDoorClose, setTimerDoorClose] = useState(null);
  const [timerAutoDoorClose, setTimerAutoDoorClose] = useState(0);
  const [doorOpening, setDoorOpening] = useState(false);

  // const [dataFromServer, setDataFromServer] = useState({});

  // const idTimerMovement = useRef(null);
  // const idTimeDoorClose = useRef(null);
  // const idTimerAutoDoorClose = useRef(null);

  const forStatus = {
    doorOpened,
    isMovement,
    timeFloortoFloor,
    timerDoorClose,
    timerAutoDoorClose,
  };
  //* ****** LiftCore all logic lift *******
  const liftCore = async ({
    isNeedOpenDoor = false,
    isNeedCloseDoor = false,
    enterExit = false,
  }) => {
    const checkNeedOpenDoor = (floor = currentFloor) => {
      if (load.includes(floor)) return true;
      for (const e of floorInfo) {
        if (floor !== e.floor) continue;
        if (direction === 0 && !doorOpened) return true;

        if ((direction === 1 && e.continue_up) || (direction === -1 && e.continue_down))
          return true;
      }
      // проверка max min floor
      if (isMovement) if (direction === 1 && floor === MAX_FLOOR) return true;
      if (direction === -1 && floor === MIN_FLOOR) return true;

      //если лифт едет вверх и есть вызовы на этажах в низ, то лифт доетет до смого врхнего и остановиться там
      const arr = floorInfoToArray(floorInfo, direction === -1 ? 'continue_up' : 'continue_down');
      // если едем вверх проверяем load, если есть, то дверь не открываем
      if (direction === 1 && currentFloor < load.sort((a, b) => b - a)[0]) return false;
      if (direction === -1 && currentFloor > load.sort((a, b) => a - b)[0]) return false;

      if (direction === 1 && currentFloor === arr.sort((a, b) => b - a)[0]) return true;
      if (direction === -1 && currentFloor === arr.sort((a, b) => a - b)[0]) return true;
      return false;
    };

    const checkIsNeedToMove = () => {
      return load.length > 0 || floorInfo.length > 0;
    };
    const startToNextFloor = () => {
      const currentDate = new Date();
      setTimeFloortoFloor(currentDate.setSeconds(currentDate.getSeconds() + T_MOVEMENT));
    };

    const startToOpenCloseDoor = () => {
      if (doorOpened) {
        setDoorOpening(false);
      } else {
        setDoorOpening(true);
      }
      const currentDate = new Date();
      console.log('!!!!!!!! set OpenDoor');
      setTimerDoorClose(currentDate.setSeconds(currentDate.getSeconds() + T_DOOR_OPEN_CLOSE));
    };

    const startAutoDoorClose = () => {
      const currentDate = new Date();
      console.log('!!!!!!!! set AutoDoorClose');
      setTimerAutoDoorClose(currentDate.setSeconds(currentDate.getSeconds() + T_AUTO_DOOR_CLOSE));
    };

    const stopMotor = async (floor = currentFloor) => {
      const data = await sendCurrentStatus({
        floorNum: floor,
        isMovement: false,
        doorOpened,
      });
      updateStatus(data);
    };
    const startMotor = async () => {
      const data = await sendCurrentStatus({
        floorNum: currentFloor,
        isMovement: true,
        doorOpened,
      });
      console.log('!!!!!!!!----- startMotor');
      startToNextFloor();
      updateStatus(data);
    };

    const sendStatusToServer = async ({ floor = currentFloor, doorOpened }) => {
      const data = await sendCurrentStatus({
        floorNum: floor,
        isMovement,
        doorOpened,
      });
      updateStatus(data);
    };

    //* check all timers
    const checkOneTimer = (data, setData) => {
      if (data !== null) {
        if (difDate(data) <= 0) {
          setData(null);
          return true;
        }
      }
      return false;
    };
    const checkAllTimer = async () => {
      if (
        checkOneTimer(timeFloortoFloor, setTimeFloortoFloor) &&
        checkNeedOpenDoor(currentFloor + direction)
      ) {
        await stopMotor(currentFloor + direction);
        startToOpenCloseDoor();
      }
      if (checkOneTimer(timerDoorClose, setTimerDoorClose)) {
        if (doorOpened) {
          await sendStatusToServer({ doorOpened: false });
        } else {
          await sendStatusToServer({ doorOpened: true });
          startAutoDoorClose();
        }
      }
      if (checkOneTimer(timerAutoDoorClose, setTimerAutoDoorClose) && doorOpened) {
        startToOpenCloseDoor();
      }
      //* shield from opening door
      if (doorOpened && timerDoorClose === null && timerAutoDoorClose === null) {
        startAutoDoorClose();
      }

      //* if all timers null & not movement & door close & direction None & need Open Door
      if (
        !timerDoorClose &&
        !timeFloortoFloor &&
        !timerAutoDoorClose &&
        !isMovement &&
        !doorOpened &&
        direction === 0 &&
        checkNeedOpenDoor()
      ) {
        startToOpenCloseDoor();
      }
    };
    checkAllTimer();
    //* ---------------- End check all timers

    //press openButton
    if (!isMovement && (isNeedOpenDoor || enterExit) && timerDoorClose !== null) {
      setDoorOpening(true);
      setTimerDoorClose(null);
      startAutoDoorClose();
    }
    //press closeButton
    if (!isMovement && isNeedCloseDoor && doorOpening) {
      setDoorOpening(false);
      setTimerAutoDoorClose(null);
      startToOpenCloseDoor();
    }
    //enterExit in lift
    if (!isMovement && enterExit && (timerAutoDoorClose || timerDoorClose)) {
      setDoorOpening(true);
      setTimerDoorClose(null);
      startAutoDoorClose();
    }

    if (direction === 0 && isMovement) {
      setIsMovement(false);
      await stopMotor();
      return;
    }

    // лифт едет и должен ехать дальше, перезапуск таймера
    // console.log('checkNeedOpenDoor: ', checkNeedOpenDoor());
    if (!timeFloortoFloor && direction !== 0 && isMovement && !checkNeedOpenDoor()) {
      console.log('!!!__!!!');
      const data = await sendCurrentStatus({
        floorNum: currentFloor + direction,
        isMovement,
        doorOpened,
      });
      updateStatus(data);
      if (!checkNeedOpenDoor()) startToNextFloor();
    }

    // лифт должен поехать:
    // - есть напр.движения / не движется
    // - двери закрыты / таймер двери в нуле
    // нкжно ли кудато ехать
    // * тогда включить мотор и запустить таймер этажа
    // console.log('---LiftCore checkNeedOpenDoor : ', checkNeedOpenDoor());
    if (
      direction !== 0 &&
      !isMovement &&
      !doorOpened &&
      timerDoorClose === null &&
      timeFloortoFloor === null
    ) {
      if (checkNeedOpenDoor()) startToOpenCloseDoor();
      if (!checkNeedOpenDoor() && checkIsNeedToMove()) startMotor();
    }
  };
  //* ******** end lift core *******

  //* Upadte current status from server
  const updateStatus = data => {
    let {
      movement,
      direction: dataDirection,
      current_floor,
      doors_opened,
      load: dataLoad,
      floor_info,
    } = data;

    setIsMovement(movement);
    setDirection(dataDirection);
    if (current_floor !== currentFloor) setCurrentFloor(current_floor);
    setDoorOpened(doors_opened);
    setLoad([...dataLoad]);
    setFloorInfo(floor_info);
  };
  //* ------- end Upadte current status from server

  const liftHandlerButton = async e => {
    const t = e.target.textContent;
    let num = t === 'P' ? PARKING_FLOOR : Number.parseInt(t);
    if (t === '<>' || t === '><') {
      const isNeedOpenDoor = t === '<>' ? true : false;
      const isNeedCloseDoor = t === '><' ? true : false;
      liftCore({ isNeedOpenDoor, isNeedCloseDoor });
      return;
    }
    const data = await addCallFloor({ num });
    updateStatus(data);
  };

  const enterExitHandler = () => {
    liftCore({ enterExit: true });
  };

  const floorDirectionHandler = async ({ floorNum, floorDirection }) => {
    const data = await sendCallFloorDirection({ floorNum, floorDirection });
    updateStatus(data);
  };

  const loadData = async () => {
    const data = await getLiftStatus();
    // setDataFromServer(data);
    updateStatus(data);
  };

  useEffect(() => {
    if (intervalId) return;
    setIsFirstLoading(true);
    loadData();
    const t = setInterval(() => loadData(), 1000);
    setIntervalId(t);
  }, [direction, doorOpened, floorInfo.length, intervalId, isMovement, loadData]);

  useMemo(() => {
    liftCore({});
  }, [isMovement, direction, load, doorOpened, currentFloor, floorInfo]);

  return (
    <Section>
      <Container>
        {isFirstLoading && (
          <>
            <LIftStatus props={forStatus} />
            <SC.LiftService>
              <FloorCallPanels
                floorInfo={floorInfo}
                currentFloor={currentFloor}
                floorDirectionHandler={floorDirectionHandler}
                enterExitHandler={enterExitHandler}
                direction={direction}
                doorOpened={doorOpened}
                timerDoorClose={timerDoorClose}
                doorOpening={doorOpening}
              />
              <LiftInternalPanel
                load={load}
                currentFloor={currentFloor}
                direction={direction}
                liftHandlerButton={liftHandlerButton}
              />
            </SC.LiftService>
          </>
        )}
      </Container>
    </Section>
  );
};
