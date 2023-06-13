import lift from '../../img/lift.jpg';
import styled from 'styled-components';

export const LiftSimulate = styled.div`
  width: 50%;
`;

export const LiftFrame = styled.div`
  position: relative;

  display: flex;
  overflow: hidden;
  margin-top: 16px;
  width: 100%;
  height: 550px;
  border: 10px solid grey;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const LiftDoor = styled.div`
  position: relative;
  /* overflow: hidden; */
  width: 50%;
  transition: transform 2s cubic-bezier(0, 0, 0.6, 1);
  backdrop-filter: blur(5px);
  border: 20px solid #b8bbcc;
  /* box-shadow: -5px 0px 10px red; */
  &.left .ext,
  &.rigth .ext {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% + 40px);
    transform: translate(-18px, -20px);
  }
  &.left .ext {
    width: calc(100% + 36px);
    box-shadow: 2px 0 4px 2px rgba(0, 0, 0, 0.1);
  }
  &.left.open {
    transform: translateX(-95%);
  }
  &.left:active {
    animation-direction: alternate;
  }
  &.rigth .ext {
    width: calc(100% + 36px);
    box-shadow: -2px 0 4px 2px rgba(0, 0, 0, 0.1);
  }
  &.left .int,
  &.rigth .int {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    box-shadow: inset 0 0 2px 2px rgba(255, 255, 255, 0.4);
  }
  &.rigth.open {
    transform: translateX(95%);
  }
`;

export const IntBorder = styled.div``;
export const ExtBorder = styled.div``;

export const Arrow = styled.div`
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%) perspective(250px) rotateX(50deg) translate3d(0, 0, 85px);
  opacity: 0;
  transition: opacity 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &.arrowShow {
    opacity: 1;
  }
`;

export const ArrowImg = styled.img`
  transition: transform 150ms linear;

  &.rotate {
    transform: rotate(180deg);
  }
  &:hover {
    transform: translate3d(0, -30px, 0px);
  }
  &:hover.rotate {
    transform: rotate(180deg) translate3d(0, -10px, 0px);
  }
`;
