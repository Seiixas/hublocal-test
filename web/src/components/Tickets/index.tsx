import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import { Add, Delete, Edit, Search, Visibility } from "@material-ui/icons";
import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Container } from "./style";

interface ITicket {
  id: string;
  status: string;
  placeId: string;
}

interface IPlace {
  id: string;
  label: string;
}

export function Tickets() {
  const token = localStorage.getItem('token');

  const [places, setPlaces] = useState<IPlace[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await api.get('/tickets', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setTickets(response.data);
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
        const response = await api.get('/places', {
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
        setPlaces(companiesFormatted);
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
    const ticket = tickets.filter((ticket) => ticket.placeId === id);

    if (!ticket) {
      alert('Companhia sem localização');
      return;
    }

    setTickets(ticket);
  }

  return (
    <Container>
      <header>
        <h2>Tickets</h2>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event, value) => { 
            if (!value) {
              const fetchResponsibleData = async () => {
                try {
                  const response = await api.get('/tickets');
                  setTickets(response.data);
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

              fetchResponsibleData();
            } else {
              handleSearch(value.id)
            }
          }} 
          options={places}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Locais" />}
        />
        </div>
      </header>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Local</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tickets.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{
                    row.placeId
                  }</TableCell>
                  <TableCell align="center">
                    <Link to={`/tickets/${row.id}`}>
                      <Button>
                        <Visibility />
                      </Button>
                    </Link>
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