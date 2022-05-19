import styled from "@emotion/styled";

import backgroundImage from '../../assets/signin/background-login.jpeg';

export const Container = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background: #4884fc;

  form {
    border-radius: 1rem;
    background: #fbfbfb;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: auto;
    width: 80%;
    max-width: 350px;
    gap: 1rem;
    padding: 2rem;
    
    img {
      margin: auto;
      display: block;
      padding: 1rem;
      width: 55%;
    }

    span {
      text-align: center;
      font-size: .85rem;
    }
    
    button {
      background: #5fcc00;
      color: white;
    }

    button:hover {
      background: #5fcc55;
    }

    span > a {
      color: #4884fc;
    }
  }
`;
