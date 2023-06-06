import 'modern-normalize';
import { createGlobalStyle } from 'styled-components';
// import { baseColor } from 'components/baseStyles/Variables.styled';

export const GlobalStyle = createGlobalStyle`
 body, #root, main{
  height: 100vh;
 }


 h1,h2,h3,h4,h5,h6,p{
    padding: 0;
    margin: 0;
 }

 ul{
    padding: 0;
    margin: 0;
    list-style: none;
 }

 img{
    display:block;
    max-width: 100%;
    height: auto;
 }


`;
