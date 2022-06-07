import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Container } from "./style";

interface ICompany {
  id: string;
  name: string;
  description: string;
  CNPJ: string;
}

export function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/companies');
      setCompanies(response.data);
      console.log(companies);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  async function handleDeleteCompany(id: string) {
    const company = companies.find((company) => company.id === id);
    const iwant = confirm(`Realmente deseja deletar a empresa ${company?.name}?`);

    if (iwant) {
      const response = await api.delete(`/companies/${id}`);
      
      if (response.status === 204) {
        alert(`${company?.name} deletada com sucesso!`)
      }
    }
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