import styled from "@emotion/styled";

export const Container = styled.div`
  border: 1px solid red;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  align-items: center;

  form {
    background: #fbfbfb;
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    height: 45%;
    width: 80%;
    max-width: 350px;
    gap: 1rem;
    padding: 1rem;
    
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

    span > a {
      color: #4884fc;
    }
  }
`;
