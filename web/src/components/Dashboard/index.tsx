import { Button } from "@material-ui/core";
import { Apartment, ConfirmationNumber, Person, Place } from "@material-ui/icons";
import { Container } from "./style";

export function Dashboard() {
  return (
    <>
      <header>
        <h1>Olá, Usuário</h1>
      </header>
      <Container>
        <Button className="companies">
          <Apartment 
            fontSize="large" />
          <header>
            <h2>Empresas</h2>
          </header>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugiat deleniti ex repudiandae veniam, atque amet? Doloremque modi dolores fuga porro quibusdam, quasi praesentium eveniet minus veniam voluptatem iusto maxime?</span>
        </Button>

        <Button className="person">
          <Person 
            fontSize="large" />
          <header>
            <h2>Responsáveis</h2>
          </header>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugiat deleniti ex repudiandae veniam, atque amet? Doloremque modi dolores fuga porro quibusdam, quasi praesentium eveniet minus veniam voluptatem iusto maxime?</span>
        </Button>

        <Button className="places">
          <Place 
            fontSize="large" />
          <header>
            <h2>Locais</h2>
          </header>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugiat deleniti ex repudiandae veniam, atque amet? Doloremque modi dolores fuga porro quibusdam, quasi praesentium eveniet minus veniam voluptatem iusto maxime?</span>
        </Button>

        <Button className="tickets">
          <ConfirmationNumber 
            fontSize="large" />
          <header>
            <h2>Tickets</h2>
          </header>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fugiat deleniti ex repudiandae veniam, atque amet? Doloremque modi dolores fuga porro quibusdam, quasi praesentium eveniet minus veniam voluptatem iusto maxime?</span>
        </Button>
      </Container>
    </>
  )
}