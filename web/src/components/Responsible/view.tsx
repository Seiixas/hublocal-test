import { TextField } from "@material-ui/core"
import { Apartment, Person, Place } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
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
  const params = useParams();

  const [responsible, setResponsible] = useState<IResponsible>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/responsibles/${params.id}`);

      console.log(response.data);

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
    }
    fetchData();
  }, []);

  return (
    <>
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