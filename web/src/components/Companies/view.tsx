import { TextField, Typography } from "@material-ui/core"
import { Apartment } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { Message } from "../Message";
import { CreateCompanyContainer } from './style';

interface ICompany {
  name: string;
  description: string;
  CNPJ: string;
}

export function ViewCompany() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [company, setCompany] = useState<ICompany>();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/companies/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setCompany({
          name: response.data.name,
          description: response.data.description,
          CNPJ: response.data.CNPJ
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
    fetchData();
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
        <Typography variant="h4">{ company?.name }</Typography>
     </header>

     <form>
       <Typography variant="h5">Empresa</Typography>
       <span>Dados relacionados à empresa</span>
       <hr />
       <TextField 
          type="text"
          label="ID"
          disabled
          value={params.id} />

       <TextField 
          type="text"
          disabled
          value={company?.name} />

         <TextField 
          type="number"
          disabled
          value={company?.CNPJ} />

        <TextField 
          placeholder="Esta empresa lida com materias manutenção de computadores e impressoras."
          type="text"
          multiline
          disabled
          value={company?.description} />
     </form>
      
      </CreateCompanyContainer>
    </>
  )
}