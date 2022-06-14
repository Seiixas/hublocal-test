import styled from "@emotion/styled";

export const Container = styled.div`
  color: white;

  header {
    padding: 1rem;
    background: #4884fc;
    color: white;
  }

  .search-bar {
    width: calc(100vw - 2rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .search-bar input {
    width: 90vw;
  }

  input {
    color: white;
    display: block;
  }

  button.create {
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: #0000000A;
    color: white;
  }

  table {
    background: #f2f2f2;
  }
`;

export const CreateCompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #76a3fd;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
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

  button.cancel {
    background: #d10e00;
  }

  form {
    background: #fbfbfb;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`

export const Alert = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); 
  background: #FFFFFFE0;
  color: black;

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;