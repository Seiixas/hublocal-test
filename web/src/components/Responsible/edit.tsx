import { Breadcrumbs, MenuItem, Typography } from '@material-ui/core';
import { Apartment, Person } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

export function EditResponsible() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [isCepCorrect, setIsCepCorrect] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [responsibleName, setResponsibleName] = useState<string | null>('');
  const [phoneNumber, setPhoneNumber] = useState<string | null>('');
  const [responsibleCep, setResponsibleCep] = useState<string | null>('');
  const [responsiblePublicPlace, setResponsiblePublicPlace] = useState<string | null>('');
  const [responsibleComplement, setResponsibleComplement] = useState<string | null>('');
  const [responsibleDistrict, setResponsibleDistrict] = useState<string | null>('');
  const [responsibleNumber, setResponsibleNumber] = useState<string | null>('');
  const [responsibleState, setResponsibleState] = useState<string | null>('');
  const [responsibleCity, setResponsibleCity] = useState<string | null>('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    window.scrollTo(0, 0);
    try {
      const response = await api.put(`/responsibles/${params.id}`, {
        name: responsibleName,
        phone_number: phoneNumber,
        cep: responsibleCep,
        public_place: responsiblePublicPlace,
        complement: responsibleComplement,
        district: responsibleDistrict,
        number: responsibleNumber,
        state: responsibleState,
        city: responsibleCity,
      },{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      if (response.status === 204) {
        setAlertSeverity('success');
        setAlertMessage('Responsável atualizado com sucesso!');
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

  async function handleCEPResponsible() {
      const response = await axios.get(`https://viacep.com.br/ws/${responsibleCep}/json/`);

      if (response.data.erro === 'true') {
        alert('CEP inválido!');
      } else {
        setResponsiblePublicPlace(response.data.logradouro);
        setResponsibleComplement(response.data.complemento);
        setResponsibleDistrict(response.data.bairro);
        setResponsibleCity(response.data.localidade);
        setResponsibleState(response.data.uf);
        setIsCepCorrect(true);
      }    
    
  }

  useEffect(() => {
    const fetchCompaniesData = async () => {
      try {
        const response = await api.get(`/responsibles/${params.id}`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setResponsibleName(response.data.name);
        setPhoneNumber(response.data.phone_number);
        setResponsibleCep(response.data.cep);
        setResponsiblePublicPlace(response.data.public_place);
        setResponsibleComplement(response.data.complement);
        setResponsibleDistrict(response.data.district);
        setResponsibleNumber(response.data.number);
        setResponsibleState(response.data.state);
        setResponsibleCity(response.data.city);
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

    fetchCompaniesData()
      .catch(console.error);
  }, []);

  return (
    <>
    <Message
        visibility={isAlertOpen}
        type={alertSeverity}>
          {alertMessage}
      </Message>
    <CreateCompanyContainer>
      <header>
       <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Person fontSize="large"/>
          <Typography variant="h4">Atualizar Responsável</Typography>
        </div>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link color="inherit" to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link color="inherit" to="/responsible" style={{ color: "white" }}>
            Responsáveis
          </Link>
          <Typography>Atualização de Responsável</Typography>
        </Breadcrumbs>
     </header>

     <form onSubmit={handleSubmit}>
        <Typography variant="h5">Responsáveis</Typography>
        <span>Insira os dados relacionados ao responsável</span>

        <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome"
          value={responsibleName}
          onChange={(event) => setResponsibleName(event.target.value)} />
        
        <TextField 
          placeholder="Ex: XXYYYYYZZZZ"
          type="number"
          label="Telefone"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)} />

        <div style={{display: 'flex', gap: '.5rem'}}>
          <TextField 
            placeholder="Apenas números"
            type="number"
            label="CEP"
            required
            value={responsibleCep}
            disabled={isCepCorrect}
            style={{ width: '90%' }}
            onChange={(event) => setResponsibleCep(event.target.value)} />
          
          <Button
            onClick={handleCEPResponsible}
            style={{ width: '10%' }}>Buscar</Button>
        </div>

        <TextField 
          placeholder="Ex: Av. Pinheiro da Silva"
          type="text"
          label="Logradouro"
          required
          value={responsiblePublicPlace}
          disabled={!isCepCorrect}
          onChange={(event) => setResponsiblePublicPlace(event.target.value)} />

        <TextField 
          placeholder="Ex: Apartamento 105"
          type="text"
          label="Complemento"
          value={responsibleComplement}
          disabled={!isCepCorrect}
          onChange={(event) => setResponsibleComplement(event.target.value)} />

         <TextField 
            placeholder="Ex: Centro"
            type="text"
            label="Bairro"
            required
            value={responsibleDistrict}
            disabled={!isCepCorrect}
            onChange={(event) => setResponsibleDistrict(event.target.value)} />

        <TextField 
          placeholder="Ex: 280A"
          type="text"
          label="Número"
          value={responsibleNumber}
          disabled={!isCepCorrect}
          required
          onChange={(event) => setResponsibleNumber(event.target.value)} />
        
        <TextField 
          placeholder="Ex: São Paulo"
          type="text"
          label="Cidade"
          value={responsibleCity}
          disabled
          required
          onChange={(event) => setResponsibleCity(event.target.value)} />
        
        <TextField
          id="outlined-select-currency"
          select
          label="Estado"
          value={responsibleState}
          disabled
          required
          onChange={(event) => setResponsibleState(event.target.value)}
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