import styled from 'styled-components';

export const LiftInternalPanel = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 24px;
  width: 50%;
  background-color: #cbcedc;
  box-shadow: inset 0px 0px 15px 2px rgba(0, 0, 0, 0.11),
    inset 0px 0px 35px 0px rgba(0, 0, 0, 0.05);
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 25px;
  min-width: 350px;
  width: 400px;
  height: 630px;
  border-radius: 20px;
  background-color: #b8bbcc;
  box-shadow: 5px 5px 10px rgba(190, 190, 190, 0.9),
    -7px -7px 20px rgba(255, 255, 255, 0.4);
`;
