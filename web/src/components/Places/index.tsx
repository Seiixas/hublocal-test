import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./style";

const fakeData = [
  { 
    id: 'fake-id',
    public_place: 'Rua Alo da Silva',
    district: 'Centro',
    state: 'MG',
    city: 'Januária',
    cep: '39480000'
  }
]

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

export function Places() {
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
        <h2>Localizações</h2>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Empresa" />}
        />
            <div>
              <Link to="/places/create">
                <Button className="create">
                  <Add />
                  <span>Cadastrar Localização</span>  
                </Button>
              </Link>
            </div>
        </div>
      </header>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logradouro</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fakeData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.public_place}</TableCell>
                  <TableCell>{row.district}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.cep}</TableCell>
                  <TableCell align="center">
                    <Button onClick={handleOpenView}>
                      <Visibility />
                    </Button>
                    <Link to="/places/edit">
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