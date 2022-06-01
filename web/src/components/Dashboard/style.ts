import styled from "@emotion/styled";

export const Container = styled.main`
  padding: .5rem;
  display: grid;
  grid-template-areas: 
    "companies person",
    "places tickets",
  ;

  button {
    padding: 1rem;
    background-color: #0000000A;
    border-radius: .5rem;
    text-align: justify;
    display: flex;
    justify-content: left;
    width: 100%;
    margin-bottom: 1rem;

    header {
      margin-left: .5rem;
      margin-right: .5rem
    }

    span {
      line-height: 1;
      text-transform: none;
      font-weight: 300;
    }
  }

  .companies {
    grid-area: companies;
  }
  
  svg {
    background-color: #4884fc;
    color: white;
    padding: .2rem;
    border-radius: 100%
  }
`