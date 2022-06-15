import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Toolbar,
  Typography 
} from "@material-ui/core";

import { 
   Apartment,
   ConfirmationNumber,
   GraphicEq,
   Person,
   Place,
   PowerSettingsNew,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

import { handleChangePage } from "../../utils/chagePage";
import { Message } from "../Message";

export function Dashboard() {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [countCompanies, setCountCompanies] = useState(0);
  const [countResponsible, setCountResponsible] = useState(0);
  const [countPlaces, setCountPlaces] = useState(0);

  const [countTicketFinished, setCountTicketFinished] = useState(0);
  const [countTicketInProgress, setCountTicketInProgress] = useState(0);
  const [countTicketPending, setCountTicketPending] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await api.get('/companies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCountCompanies(companies.data.length);

        const places = await api.get('/places', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCountPlaces(places.data.length);

        const responsible = await api.get('/responsibles', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCountResponsible(responsible.data.length);

        const tickets = await api.get('/tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const ticketsFinished = tickets.data.filter((ticket: any) => 
          ticket.status === 'CONCLUÍDO'
        ).length;

        setCountTicketFinished(ticketsFinished);

        const ticketsInProgress = tickets.data.filter((ticket: any) => 
          ticket.status === 'PROGRESSO'
        ).length;

        setCountTicketInProgress(ticketsInProgress);


        const ticketsPending = tickets.data.filter((ticket: any) => 
          ticket.status === 'PENDENTE'
        ).length;

        setCountTicketPending(ticketsPending);


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
        type={alertSeverity}
        visibility={isAlertOpen}
        >{ alertMessage }</Message>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h6" component="div">
              <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
                <GraphicEq />
                Dashboard
              </div>
            </Typography>
            <div>
              <Button
              id="demo-positioned-button"
              color="inherit"
              aria-haspopup="true"
              onClick={() => handleChangePage('/companies')}
              >
                <Apartment />
                Empresas
              </Button>
              <Button
              id="demo-positioned-button"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleChangePage('/responsible')}
              >
                <Person />
                Resonsáveis
              </Button>
              <Button
              color="inherit"
              id="demo-positioned-button"
              aria-haspopup="true"
              onClick={() => handleChangePage('/places')}
              >
                <Place />
                Locais
              </Button>

              <Button
              id="demo-positioned-button"
              color="inherit"
              aria-haspopup="true"
              onClick={() => handleChangePage('/tickets')}
              >
                <ConfirmationNumber />
                Tickets
              </Button>
            </div>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('id');
                location.reload();
              }}>
              <span>{name}</span>
              <PowerSettingsNew />
            </Button>
          </Toolbar>
          
        </AppBar>
      </Box>
      <div style={{ padding: '1rem' }}>
        <Typography variant="h5">Estatísticas</Typography>
        <Card style={{ marginTop: '.5rem' }}>
        <CardActionArea>
          <CardContent>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' }}>

              <Typography gutterBottom variant="h5" component="div">
                Empresas
              </Typography>

              <Apartment 
                style={{ backgroundColor: '#086ccc', color: 'white' }}
                fontSize="large"
                />
            </div>
            <Typography variant="body2">
              { countCompanies } empresas cadastradas
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleChangePage('/companies')}>
            Ver
          </Button>
        </CardActions>
        </Card>
        <Card style={{ marginTop: '.5rem' }}>
        <CardActionArea>
          <CardContent>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' }}>

              <Typography gutterBottom variant="h5" component="div">
                Responsáveis
              </Typography>

              <Person 
                style={{ backgroundColor: '#02ad02', color: 'white' }}
                fontSize="large"
                />
            </div>
            <Typography variant="body2">
              { countResponsible } responsáveis cadastrados
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleChangePage('/responsible')}>
            Ver
          </Button>
        </CardActions>
        </Card>
        <Card style={{ marginTop: '.5rem' }}>
        <CardActionArea>
          <CardContent>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' }}>

              <Typography gutterBottom variant="h5" component="div">
                Localizações
              </Typography>

              <Place 
                style={{ backgroundColor: '#d10202', color: 'white' }}
                fontSize="large"
                />
            </div>
            <Typography variant="body2">
              {countPlaces} locais cadastrados
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleChangePage('/places')}>
            Ver
          </Button>
        </CardActions>
        </Card>
        <Card style={{ marginTop: '.5rem' }}>
        <CardActionArea>
          <CardContent>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' }}>

              <Typography gutterBottom variant="h5" component="div">
                Tickets
              </Typography>

              <ConfirmationNumber 
                style={{ backgroundColor: '#38bdb9', color: 'white' }}
                fontSize="large"
                />
            </div>
            <Typography variant="body2">
              {countTicketFinished} tickets concluídos <br/>
              {countTicketPending} tickets pendentes <br/>
              {countTicketInProgress} tickets em progresso <br/>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => handleChangePage('/tickets')}>
            Ver
          </Button>
        </CardActions>
        </Card>
        
      </div>
      <div style={{ padding: '1rem' }}>
        <Typography variant="h5">Definições</Typography>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '1rem', flexWrap: 'nowrap' }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://constructionexec.com/assets/site_18/images/article/090220094124.jpg?width=1280"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Empresas
            </Typography>
            <Typography variant="body2">
            Empresa é uma organização que realiza atividades econômicas com finalidades comerciais, por meio da produção e venda de bens ou serviços.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://imageio.forbes.com/blogs-images/pauladavislaack/files/2017/12/work-colleagues.jpg?format=jpg&width=960"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Responsáveis
            </Typography>
            <Typography variant="body2">
              Responsável é a pessoa contratada para prestar serviços para um empregador, numa carga horária definida, mediante salário. O serviço necessariamente tem de ser subordinado.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://tm.ibxk.com.br/2021/12/20/20095730932072.jpg?ims=1200x675"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Localizações
            </Typography>
            <Typography variant="body2">
            É o termo usado em geografia e áreas afins para designar a posição de algo num espaço físico. Será definida a localização em endereço da empresa a qual está no sistema
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://levenaviagem.com.br/wp-content/uploads/2017/08/raffle-tickets-1024x683.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tickets
            </Typography>
            <Typography variant="body2">
              São tickets gerados para o controle de autoria do sistema, onde para todas as alterações de localização é gerado um ticket para ser aprovado ou recusado por um usuário.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
    </>
  )
}