import { Box, MenuItem, Tab, Tabs, Typography } from '@material-ui/core';
import { Apartment } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
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

export function CreateCompany() {
  const token = localStorage.getItem('token');

  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [cnpj, setCnpj] = useState<string | null>(null);

  const [placeName, setPlaceName] = useState<string | null>('');
  const [cep, setCep] = useState<string>('');
  const [publicPlace, setPublicPlace] = useState<string | null>('');
  const [complement, setComplement] = useState<string | null>('');
  const [district, setDistrict] = useState<string | null>('');
  const [number, setNumber] = useState<string | null>('');
  const [state, setState] = useState<string | null>('');
  const [city, setCity] = useState<string | null>('');

  const [responsibleName, setResponsibleName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [responsibleCep, setResponsibleCep] = useState<string | null>(null);
  const [responsiblePublicPlace, setResponsiblePublicPlace] = useState<string | null>(null);
  const [responsibleComplement, setResponsibleComplement] = useState<string | null>(null);
  const [responsibleDistrict, setResponsibleDistrict] = useState<string | null>(null);
  const [responsibleNumber, setResponsibleNumber] = useState<string | null>(null);
  const [responsibleState, setResponsibleState] = useState<string | null>('');
  const [responsibleCity, setResponsibleCity] = useState<string | null>(null);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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

  async function handleCEPResponsible(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setResponsibleCep(event.target.value);
    if (responsibleCep?.length === 8) {
      const response = await axios.get(`https://viacep.com.br/ws/${responsibleCep}/json/`);

      if (response.data.error === 'true') {
        alert('CEP inválido!');
      } else {
        setResponsiblePublicPlace(response.data.logradouro);
        setResponsibleComplement(response.data.complemento);
        setResponsibleDistrict(response.data.bairro);
        setResponsibleCity(response.data.localidade);
        setResponsibleState(response.data.uf);
      }    
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/companies', {
        name,
        description,
        CNPJ: cnpj
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      const { id } = response.data;

      await api.post('/places', {
        name: placeName,
        cep,
        public_place: publicPlace,
        complement,
        district,
        state,
        city,
        number,
        company_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
  
      await api.post('/responsibles', {
        name: responsibleName,
        phone_number: phoneNumber,
        cep: responsibleCep,
        public_place: responsiblePublicPlace,
        complement: responsibleComplement,
        district: responsibleDistrict,
        number: responsibleNumber,
        state: responsibleState,
        city: responsibleCity,
        company_id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
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

  return (
    <>
    <CreateCompanyContainer>
    <Message
        visibility={isAlertOpen}
        type={alertSeverity}>
          {alertMessage}
      </Message>      
      <header>
        <Apartment fontSize="large"/>
        <Typography variant="h4">Cadastro de Empresa</Typography>
      </header>

     <form onSubmit={handleSubmit}>
       <Typography variant="h5">Empresa</Typography>
       <span>Insira os dados relacionados à empresa</span>
       <hr />
       <TextField 
          placeholder="Ex: Compania Anônima S/A"
          type="text"
          label="Nome"
          required
          onChange={(event) => setName(event.target.value)} />

         <TextField 
          type="number"
          label="CNPJ"
          placeholder="Apenas números"
          required
          onChange={(event) => setCnpj(event.target.value)} />

        <TextField 
          placeholder="Esta empresa lida com materias manutenção de computadores e impressoras."
          label="Descrição"
          type="text"
          required
          onChange={(event) => setDescription(event.target.value)}
          multiline />

        <Typography variant="h5">Local</Typography>
        <span>Insira os dados relacionados à localização da empresa</span>
        <hr />
        <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome"
          required
          onChange={(event) => setPlaceName(event.target.value)} />

        <TextField 
          placeholder="Apenas números"
          type="number"
          label="CEP"
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

      
        <Typography variant="h5">Responsáveis</Typography>
        <span>Insira os dados relacionados ao responsável</span>

        <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome"
          required
          onChange={(event) => setResponsibleName(event.target.value)} />
        
        <TextField 
          placeholder="Ex: XXYYYYYZZZZ"
          type="number"
          label="Telefone"
          required
          onChange={(event) => setPhoneNumber(event.target.value)} />

        <TextField 
          placeholder="Apenas números"
          type="number"
          label="CEP"
          required
          onChange={(event) => handleCEPResponsible(event)} />

        <TextField 
          placeholder="Ex: Av. Pinheiro da Silva"
          type="text"
          label="Logradouro" 
          required
          onChange={(event) => setResponsiblePublicPlace(event.target.value)}/>

        <TextField 
          placeholder="Ex: Apartamento 105"
          type="text"
          label="Complemento"
          onChange={(event) => setResponsibleComplement(event.target.value)} />

         <TextField 
            placeholder="Ex: Centro"
            type="text"
            label="Bairro"
            required
            onChange={(event) => setResponsibleDistrict(event.target.value)} />

        <TextField 
          placeholder="Ex: 280A"
          type="text"
          label="Número"
          required
          onChange={(event) => setResponsibleNumber(event.target.value)} />
        
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
        
        <TextField 
          placeholder="Ex: São Paulo"
          type="text"
          label="Cidade"
          disabled
          required
          value={responsibleCity}
          onChange={(event) => setResponsibleCity(event.target.value)} />
        <Button type="submit">Cadastrar</Button>
     </form>
      
      </CreateCompanyContainer>
    </>
  )
}