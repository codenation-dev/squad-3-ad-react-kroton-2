import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  width: 100%;
`;

export const Content = styled.div`
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: 1px solid #ddd;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #ddd;
      width: 160px;
    }

    a {
      font-weight: bold;
      font-size: 14px;
      color: ${props => (props.active ? '#333' : '#999')};
      transition: color 0.2s;

      &:hover {
        color: ${props =>
    props.active ? darken(0.08, '#333') : darken(0.08, '#999')};
      }
    }

    a:not(:last-child) {
      margin-right: 20px;
    }
  }

  aside {
    display: flex;
    align-self: flex-start;
    padding: 7px 0;
    flex-direction: column;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    font-size: 12px;
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
      line-height: 20px;
      margin-bottom: 1px;
    }

    a {
      display: block;
      color: #de3b3b;
      line-height: 20px;
    }
  }
`;
