import styled from 'styled-components';

export const DirectionDisplay = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 35%;
  color: #64e2ff;
`;

export const Direction2 = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  transition: border 100ms linear;
  /* border-top: 16px solid white; */
  &.up {
    border-bottom: 28px solid #162426;
  }
  &.down {
    border-top: 28px solid #162426;
  }
  &.up.active {
    border-bottom: 28px solid #e5ab12;
  }
  &.down.active {
    border-top: 28px solid #e5ab12;
  }
`;

export const DirectionInt2 = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  left: 50%;
  transition: border 100ms linear;
  &.up {
    top: 50%;
    transform: translate(-50%, 8px);
    border-bottom: 20px solid #162426;
  }
  &.down {
    bottom: 50%;
    transform: translate(-50%, -8px);
    border-top: 20px solid #162426;
  }
`;
