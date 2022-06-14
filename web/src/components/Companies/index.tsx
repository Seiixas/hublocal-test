import { Breadcrumbs, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Add, Apartment, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { handleChangePage } from "../../utils/chagePage";
import { Message } from "../Message";
import { Container } from "./style";

interface ICompany {
  id: string;
  name: string;
  description: string;
  CNPJ: string;
}

export function Companies() {
  const token = localStorage.getItem('token');

  const [companies, setCompanies] = useState<ICompany[]>([]); 
  const [search, setSearch] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/companies', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setCompanies(response.data);
      } catch (err: any) {
        const { status } = err.response;
                  
        if (status === 401) {
          setAlertSeverity('error');
          setAlertMessage('Sessão expirada');
          setIsAlertOpen(true);
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          localStorage.removeItem('id');
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
  
    fetchData()
      .catch(console.error);
  }, []);

  async function handleDeleteCompany(id: string) {
    const company = companies.find((company) => company.id === id);
    const iwant = confirm(`Realmente deseja deletar a empresa ${company?.name}?`);

    if (iwant) {
      try {
        const response = await api.delete(`/companies/${id}` , {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
      
        if (response.status === 204) {
          setAlertSeverity('success');
          setAlertMessage(`${company?.name} deletada com sucesso!`);
          setIsAlertOpen(true);
          location.reload();
        }
      } catch (err: any) {
        const { status } = err.response;
                  
        if (status === 401) {
          setAlertSeverity('error');
          setAlertMessage('Sessão expirada');
          setIsAlertOpen(true);
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          localStorage.removeItem('id');
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

  function handleSearch() {
    const company = companies.find((company) => company.CNPJ === search);

    if (!company) {
      setAlertSeverity('warning');
      setAlertMessage('Companhia inexistente');
      setIsAlertOpen(true);
      return;
    }

    setCompanies([company]);
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
        icon={<Apartment />}
      >
          <SpeedDialAction
            icon={<Add />}
            tooltipTitle="Nova empresa"
            onClick={() => handleChangePage('/companies/create')}
          />
      </SpeedDial>
      <header>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link color="inherit" to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Typography>Empresas</Typography>
        </Breadcrumbs>
        <Typography variant="h4">Empresas</Typography>
        <div className="search-bar">
          <TextField
            label="Buscar por CNPJ"
            placeholder="CNPJ"
            type="email"
            onChange={(event) => setSearch(event.target.value)} />
            <Button className="create" onClick={handleSearch}>
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
              companies.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.CNPJ}</TableCell>
                  <TableCell align="center">
                    <Link to={`/companies/${row.id}`}>
                      <Button>
                          <Visibility />
                      </Button>
                    </Link>
                    <Link to={`/companies/edit/${row.id}`}>
                      <Button>
                          <Edit />
                      </Button>
                    </Link>
                    <Button onClick={() => handleDeleteCompany(row.id)}>
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