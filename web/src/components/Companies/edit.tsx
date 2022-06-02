import { Box, MenuItem, Tab, Tabs } from '@material-ui/core';
import { Apartment } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { CreateCompanyContainer } from './style';

export function Edit() {

  async function handleCEP() {
    const { data } = await axios.get('https://viacep.com.br/ws/01001000/json/');

    console.log(data);
  }

  return (
    <>
    
    <CreateCompanyContainer>
      <header>
        <Apartment fontSize="large"/>
        <h1>Atualização de Empresa</h1>
     </header>

     <form action="">
       <h2>Dados da Empresa</h2>
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

        
        <Button type="submit">Salvar</Button>
     </form>
      
      </CreateCompanyContainer>
    </>
  )
}