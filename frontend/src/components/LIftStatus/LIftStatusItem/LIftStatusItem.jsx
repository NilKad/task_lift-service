import * as SC from './LIftStatusItem.styled';

export const LIftStatusItem = ({ name, value }) => {
  return (
    <SC.Name>
      ${name} - ${value}
    </SC.Name>
  );
};
