import { Box, MenuItem, Tab, Tabs } from '@material-ui/core';
import { Apartment } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
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

export function CreateCompany() {

  async function handleCEP() {
    const { data } = await axios.get('https://viacep.com.br/ws/01001000/json/');

    console.log(data);
  }

  return (
    <>
    
    <CreateCompanyContainer>
      <header>
        <Apartment fontSize="large"/>
        <h1>Cadastro de Empresa</h1>
     </header>

     <form action="">
       <h2>Empresa</h2>
       <span>Insira os dados relacionados à empresa</span>
       <hr />
       <TextField 
          placeholder="Ex: Compania Anônima S/A"
          type="text"
          label="Nome" />

         <TextField 
          type="number"
          label="CNPJ"
          placeholder="Apenas números" />

        <TextField 
          placeholder="Esta empresa lida com materias manutenção de computadores e impressoras."
          label="Descrição"
          type="text"
          multiline />

        <h2>Local</h2>
        <span>Insira os dados relacionados à localização da empresa</span>
        <hr />
        <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome" />

        <TextField 
          placeholder="Apenas números"
          type="number"
          label="CEP" />

        <TextField 
          placeholder="Ex: Av. Pinheiro da Silva"
          type="text"
          label="Logradouro" />

        <TextField 
          placeholder="Ex: Apartamento 105"
          type="text"
          label="Complemento" />

         <TextField 
            placeholder="Ex: Centro"
            type="text"
            label="Bairro" />

        <TextField 
          placeholder="Ex: 280A"
          type="text"
          label="Número" />
        
        <TextField 
          placeholder="Ex: São Paulo"
          type="text"
          label="Cidade" />
        
        <TextField
          id="outlined-select-currency"
          select
          label="Estado"
          value={brazilianStates}
        >
          {brazilianStates.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

      
        <h2>Responsáveis</h2>
        <span>Insira os dados relacionados ao responsável</span>

        <TextField 
          placeholder="Ex: Matriz"
          type="text"
          label="Nome" />
        
        <TextField 
          placeholder="Ex: XXYYYYYZZZZ"
          type="number"
          label="Telefone" />

        <TextField 
          placeholder="Apenas números"
          type="number"
          label="CEP" />

        <TextField 
          placeholder="Ex: Av. Pinheiro da Silva"
          type="text"
          label="Logradouro" />

        <TextField 
          placeholder="Ex: Apartamento 105"
          type="text"
          label="Complemento" />

         <TextField 
            placeholder="Ex: Centro"
            type="text"
            label="Bairro" />

        <TextField 
          placeholder="Ex: 280A"
          type="text"
          label="Número" />
        
        <TextField 
          placeholder="Ex: São Paulo"
          type="text"
          label="Cidade" />
        <Button type="submit">Cadastrar</Button>
     </form>
      
      </CreateCompanyContainer>
    </>
  )
}