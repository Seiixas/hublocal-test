import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Check, Close, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Container } from "./style";

const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];

interface ICompany {
  id: string;
  label: string;
}

interface IResponsible {
  id: string;
  name: string;
  phone_number: string;
  public_place: string;
  is_main: boolean;
  complement: string;
  state: string;
  city: string;
  cep: string;
  number: string;
  company_id: string;
}

export function Responsible() {
  const [isViewOpened, setIsViewOpened] = useState(false);

  const [responsible, setResponsible] = useState<IResponsible[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    const fetchResponsibleData = async () => {
      const response = await api.get('/responsibles');
      setResponsible(response.data);
    }
    
    const fetchCompaniesData = async () => {
      const response = await api.get('/companies');
      const companiesFormatted = response.data.map((datum: any) => {
        return {
          'id': datum.id,
          'label': datum.name
        }
      });
      setCompanies(companiesFormatted);
    }
  
    fetchResponsibleData()
      .catch(console.error);
    fetchCompaniesData()
      .catch(console.error);
  }, []);

  async function handleDeleteResponsible(id: string) {
    const responsibleToRemove = responsible.find((responsible) => responsible.id === id);
    const iwant = confirm(`Realmente deseja deletar o responsável ${responsibleToRemove?.name}?`);

    if (iwant) {
      const response = await api.delete(`/responsibles/${id}`);
      
      if (response.status === 204) {
        alert(`${responsibleToRemove?.name} deletada com sucesso!`)
      }
    }
  }

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
          options={companies}
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
              responsible.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.is_main ? <Check /> : <Close />}</TableCell>
                  <TableCell align="center">
                    <Button onClick={handleOpenView}>
                      <Visibility />
                    </Button>
                    <Link to={`/responsible/edit/${row.id}`}>
                      <Button>
                          <Edit />
                      </Button>
                    </Link>
                    <Button onClick={() => handleDeleteResponsible(row.id)}>
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