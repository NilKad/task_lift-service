import styled from 'styled-components';

export const FloorDirectionPanel = styled.div`
  display: flex;
  width: 90px;
  height: 70px;
  padding: 6px 4px;
  background-color: white;
  border: 2px solid #00a2e8;
  color: #00a2e8;
`;

export const FloorInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  width: 50%;
  text-align: center;
  line-height: 1;
  /* outline: 1px solid red; */
`;

export const FloorTitle = styled.h2`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  font-size: 11px;
  text-align: center;
  font-weight: 400;
`;

export const FloorNumber = styled.p`
  font-size: 33px;
  font-weight: 500;
`;

export const FloorDirection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* outline: 1px solid green; */
  width: 50%;
`;

export const DirectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  width: 30px;
  height: 52px;
  border-radius: 6px;
  border: 2px solid #99d9ea;
  background-color: #00a2e8;
`;

export const Direction = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  transition: border 200ms linear;
  /* border-top: 16px solid white; */
  &.up {
    border-bottom: 16px solid white;
  }
  &.down {
    border-top: 16px solid white;
  }
  &:hover.up {
    border-bottom: 16px solid #e2cf38;
  }
  &:hover.down {
    border-top: 16px solid #e2cf38;
  }
`;

export const DirectionInt = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  left: 50%;
  transition: border 200ms linear;
  &.up {
    top: 50%;
    transform: translate(-50%, 4px);
    border-bottom: 10px solid #00a2e8;
  }
  &.down {
    bottom: 50%;
    transform: translate(-50%, -4px);
    border-top: 10px solid #00a2e8;
  }
  &.up.active {
    border-bottom: 10px solid white;
  }
  &.down.active {
    border-top: 10px solid white;
  }
  &:hover.up {
    /* border-bottom: 13px solid green; */
  }
`;
