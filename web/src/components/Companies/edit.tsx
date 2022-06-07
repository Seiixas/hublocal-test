import { Apartment } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { CreateCompanyContainer } from './style';

export function Edit() {
  const params = useParams();

  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [cnpj, setCnpj] = useState<string | null>(null);

  async function handleEditCompany(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put(`/companies/${params.id}`, {
        name,
        description,
        CNPJ: cnpj
      });
      console.log(response);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  }

  return (
    <>
    
    <CreateCompanyContainer>
      <header>
        <Apartment fontSize="large"/>
        <h1>Atualização de Empresa</h1>
     </header>

     <form onSubmit={handleEditCompany}>
       <h2>Dados da Empresa</h2>
       <span>Insira os dados relacionados à empresa</span>
       <hr />
       <TextField 
          placeholder="Ex: Compania Anônima S/A"
          type="text"
          label="Nome"
          onChange={(event) => setName(event.target.value)} />

         <TextField 
          type="number"
          label="CNPJ"
          placeholder="Apenas números"
          onChange={(event) => setCnpj(event.target.value)} />

        <TextField 
          placeholder="Esta empresa lida com materias manutenção de computadores e impressoras."
          label="Descrição"
          type="text"
          multiline
          onChange={(event) => setDescription(event.target.value)} />

        
        <Button type="submit">Salvar</Button>
     </form>
      
      </CreateCompanyContainer>
    </>
  )
}