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

    tbody {
      background-color: #fff;
    }

    tr {
      :nth-child(even) {
        background-color: ${lighten(0.1, '#ddd')};
      }
    }

    tr.closedRow {
      font-style: italic;
      text-decoration: line-through;
    }

    th {
      padding: 10px;
      background-color: ${darken(0.03, '#ED2E38')};
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

  .table-head {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
  }

  .pagination {
    margin-top: 10px;
    text-align: center;
  }

  .pagination-button {
    color: white;
    background-color: #ed2e38;
    border: none;
    padding: 2px 4px;
  }

  .default-filter {
    margin: 0;
    margin-left: 30px;
    margin-bottom: 5px;
    border: none;
    border: 1px solid black;
    padding: 5px 2px;
    border-radius: 3px;
    border-bottom: 3px solid #ed2e38;
  }

  .buttons-container {
    margin-bottom: 10px;
  }

  .select-combo {
    background-color: #ed2e38;
    border: none;
    border-radius: 5px;
    padding: 4px;
    color: white;
  }
`;

export const Button = styled.button`
  color: white;
  background: ${darken(0.03, '#ED2E38')};
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid;
  margin-right: 7px;
  margin-bottom: 3px;

  :hover {
    color: ${darken(0.03, '#ED2E38')};
    background: white;
    transition: 0.5s;
    cursor: pointer;
  }
`;

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
  background: ${darken(0.03, '#ED2E38')};
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
    svg:hover {
      cursor: pointer;
    }
  }
`;
