import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Delete, Edit, Place, Search, Visibility } from "@material-ui/icons";
import { Autocomplete, SpeedDial, SpeedDialAction } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { handleChangePage } from "../../utils/chagePage";
import { Container } from "./style";

interface IPlace {
  id: string;
  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  companyId: string;
}

interface ICompany {
  id: string;
  label: string;
}

export function Places() {

  const token = localStorage.getItem('token');

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await api.get('/places', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setPlaces(response.data);
      } catch (err: any) {
        const { status } = err.response;
        
        if (status === 401) {
          alert('Sessão expirada');
          localStorage.removeItem('token');
          location.reload();
          return;
        }

        alert(err.response.data.message);
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
          alert('Sessão expirada');
          localStorage.removeItem('token');
          location.reload();
          return;
        }

        alert(err.response.data.message);
      }
    }
  
    fetchPlacesData()
      .catch(console.error);
    fetchCompaniesData()
      .catch(console.error);
  }, []);

  function handleSearch(id: string) {
    const place = places.filter((place) => place.companyId === id);

    if (!place) {
      alert('Companhia sem localização');
      return;
    }

    setPlaces(place);
  }

  async function handleDeletePlace(id: string) {
    const placeToRemove = places.find((place) => place.id === id);
    const iwant = confirm(`Realmente deseja deletar o local ${placeToRemove?.name}?`);

    if (iwant) {
      try {
        const response = await api.delete(`/places/${id}`);
      
        if (response.status === 401) {
          alert('Sessão expirada');
          localStorage.removeItem('token');
          return;
        }
        
        if (response.status === 204) {
          alert(`${placeToRemove?.name} deletada com sucesso!`)
        }
      } catch (err: any) {
        const { status } = err.response;
        
        if (status === 401) {
          alert('Sessão expirada');
          localStorage.removeItem('token');
          location.reload();
          return;
        }

        alert(err.response.data.message);
      }
    }
  }

  return (
    <Container>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<Place />}
      >
          <SpeedDialAction
            icon={<Add />}
            tooltipTitle="Novo local"
            onClick={() => handleChangePage('/places/create')}
          />
      </SpeedDial>
      <header>
        <h2>Localizações</h2>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event, value) => { 
            if (!value) {
              try {
                const fetchResponsibleData = async () => {
                  const response = await api.get('/places');
                  setPlaces(response.data);
            
                  console.log(response.data);
                }
  
                fetchResponsibleData();
              } catch (err: any) {
                const { status } = err.response;
        
                if (status === 401) {
                  alert('Sessão expirada');
                  localStorage.removeItem('token');
                  location.reload();
                  return;
                }

                alert(err.response.data.message);
              }
            } else {
              handleSearch(value.id)
            }
          }} 
          options={companies}
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
              places.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.public_place}</TableCell>
                  <TableCell>{row.district}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.cep}</TableCell>
                  <TableCell align="center">
                    <Link to={`/places/${row.id}`}>
                      <Button>
                        <Visibility />
                      </Button>
                    </Link>
                    <Link to={`/places/edit/${row.id}`}>
                      <Button>
                          <Edit />
                      </Button>
                    </Link>
                    <Button onClick={() => handleDeletePlace(row.id)}>
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