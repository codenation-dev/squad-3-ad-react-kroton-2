import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  display: flex;
  padding: 40px 80px;
  margin: 0 auto;
  flex-direction: column;
  
  table {
    border-spacing: 0;
    text-align: left;
    border-collapse: separate;

    tbody{
      background-color: #fff;
    }

    tr {
      :nth-child(even) {
        background-color: ${lighten(0.1, "#ddd")};
      }
    }

    th {
      padding: 10px;
      background-color: ${darken(0.03, "#ED2E38")};
      color: white;
      font-size: 22px;
    }

    th:last-child {
      text-align: right;
    }

    td {
      padding: 0 10px;
      height: 58px;
      border: 0;
      text-overflow: ellipsis;
      word-wrap: none;
      white-space: nowrap;
      overflow: hidden;
      max-width: 800px;
    }

    td:last-child {
      text-align: right;
    }
  }
`

export const Modal = styled.div`
  display: none;
  max-width: 600px;
  padding: 10px;
  margin: auto;
  z-index: 999;
  position: fixed;
  border: 1px solid white;
  border-radius: 4px;
  font-size: 16px;
  background: ${darken(0.03, "#ED2E38")};
  color: white;
  top: calc(50% - 300px);
  left: calc(50% - 300px);

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      padding: 20px;
    }

    svg {
      margin: 10px 0;
    }
    svg:hover{
        cursor: pointer;
    }
  }
`;

