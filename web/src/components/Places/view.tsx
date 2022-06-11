import { TextField } from "@material-ui/core"
import { Place } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
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

  const [place, setPlace] = useState<IPlace>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/places/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      if (response.status === 401) {
        alert('Sessão expirada');
        localStorage.removeItem('token');
        return;
      }

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
    }
    fetchData();
  }, []);

  return (
    <>
    <CreateCompanyContainer>
      <header>
        <Place fontSize="large"/>
        <h1>{ place?.name }</h1>
     </header>

     <form>
       <h2>Localização</h2>
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