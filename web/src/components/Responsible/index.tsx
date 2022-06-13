import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Check, Close, Delete, Edit, Person, Search, Visibility } from "@material-ui/icons";
import { Autocomplete, SpeedDial, SpeedDialAction } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { handleChangePage } from "../../utils/chagePage";
import { Message } from "../Message";
import { Container } from "./style";

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
  companyId: string;
}

export function Responsible() {
  const token = localStorage.getItem('token');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [responsible, setResponsible] = useState<IResponsible[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    const fetchResponsibleData = async () => {
      try {
        const response = await api.get('/responsibles', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setResponsible(response.data);
      } catch (err: any) {
        const { status } = err.response;
                  
        if (status === 401) {
          setAlertSeverity('error');
          setAlertMessage('Sessão expirada');
          setIsAlertOpen(true);
          localStorage.removeItem('token');
          setTimeout(() => {
            location.reload();
          }, 5000);
          return;
        }

        const { message } = err.response.data;
        setAlertSeverity('error');
        setAlertMessage(message);
        setIsAlertOpen(true);
      }
    }
    
    const fetchCompaniesData = async () => {
      try {
        const response = await api.get('/companies', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        const companiesFormatted = response.data.map((datum: any) => {
          return {
            'id': datum.id,
            'label': datum.name
          }
        });
        setCompanies(companiesFormatted);
      } catch (err: any) {
        const { status } = err.response;
                  
        if (status === 401) {
          setAlertSeverity('error');
          setAlertMessage('Sessão expirada');
          setIsAlertOpen(true);
          localStorage.removeItem('token');
          setTimeout(() => {
            location.reload();
          }, 5000);
          return;
        }

        const { message } = err.response.data;
        setAlertSeverity('error');
        setAlertMessage(message);
        setIsAlertOpen(true);
      }
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
      try {
        const response = await api.delete(`/responsibles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
      
        if (response.status === 204) {
          setAlertSeverity('success');
          setAlertMessage(`${responsibleToRemove?.name} deletada com sucesso!`);
          setIsAlertOpen(true);
        }
      } catch (err: any) {
        const { status } = err.response;
                  
        if (status === 401) {
          setAlertSeverity('error');
          setAlertMessage('Sessão expirada');
          setIsAlertOpen(true);
          localStorage.removeItem('token');
          setTimeout(() => {
            location.reload();
          }, 5000);
          return;
        }

        const { message } = err.response.data;
        setAlertSeverity('error');
        setAlertMessage(message);
        setIsAlertOpen(true);
      }
    }
  }

  function handleSearch(id: string) {
    const responsibles = responsible.filter((responsible) => responsible.companyId === id);

    if (!responsibles) {
      setAlertSeverity('warning');
      setAlertMessage('Nenhum responsável encontrado');
      setIsAlertOpen(true);
      return;
    }

    setResponsible(responsibles);
  }

  return (
    <Container>
      <Message 
        visibility={isAlertOpen}
        type={alertSeverity}>
          {alertMessage}
      </Message>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<Person />}
      >
          <SpeedDialAction
            icon={<Add />}
            tooltipTitle="Novo local"
            onClick={() => handleChangePage('/responsible/create')}
          />
      </SpeedDial>
      <header>
        <h2>Responsáveis</h2>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event, value) => { 
            if (!value) {
              const fetchResponsibleData = async () => {
                try {
                  const response = await api.get('/responsibles');
                  setResponsible(response.data);
                } catch (err: any) {
                  const { status } = err.response;
                  
                  if (status === 401) {
                    setAlertSeverity('error');
                    setAlertMessage('Sessão expirada');
                    setIsAlertOpen(true);
                    localStorage.removeItem('token');
                    setTimeout(() => {
                      location.reload();
                    }, 5000);
                    return;
                  }

                  const { message } = err.response.data;
                  setAlertSeverity('error');
                  setAlertMessage(message);
                  setIsAlertOpen(true);
                }
              }

              fetchResponsibleData();
            } else {
              handleSearch(value.id)
            }
          }} 
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

                    <Link to={`/responsible/${row.id}`}>
                      <Button>
                        <Visibility />
                      </Button>
                    </Link>
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