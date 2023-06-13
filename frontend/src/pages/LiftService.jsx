import { useEffect, useMemo, useRef, useState } from 'react';
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

const initLoad = [4, 6, 2, 8];
const initDirection = 1;
const initFloorInfo = [
  {
    floor: 4,
    continue_up: true,
  },
  {
    floor: 6,
    continue_down: true,
  },
  {
    floor: 8,
    continue_up: true,
    continue_down: true,
  },
  {
    floor: 0,
    continue_up: true,
  },
];
const T_MOVEMENT = 2;
const T_DOOR_OPEN_CLOSE = 2;
const T_AUTO_DOOR_CLOSE = 5;

const MIN_FLOOR = 0;
const MAX_FLOOR = 12;

const parkingFloor = 0;

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
  // const  dataFromServer = useRef();
  const [dataFromServer, setDataFromServer] = useState({});

  const idTimerMovement = useRef(null);
  const idTimeDoorClose = useRef(null);
  const idTimerAutoDoorClose = useRef(null);

  const forStatus = {
    doorOpened,
    isMovement,
    timeFloortoFloor,
    timerDoorClose,
    timerAutoDoorClose,
  };
  //* ****** LiftCore all logic lift *******
  const liftCore = async () => {
    console.log('!! Start liftCore');

    const checkNeedOpenDoor = (floor = currentFloor) => {
      console.log('!! Start liftCore checkNeedOpenDoor');

      if (load.includes(floor)) return true;

      console.log('!! Start liftCore checkNeedOpenDoor #1');
      for (const e of floorInfo) {
        if (floor !== e.floor) continue;
        if (direction === 0 && !doorOpened) return true;

        if ((direction === 1 && e.continue_up) || (direction === -1 && e.continue_down))
          return true;
      }

      console.log('!! Start liftCore checkNeedOpenDoor #2');
      //если лифт едет вверх и есть вызовы на этажах в низ, то лифт доетет до смого врхнего и остановиться там
      const arr = floorInfoToArray(floorInfo, direction === -1 ? 'continue_up' : 'continue_down');
      console.log('****checkNeedOpenDoor arr: ', arr);
      // если едем вверх проверяем load, если есть, то дверь не открываем
      if (direction === 1 && currentFloor < load.sort((a, b) => b - a)[0]) return false;
      if (direction === -1 && currentFloor > load.sort((a, b) => a - b)[0]) return false;

      if (direction === 1 && currentFloor === arr.sort((a, b) => b - a)[0]) return true;
      if (direction === -1 && currentFloor === arr.sort((a, b) => a - b)[0]) return true;
      console.log('!! Start liftCore checkNeedOpenDoor #3');

      //check max & min floor
      // const max = Math.max(...floorInfo.map(e => e.floor));
      // const min = Math.min(...floorInfo.map(e => e.floor));
      // if (load.length === 0 && floorInfo.length === 1 && direction === 1 && floor <= max)
      //   return true;
      // if (load.length === 0 && floorInfo.length === 1 && direction === -1 && floor >= min)
      //   return true;
      // // console.log('checkNeedOpenDoor false');
      return false;
    };
    const checkIsNeedToMove = () => {
      return load.length > 0 || floorInfo.length > 0;
    };
    const startToNextFloor = () => {
      const currentDate = new Date();
      console.log('!!!!!!!! set florToFloor');
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

    const incrementFloor = () => {
      setCurrentFloor(currentFloor + direction);
      // if()
    };

    const checkIsNeedStopOnFloor = () => {
      if (checkNeedOpenDoor()) {
        stopMotor();
        //open door
        return;
      }
      //start new timer for FloorToFloor
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
        console.log('!!CheckAlltimer checkNeedOpenDoor START OPEN DOOR');
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

      if (
        !timerDoorClose &&
        !timeFloortoFloor &&
        !timerAutoDoorClose &&
        !isMovement &&
        !doorOpened &&
        direction === 0 &&
        floorInfo.length > 0 &&
        checkNeedOpenDoor()
      ) {
        startToOpenCloseDoor();
      }
      if (
        !timerDoorClose &&
        !timeFloortoFloor &&
        !timerAutoDoorClose &&
        !isMovement &&
        !doorOpened &&
        direction === 0 &&
        floorInfo.length === 0 &&
        load.includes(currentFloor) &&
        checkNeedOpenDoor()
      ) {
        startToOpenCloseDoor();
      }

      // await sendStatusToServer({ doorOpened: false });

      // checkOneTimer(timerAutoDoorClose, setTimerAutoDoorClose);
    };
    checkAllTimer();
    //* ---------------- End check all timers

    console.log('!! Start liftCore checkNeedOpenDoor #10');
    if (direction === 0 && isMovement) {
      setIsMovement(false);
      console.log('!!!!! shield isMovement: ', isMovement);
      // sendToServer();
      await stopMotor();
      return;
    }

    console.log('!! Start liftCore restart floorToFloor timer #11');
    // лифт едет и должен ехать дальше, перезапуск таймера
    if (!timeFloortoFloor && direction !== 0 && isMovement && !checkNeedOpenDoor()) {
      const data = await sendCurrentStatus({
        floorNum: currentFloor + direction,
        isMovement,
        doorOpened,
      });
      updateStatus(data);
      if (!checkNeedOpenDoor()) startToNextFloor();
    }

    console.log('!! Start liftCore need start motor #12');
    // лифт стоит и нужно открыть дверь
    // if(!isMovement && checkNeedOpenDoor())

    // лифт должен поехать:
    // - есть напр.движения / не движется
    // - двери закрыты / таймер двери в нуле
    //! ??? не нужно окрывать двери на этом этаже
    // нкжно ли кудато ехать
    // * тогда включить мотор и запустить таймер этажа
    console.log('---LiftCore checkNeedOpenDoor : ', checkNeedOpenDoor());
    if (
      direction !== 0 &&
      !isMovement &&
      !doorOpened &&
      timerDoorClose === null &&
      timeFloortoFloor === null &&
      checkNeedOpenDoor()
    ) {
      console.log('---LiftCore door OPENED! checkNeedOpenDoor : ', checkNeedOpenDoor());
      startToOpenCloseDoor();
    }
    if (
      direction !== 0 &&
      !isMovement &&
      !doorOpened &&
      timerDoorClose === null &&
      timeFloortoFloor === null &&
      !checkNeedOpenDoor() &&
      checkIsNeedToMove()
    ) {
      console.log('!!!Need to move');
      console.log('!CORE ismovement: ', isMovement);
      // включить таймер
      startMotor();
    }
    console.log('!! Start liftCore motor not start #13');
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

    //* check wrong situation
    if (movement && (dataDirection === 0 || doors_opened)) {
      //critical situation!!! stop motor
      // movement = false;
    }
    // console.log(
    //   '***Update Status*** isMovement: ',
    //   isMovement,
    //   '\tdirection: ',
    //   direction,
    //   '\tDataDirection: ',
    //   dataDirection
    // );
    setIsMovement(movement);
    setDirection(dataDirection);
    // if (dataDirection !== direction) {
    //   console.log('Update direction');
    // }
    if (current_floor !== currentFloor) setCurrentFloor(current_floor);
    setDoorOpened(doors_opened);
    setLoad([...dataLoad]);
    setFloorInfo(floor_info);
    // if (!isMovement && !doorOpened && direction === 0 && floorInfo.length > 0) liftCore();
  };
  //* ------- end Upadte current status from server

  const liftHandlerButton = async e => {
    const t = e.target.textContent;
    const num = t === 'P' ? parkingFloor : Number.parseInt(t);
    const data = await addCallFloor({ num });
    updateStatus(data);
  };
  const floorDirectionHandler = async ({ floorNum, floorDirection }) => {
    const data = await sendCallFloorDirection({ floorNum, floorDirection });
    updateStatus(data);
  };

  const loadData = async () => {
    const data = await getLiftStatus();
    setDataFromServer(data);
    updateStatus(data);
  };

  useEffect(() => {
    // console.log('useeffect isMovement: ', isMovement);
    if (intervalId) return;
    setIsFirstLoading(true);
    loadData();
    const t = setInterval(() => loadData(), 1000);
    setIntervalId(t);
  }, [direction, doorOpened, floorInfo.length, intervalId, isMovement, loadData]);

  // useEffect(() => {
  //   if (isMovement && idTimerMovement) return;
  // }, [isMovement]);

  useMemo(() => {
    console.log('useMemo isMovement: ', isMovement, '\tcurrentFloor: ', currentFloor);
    liftCore();
  }, [
    isMovement,
    direction,
    load,
    doorOpened,
    currentFloor,
    floorInfo,
    // timeFloortoFloor,
    // timerDoorClose,
    // timerAutoDoorClose,
  ]);
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
