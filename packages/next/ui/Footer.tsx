import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  width: 100%;
  height: 70px;
  font-size: 1.1em;
  border-top: 1px solid #cecece;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  color: #0e0e0e;
  margin-top: 5px;
`;

const Footer = () => (
  <StyledFooter>
    <p>Powered by @AugustoCalaca</p>
  </StyledFooter>
);

export default Footer;
