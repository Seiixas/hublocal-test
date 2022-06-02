import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";
import { View } from "./view";

const fakeData = [
  { id: 'fake-id', name: 'IFNMG - Campus Januária', description: 'Empresa séria', CNPJ: 'xxx-xxx-xxx-xx' }
]

export function Companies() {
  const [isViewOpened, setIsViewOpened] = useState(false);

  function handleOpenView() {
    setIsViewOpened(true);
  }

  function handleCloseView() {
    setIsViewOpened(false);
  }

  return (
    <Container>
      <header>
        <h2>Empresas</h2>
        <div className="search-bar">
          <TextField
            label="Buscar por CNPJ"
            placeholder="CNPJ"
            type="email" />
            <Button className="create">
                <Search />
                <span>Buscar</span>  
            </Button>
            <div>
              <Link to="/companies/create">
                <Button className="create">
                  <Add />
                  <span>Cadastrar Empresa</span>  
                </Button>
              </Link>
            </div>
        </div>
      </header>
      {isViewOpened && <View closeView={() => handleCloseView()} />}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fakeData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.CNPJ}</TableCell>
                  <TableCell align="center">
                    <Button onClick={handleOpenView} disabled={isViewOpened}>
                      <Visibility />
                    </Button>
                    <Link to="/companies/edit">
                      <Button>
                          <Edit />
                      </Button>
                    </Link>
                    <Button>
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}