import { Breadcrumbs, MenuItem, Typography } from '@material-ui/core';
import { Place } from '@material-ui/icons';
import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Message } from '../Message';
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
    label: 'Mato Grosso do MS',
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

interface ICompany {
  id: string;
  label: string;
}

export function CreatePlace() {
  const token = localStorage.getItem('token');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [companyId, setCompanyId] = useState<string>('');

  const [isCepCorrect, setIsCepCorrect] = useState(false);

  const [placeName, setPlaceName] = useState<string | null>('');
  const [cep, setCep] = useState<string>('');
  const [publicPlace, setPublicPlace] = useState<string | null>('');
  const [complement, setComplement] = useState<string | null>('');
  const [district, setDistrict] = useState<string | null>('');
  const [number, setNumber] = useState<string | null>('');
  const [state, setState] = useState<string | null>('');
  const [city, setCity] = useState<string | null>('');

  async function handleCEP() {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      console.log(response.data.erro);

      if (response.data.erro === 'true') {
        alert('CEP inválido!');
      } else {
        setPublicPlace(response.data.logradouro);
        setComplement(response.data.complemento);
        setDistrict(response.data.bairro);
        setCity(response.data.localidade);
        setState(response.data.uf);
        setIsCepCorrect(true);
      }
  }

  useEffect(() => {
    const fetchData = async () => {
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
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    window.scrollTo(0, 0);
    try {
      if (!companyId) {
        setAlertSeverity('warning');
        setAlertMessage('Selecione alguma empresa');
        setIsAlertOpen(true);
        return;
      }

      const response = await api.post('/places', {
        name: placeName,
        cep: cep,
        public_place: publicPlace,
        complement: complement,
        district: district,
        number: number,
        state: state,
        city: city,
        company_id: companyId
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        },
      });

      if (response.status === 201) {
        setAlertSeverity('success');
        setAlertMessage('Local criado com sucesso!');
        setIsAlertOpen(true);
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

  return (
    <>
      <Message 
        visibility={isAlertOpen}
        type={alertSeverity}>
          {alertMessage}
      </Message>
      <CreateCompanyContainer>
        <header><div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Place fontSize="large"/>
          <Typography variant="h4">Cadastro de Local</Typography>
        </div>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link color="inherit" to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link color="inherit" to="/places" style={{ color: "white" }}>
            Locais
          </Link>
          <Typography>Criar Local</Typography>
        </Breadcrumbs>
        </header>

      <form onSubmit={handleSubmit}>
          <Typography variant="h5">Local</Typography>
          <span>Insira os dados relacionados à localização da empresa</span>
          <hr />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={companies}
            renderInput={(params) => <TextField {...params} label="Empresa" />}
            onChange={(e, value: any) => setCompanyId(value.id)}
          />

          <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome"
          required
          disabled={!isCepCorrect}
          onChange={(event) => setPlaceName(event.target.value)} />

        <div style={{display: 'flex', gap: '.5rem'}}>
          <TextField 
            placeholder="Apenas números"
            type="number"
            label="CEP"
            required
            disabled={isCepCorrect}
            style={{ width: '90%' }}
            onChange={(event) => setCep(event.target.value)} />
          
          <Button
            onClick={handleCEP}
            style={{ width: '10%' }}>Buscar</Button>
        </div>

        <TextField 
          placeholder="Ex: Av. Pinheiro da Silva"
          type="text"
          label="Logradouro"
          value={publicPlace}
          required
          disabled={!isCepCorrect}
          onChange={(event) => setPublicPlace(event.target.value)} />

        <TextField 
          placeholder="Ex: Apartamento 105"
          type="text"
          label="Complemento"
          value={complement}
          disabled={!isCepCorrect}
          onChange={(event) => setComplement(event.target.value)} />

         <TextField 
            placeholder="Ex: Centro"
            type="text"
            label="Bairro"
            value={district}
            required
            disabled={!isCepCorrect}
            onChange={(event) => setDistrict(event.target.value)} />

        <TextField 
          placeholder="Ex: 280A"
          type="text"
          label="Número"
          disabled={!isCepCorrect}
          required
          onChange={(event) => setNumber(event.target.value)} />
        
        <TextField 
          placeholder="Ex: São Paulo"
          type="text"
          label="Cidade"
          value={city}
          disabled
          required
          onChange={(event) => setCity(event.target.value)} />
        
        <TextField
          id="outlined-select-currency"
          select
          label="Estado"
          value={state}
          disabled
          required
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