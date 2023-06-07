import { useEffect, useRef, useState } from 'react';
import { Container } from '../components/Container/Container';
import { FloorCallPanels } from '../components/FloorCallPanels/FloorCallPanels';
import { LiftInternalPanel } from '../components/LiftInternalPanel/LiftInternalPanel';
import { Section } from '../components/Section/Section';
import * as SC from './LiftService.styled';

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

export const LiftService = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isMovement, setIsMovement] = useState(false);
  const [direction, setDirection] = useState(initDirection);
  const [load, setLoad] = useState([]);
  const [doorOpened, setDoorOpened] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [floorInfo, setFloorInfo] = useState(initFloorInfo);

  const [liftState, setLiftState] = useState({});

  const liftHandlerButton = e => {
    const num = Number.parseInt(e.target.textContent);
    if (!load.includes(num)) {
      setLoad([...load, num]);
    }
  };
  const floorDirectionHandler = e => {
    let isFound = false;
    const data = floorInfo.map(item => {
      if (item.floor !== e.floor) return item;
      isFound = true;
      return { ...item, ...e };
    });
    if (!isFound) {
      data.push(e);
    }
    setFloorInfo(data);
  };

  const loadData = async () => {
    setLoad(initLoad);
    setIsFirstLoading(true);
  };

  useEffect(() => {
    if (isFirstLoading) return;
    loadData();
  }, [isFirstLoading]);

  return (
    <Section>
      <Container>
        {isFirstLoading && (
          <SC.LiftService>
            <FloorCallPanels
              floorInfo={floorInfo}
              currentFloor={currentFloor}
              floorDirectionHandler={floorDirectionHandler}
              direction={direction}
            />
            <LiftInternalPanel
              load={load}
              currentFloor={currentFloor}
              direction={direction}
              liftHandlerButton={liftHandlerButton}
            />
          </SC.LiftService>
        )}
      </Container>
    </Section>
  );
};
