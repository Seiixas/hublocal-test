import { TextField } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { Message } from "../Message";
import { CreateCompanyContainer } from './style';

interface IResponsible {
  name: string;
  phone_number: string;
  public_place: string;
  is_main: boolean;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  company_id: string;
}

export function ViewResponsible() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [responsible, setResponsible] = useState<IResponsible>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/responsibles/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setResponsible({
          name: response.data.name,
          phone_number: response.data.phone_number,
          public_place: response.data.public_place,
          complement: response.data.complement,
          is_main: response.data.is_main,
          district: response.data.district,
          city: response.data.city,
          state: response.data.state,
          cep: response.data.cep,
          number: response.data.number,
          company_id: response.data.company_id
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
    <Message 
        visibility={isAlertOpen}
        type={alertSeverity}>
          {alertMessage}
      </Message>
    <CreateCompanyContainer>
      <header>
        <Person fontSize="large"/>
        <h1>{ responsible?.name }</h1>
     </header>

     <form>
       <h2>Responsável</h2>
       <span>Dados relacionados ao responsável</span>
       <hr />
       <TextField 
          type="text"
          label="ID"
          disabled
          value={params.id} />

       <TextField 
          type="text"
          disabled
          value={responsible?.name} />

        <TextField 
          type="text"
          disabled
          value={responsible?.phone_number} />  

        <h2>Localização</h2>
        <span>Dados relacionados à localização do resonsável</span>

         <TextField 
          type="text"
          disabled
          value={responsible?.public_place} />

        <TextField 
          type="text"
          disabled
          value={responsible?.district} />

        <TextField 
          type="text"
          disabled
          value={responsible?.city} />

        <TextField 
          type="text"
          disabled
          value={responsible?.state} />

        <TextField 
          type="text"
          disabled
          value={responsible?.cep} />

        <TextField 
          type="text"
          disabled
          value={responsible?.number} />

     </form>
      
      </CreateCompanyContainer>
    </>
  )
}