import { Box, Button } from "@material-ui/core";
import { Apartment, Close } from "@material-ui/icons";
import { Alert } from "./style";

interface ViewProps {
  closeView: () => void;
}

export function View({ closeView }: ViewProps) {
  return (
    <Alert>
      <header>
        <div
          className="buttons">
          <Apartment />
          <Button onClick={closeView}><Close /></Button>
        </div>
        <h2>Nome da Empresa</h2>
        <strong>CNPJ: </strong>
        <span>lorem</span>
      </header><br/>
      <main>
        <strong>Descrição: </strong><br/>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi facilis nesciunt cupiditate accusamus molestias, dignissimos eveniet ipsam vel cumque laboriosam quod dolore laborum fugit, culpa iusto deserunt sed autem quia.</span><br/>

        <hr/>
        <strong>Responsáveis: </strong>
        <ul>
          <li>lorem</li>
          <li>lorem</li>
          <li>lorem</li>
        </ul>
        <hr/>
        <strong>Locais: </strong>
        <ul>
          <li>ipsum</li>
          <li>ipsum</li>
          <li>ipsum</li>
        </ul>
      </main>
    </Alert>
  )
}