import styled from 'styled-components';

export const FloorCallPanels = styled.div`
  padding: 8px;
  /* background-color: lightgreen; */
  width: 50%;
  box-shadow: inset 0px 0px 15px 2px rgba(0, 0, 0, 0.11),
    inset 0px 0px 35px 0px rgba(0, 0, 0, 0.05);
  background-color: #cbcedc;
`;

export const FloorsDirectionsPaneles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  width: 40%;
`;

export const FloorPanelWrapper = styled.div`
  display: flex;
  padding: 16px 0;
`;
