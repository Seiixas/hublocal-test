import { Apartment } from '@material-ui/icons';
import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { Message } from '../Message';
import { CreateCompanyContainer } from './style';

export function Edit() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');

  async function handleEditCompany(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put(`/companies/${params.id}`, {
        name,
        description
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/companies/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setName(response.data.name);
        setDescription(response.data.description);
        setCnpj(response.data.CNPJ);
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

    fetchData()
      .catch((err) => console.log(err.message))
  }, []);

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
          disabled
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