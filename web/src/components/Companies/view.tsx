import { TextField } from "@material-ui/core"
import { Apartment } from "@material-ui/icons"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
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
          alert('Sessão expirada');
          localStorage.removeItem('token');
          location.reload();
          return;
        }
        
        alert(err.response.data.message);
      }
      
    }
    fetchData();
  }, []);

  return (
    <>
    <CreateCompanyContainer>
      <header>
        <Apartment fontSize="large"/>
        <h1>{ company?.name }</h1>
     </header>

     <form>
       <h2>Empresa</h2>
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