import { Box, MenuItem, Tab, Tabs } from '@material-ui/core';
import { Apartment, Place } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { CreateCompanyContainer } from './style';

const brazilianStates = [
  {
    value: 'AC',
    label: 'Acre',
  },
  {
    value: 'AL',
    label: 'Alagoas',
  },
  {
    value: 'AP',
    label: 'Amapá',
  },
  {
    value: 'AM',
    label: 'Amazonas',
  },
  {
    value: 'BA',
    label: 'Bahia',
  },
  {
    value: 'CE',
    label: 'Ceará',
  },
  {
    value: 'DF',
    label: 'Distrito Federal',
  },
  {
    value: 'ES',
    label: 'Espírito Santo',
  },
  {
    value: 'GO',
    label: 'Goiás',
  },
  {
    value: 'MA',
    label: 'Maranhão',
  },
  {
    value: 'MT',
    label: 'Mato Grosso',
  },
  {
    value: 'MS',
    label: 'Mato Grosso do Sul',
  },
  {
    value: 'MG',
    label: 'Minas Gerais',
  },
  {
    value: 'PA',
    label: 'Pará',
  },
  {
    value: 'PB',
    label: 'Paraíba',
  },
  {
    value: 'PR',
    label: 'Paraná',
  },
  {
    value: 'PE',
    label: 'Pernambuco',
  },
  {
    value: 'PI',
    label: 'Piauí',
  },
  {
    value: 'RJ',
    label: 'Rio de Janeiro',
  },
  {
    value: 'RN',
    label: 'Rio Grande do Norte',
  },
  {
    value: 'RS',
    label: 'Rio Grande do Sul',
  },
  {
    value: 'RO',
    label: 'Rondônia',
  },
  {
    value: 'RR',
    label: 'Roraima',
  },
  {
    value: 'SC',
    label: 'Santa Catarina',
  },
  {
    value: 'SP',
    label: 'São Paulo',
  },
  {
    value: 'SE',
    label: 'Sergipe',
  },
  {
    value: 'TO',
    label: 'Tocantins',
  },
];

export function EditPlace() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [oldPlaceName, setOldPlaceName] = useState<string>('');

  const [placeName, setPlaceName] = useState<string | null>('');
  const [cep, setCep] = useState<string>('');
  const [publicPlace, setPublicPlace] = useState<string | null>('');
  const [complement, setComplement] = useState<string | null>('');
  const [district, setDistrict] = useState<string | null>('');
  const [number, setNumber] = useState<string | null>('');
  const [state, setState] = useState<string | null>('');
  const [city, setCity] = useState<string | null>('');
  const [dataUpdated, setDataUpdated] = useState<string | null>('');

  async function handleCEP(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCep(event.target.value);
    if (cep?.length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.error === 'true') {
        alert('CEP inválido!');
      } else {
        setPublicPlace(response.data.logradouro);
        setComplement(response.data.complemento);
        setDistrict(response.data.bairro);
        setCity(response.data.localidade);
        setState(response.data.uf);
      }    
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post(`/tickets`, {
        title: oldPlaceName,
        place_id: params.id,
        cep: cep,
        name: placeName,
        public_place: publicPlace,
        complement: complement,
        district: district,
        number: number,
        state: state,
        city: city,
        data_updated: dataUpdated,
        created_by: '926be774-646f-428d-b8ed-cc165b6e2689',
        updated_by: '926be774-646f-428d-b8ed-cc165b6e2689'
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      if (response.status === 201) {
        alert('Ticket criado! Aguarde atualização.');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/places/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setPlaceName(response.data.name);
        setPublicPlace(response.data.public_place);
        setComplement(response.data.complement);
        setDistrict(response.data.district);
        setCity(response.data.city);
        setState(response.data.state);
        setNumber(response.data.number);
        setCep(response.data.cep);
  
        setOldPlaceName(response.data.name);
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

    fetchData()
      .catch((err) => console.log(err.message))
  }, []);


  return (
    <>
    
      <CreateCompanyContainer>
        <header>
          <Place fontSize="large"/>
          <h1>Atualizar Local</h1>
        </header>

      <form onSubmit={handleSubmit}>
          <h2>Local</h2>
          <span>Insira os dados relacionados à localização da empresa</span>
          <hr />
          <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome"
          required
          value={placeName}
          onChange={(event) => setPlaceName(event.target.value)} />

        <TextField 
          placeholder="Apenas números"
          type="number"
          label="CEP"
          value={cep}
          required
          onChange={(event) => { handleCEP(event) }} />

        <TextField 
          placeholder="Ex: Av. Pinheiro da Silva"
          type="text"
          label="Logradouro"
          value={publicPlace}
          required
          onChange={(event) => setPublicPlace(event.target.value)} />

        <TextField 
          placeholder="Ex: Apartamento 105"
          type="text"
          label="Complemento"
          value={complement}
          onChange={(event) => setComplement(event.target.value)} />

         <TextField 
            placeholder="Ex: Centro"
            type="text"
            label="Bairro"
            value={district}
            required
            onChange={(event) => setDistrict(event.target.value)} />

        <TextField 
          placeholder="Ex: 280A"
          type="text"
          label="Número"
          value={number}
          required
          onChange={(event) => setNumber(event.target.value)} />
        
        <TextField 
          placeholder="Ex: São Paulo"
          type="text"
          label="Cidade"
          value={city}
          disabled
          onChange={(event) => setCity(event.target.value)} />
        
        <TextField
          id="outlined-select-currency"
          select
          label="Estado"
          value={state}
          disabled
          onChange={(event) => setState(event.target.value)}
        >
          {brazilianStates.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <Button type="submit">Cadastrar</Button>
      </form>
        
        </CreateCompanyContainer>
    </>
  )
}