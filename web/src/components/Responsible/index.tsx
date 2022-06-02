import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Check, Close, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";

const fakeData = [
  { 
    id: 'fake-id',
    name: 'Mateus Silva Seixas',
    phone_number: '38984120975',
    is_main: true,
  }
]

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

export function Responsible() {
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
        <h2>Responsáveis</h2>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Empresa" />}
        />
            <div>
              <Link to="/responsible/create">
                <Button className="create">
                  <Add />
                  <span>Cadastrar Responsável</span>  
                </Button>
              </Link>
            </div>
        </div>
      </header>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fakeData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.is_main ? <Check /> : <Close />}</TableCell>
                  <TableCell align="center">
                    <Button onClick={handleOpenView}>
                      <Visibility />
                    </Button>
                    <Link to="/responsible/edit">
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