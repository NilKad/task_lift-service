import styled from 'styled-components';

export const FloorStatusPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 46px;
  border: 6px solid #99d9ea;
  background-color: #00a2e8;
  margin-left: auto;
  margin-right: auto;
  border-radius: 70px/10px;
  box-shadow: 5px 5px 10px rgba(190, 190, 190, 0.9),
    -7px -7px 20px rgba(255, 255, 255, 0.4);
`;

export const FloorPanelNumList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

export const FloorDirection = styled.div`
  margin-left: 4px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  &.up {
    border-bottom: 12px solid white;
  }
  &.down {
    border-top: 12px solid white;
  }
`;
