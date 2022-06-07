import { Box, MenuItem, Tab, Tabs } from '@material-ui/core';
import { Apartment } from '@material-ui/icons';
import { Autocomplete, Button, TextField } from '@mui/material';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
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

export function CreateResponsible() {
  const [responsibleName, setResponsibleName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [responsibleCep, setResponsibleCep] = useState<string | null>(null);
  const [responsiblePublicPlace, setResponsiblePublicPlace] = useState<string | null>(null);
  const [responsibleComplement, setResponsibleComplement] = useState<string | null>(null);
  const [responsibleDistrict, setResponsibleDistrict] = useState<string | null>(null);
  const [responsibleNumber, setResponsibleNumber] = useState<string | null>(null);
  const [responsibleState, setResponsibleState] = useState<string | null>('');
  const [responsibleCity, setResponsibleCity] = useState<string | null>(null);

  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [companyId, setCompanyId] = useState<string>('');

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
      const response = await api.post('/responsibles', {
        name: responsibleName,
        phone_number: phoneNumber,
        cep: responsibleCep,
        public_place: responsiblePublicPlace,
        complement: responsibleComplement,
        district: responsibleDistrict,
        number: responsibleNumber,
        state: responsibleState,
        city: responsibleCity,
        company_id: companyId
      });

      if (response.status === 201) {
        alert('Responsável criado');
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
    
  }

  useEffect(() => {
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

    fetchCompaniesData()
      .catch(console.error);
  }, []);

  return (
    <>
    
    <CreateCompanyContainer>
      <header>
        <Apartment fontSize="large"/>
        <h1>Cadastro de Responsável</h1>
     </header>

     <form onSubmit={handleSubmit}>
        <h2>Responsáveis</h2>
        <span>Insira os dados relacionados ao responsável</span>

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