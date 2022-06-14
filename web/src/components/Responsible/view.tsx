import { Breadcrumbs, TextField, Typography } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Person fontSize="large"/>
          <Typography variant="h4">{ responsible?.name }</Typography>
        </div>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link color="inherit" to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link color="inherit" to="/responsible" style={{ color: "white" }}>
            Responsáveis
          </Link>
          <Typography>Ver Responsável</Typography>
        </Breadcrumbs>
     </header>

     <form>
       <Typography variant="h5">Responsável</Typography>
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

        <Typography variant="h5">Localização</Typography>
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