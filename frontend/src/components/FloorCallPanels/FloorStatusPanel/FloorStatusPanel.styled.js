import styled from 'styled-components';

export const FloorStatusPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  border: 6px solid #99d9ea;
  background-color: #00a2e8;
  margin-left: auto;
  margin-right: auto;
  border-radius: 70px/10px;
`;

export const FloorPanelNumList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: white;
  /* justify-content: center; */
`;

export const FloorDirection = styled.div`
  margin-left: 4px;
  width: 0;
  height: 0;
  /* background-color: white; */
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  /* border-top: 12px solid white; */
  &.up {
    border-bottom: 12px solid white;
  }
  &.down {
    border-top: 12px solid white;
  }
`;
