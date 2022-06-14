import { Breadcrumbs, TextField, Typography } from "@material-ui/core"
import { Place } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { Message } from "../Message";
import { CreateCompanyContainer } from './style';

interface IPlace {
  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  company_id: string;
}

export function ViewPlace() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [place, setPlace] = useState<IPlace>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/places/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setPlace({
          name: response.data.name,
          public_place: response.data.public_place,
          complement: response.data.complement,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Place fontSize="large"/>
          <Typography variant="h4">{ place?.name }</Typography>
        </div>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link color="inherit" to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link color="inherit" to="/places" style={{ color: "white" }}>
            Locais
          </Link>
          <Typography>Ver Local</Typography>
        </Breadcrumbs>
     </header>

     <form>
       <Typography variant="h5">Localização</Typography>
       <span>Dados relacionados à localização</span>
       <hr />
       <TextField 
          type="text"
          label="ID"
          disabled
          value={params.id} />

       <TextField 
          type="text"
          disabled
          value={place?.name} />

         <TextField 
          type="text"
          disabled
          value={place?.public_place} />

        <TextField 
          type="text"
          disabled
          value={place?.district} />

        <TextField 
          type="text"
          disabled
          value={place?.city} />

        <TextField 
          type="text"
          disabled
          value={place?.state} />

        <TextField 
          type="text"
          disabled
          value={place?.cep} />

        <TextField 
          type="text"
          disabled
          value={place?.number} />

     </form>
      
      </CreateCompanyContainer>
    </>
  )
}