import { Apartment } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { CreateCompanyContainer } from './style';

export function Edit() {
  const params = useParams();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/companies/${params.id}`);
      setName(response.data.name);
      setDescription(response.data.description);
      setCnpj(response.data.CNPJ);
    }

    fetchData()
      .catch((err) => console.log(err.message))
  }, []);

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
          value={name}
          onChange={(event) => setName(event.target.value)} />

         <TextField 
          type="number"
          label="CNPJ"
          value={cnpj}
          placeholder="Apenas números"
          onChange={(event) => setCnpj(event.target.value)} />

        <TextField 
          placeholder="Esta empresa lida com materias manutenção de computadores e impressoras."
          label="Descrição"
          type="text"
          value={description}
          multiline
          onChange={(event) => setDescription(event.target.value)} />

        
        <Button type="submit">Salvar</Button>
     </form>
      
      </CreateCompanyContainer>
    </>
  )
}