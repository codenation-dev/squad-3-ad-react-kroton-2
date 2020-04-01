import styled from 'styled-components';

export const Button = styled.button`
  background-color: #ed2e38;
  border-radius: 8px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Maven Pro';
  font-weight: bold;
  transition: 0.2s;
  padding: 10px 20px;
  margin-right: 5px;

  &:hover {
    transform: translateY(-3px);
  }
`;
