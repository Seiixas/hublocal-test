import { Breadcrumbs, Button, TextField, Typography } from "@material-ui/core"
import { Check, Close, Person } from "@material-ui/icons"
import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { Message } from "../Message";
import { CreateCompanyContainer } from './style';

interface ITicket {
  title: string;
  status: string;
  name: string;
  public_place: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  place_id: string;
}

interface IPlace {
  id: string;
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

export function ViewTicket() {
  const token = localStorage.getItem('token');
  const params = useParams();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [ticket, setTicket] = useState<ITicket>();
  const [place, setPlace] = useState<IPlace>();

  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/tickets/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setTicket({
          title: response.data.title,
          name: response.data.name,
          status: response.data.status,
          public_place: response.data.public_place,
          complement: response.data.complement,
          district: response.data.district,
          city: response.data.city,
          state: response.data.state,
          cep: response.data.cep,
          number: response.data.number,
          place_id: response.data.placeId
        });
  
        setPlaceId(response.data.placeId);
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

    const fetchPlaceData = async () => {
      try {
        const response = await api.get(`/places/${placeId}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
  
        setPlace({
          id: response.data[0].id,
          name: response.data[0].name,
          public_place: response.data[0].public_place,
          complement: response.data[0].complement,
          district: response.data[0].district,
          city: response.data[0].city,
          state: response.data[0].state,
          cep: response.data[0].cep,
          number: response.data[0].number,
          company_id: response.data[0].companyId
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

    const changeStatus = async () => {
      window.scrollTo(0, 0);
      if (ticket?.status === 'PENDENTE') {
        try {
          const t = await api.patch(`/tickets/${params.id}`, {
            status: 'PROGRESSO'
          }, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });

          console.log(t);
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
    }

    fetchData();
    changeStatus();
    fetchPlaceData()
      .catch((err) => console.log(err));
  }, []);

  async function handleCancel() {
    try {
      await api.patch(`/tickets/${params.id}`, {
        status: 'CONCLUÍDO'
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      setAlertSeverity('success');
      setAlertMessage('Ticket não autorizado com sucesso!');
      setIsAlertOpen(true);
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put(`/places/${place?.id}`, {
        name: ticket?.name,
        cep: ticket?.cep,
        public_place: ticket?.public_place,
        complement: ticket?.complement,
        district: ticket?.district,
        number: ticket?.number,
        state: ticket?.state,
        city: ticket?.city,
        company_id: place?.company_id
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      if (response.status === 204) {
        setAlertSeverity('success');
        setAlertMessage('Local atualizado!');
        setIsAlertOpen(true);
      }

      await api.patch(`/tickets/${params.id}`, {
        status: 'CONCLUÍDO'
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
    }}

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
          <Typography variant="h4">{ ticket?.name }</Typography>
        </div>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
          <Link color="inherit" to="/" style={{ color: "white" }}>
            Dashboard
          </Link>
          <Link color="inherit" to="/tickets" style={{ color: "white" }}>
            Tickets
          </Link>
          <Typography>Ver Ticket</Typography>
        </Breadcrumbs>
     </header>

     <form onSubmit={handleSubmit}>
       <Typography variant="h5">Ticket</Typography>
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
          value={ticket?.title} />

        <TextField 
          type="text"
          disabled
          value={ticket?.status} />

        <Typography variant="h5">Dados atuais</Typography>
        <span>Dados que já estão persistidos no banco de dados.</span>

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

        <Typography variant="h5">Dados para alteração</Typography>
        <span>Dados da proposta de alteração que gerou este ticket.</span>

         <TextField 
          type="text"
          disabled
          value={ticket?.public_place} />

        <TextField 
          type="text"
          disabled
          value={ticket?.district} />

        <TextField 
          type="text"
          disabled
          value={ticket?.city} />

        <TextField 
          type="text"
          disabled
          value={ticket?.state} />

        <TextField 
          type="text"
          disabled
          value={ticket?.cep} />

        <TextField 
          type="text"
          disabled
          value={ticket?.number} />

        { ticket?.status !== 'CONCLUÍDO' && (
          <>
            <Button type="submit"><Check /> Aceitar</Button>
            <Button className="cancel" onClick={handleCancel}><Close/> Recusar</Button>
          </>
        ) }

     </form>
      
      </CreateCompanyContainer>
    </>
  )
}