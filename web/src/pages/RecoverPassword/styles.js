import styled from 'styled-components';

import colors from 'metrics/colors';

export const Container = styled.main`
  height: 100%;
`;

export const FormSection = styled.main`
  background: ${colors.white_smoke};
  min-height: 90vh;
  color: #fff;
  padding-top: 100px;
  padding-bottom: 100px;
  h1 {
    font-family: 'Poppins';
    font-size: 28.3px;
    font-weight: 700;
  }
  p {
    font-family: 'Poppins';
    font-weight: 400;
  }
`;

export const FormContainer = styled.div`
  height: 100%;
  padding: 30px;
  border-radius: 30px;
  color: ${colors.white};
  background: ${colors.christalle};
  text-align: center;
`;
