import { Button, TextField } from "@material-ui/core"
import { Check, Close, Person } from "@material-ui/icons"
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
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
  const params = useParams();

  const [ticket, setTicket] = useState<ITicket>();
  const [place, setPlace] = useState<IPlace>();

  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/tickets/${params.id}`);

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
    }

    const fetchPlaceData = async () => {
      const response = await api.get(`/places/${placeId}`);

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
    }

    const changeStatus = async () => {
      if (ticket?.status === 'PENDENTE') {
        await api.patch(`/tickets/${params.id}`, {
          status: 'PROGRESSO'
        })
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
      });
    } catch (err: any) {
      alert(err.response.data.message);
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
      });

      if (response.status === 201) {
        alert('Local atualizado!');
      }

      await api.patch(`/tickets/${params.id}`, {
        status: 'CONCLUÍDO'
      })
      
    } catch (err: any) {
      alert(err.response.data.message);
    }}

  return (
    <>
    <CreateCompanyContainer>
      <header>
        <Person fontSize="large"/>
        <h1>{ ticket?.name }</h1>
     </header>

     <form onSubmit={handleSubmit}>
       <h2>Ticket</h2>
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

        <h2>Dados atuais</h2>
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

        <h2>Dados para alteração</h2>
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