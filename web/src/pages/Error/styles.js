import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .back {
    margin-left: 50px;
    margin-top: 40px;
    background-color: #ed2e38;
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: white;

    :hover {
      background-color: white;
      border: 1px solid #ed2e38;
      border-radius: 5px;
      padding: 4px;
      color: #ed2e38;
      cursor: pointer;
      transition: 0.5s;
    }
  }

  .title {
    margin-top: 15px;
    margin-left: 50px;
    margin-bottom: 20px;
    padding: 5px 20px;
    width: 80%;
    color: white;
    background: #ed2e38;
  }

  .content {
    margin-left: 65px;
    width: 80%;
  }
`;
