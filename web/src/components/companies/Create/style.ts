import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 98.97vw;
  background-color: #76a3fd;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #4884fc;
    color: white;
    padding: 1rem;
  }

  button {
    background-color: #5fcc00;
    color: white;
    padding: .5rem;
  }

  button:hover {
    background: #5fcc55;
  }

  form {
    background: #fbfbfb;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
  }
`