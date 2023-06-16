import styled from 'styled-components';

export const ButtonItem = styled.li`
  display: flex;
  justify-content: center;
  width: calc((100% - 60px * 2 - 16px) / 2);
`;

export const NumericButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  color: #595959;

  box-shadow: -4px -4px 11px rgba(255, 255, 255, 0.3),
    5px 5px 5px rgba(70, 70, 70, 0.12),
    inset -10px -10px 15px rgba(255, 255, 255, 0.5),
    inset 10px 10px 11px rgba(70, 70, 70, 0.25);
  border: 4px solid #b8bab6;
  background-color: #bec0c9;
  text-shadow: inset 3px 3px 5px rgba(255, 255, 255, 0.5);

  &.active {
    border: 4px solid #80cf30;
  }

  &:hover {
    color: #c59207;
  }
`;
