import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
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

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { handleChangePage } from "../../utils/chagePage";

export function Dashboard() {

  return (
    <>
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
              <PowerSettingsNew />
              Sair
            </Button>
          </Toolbar>
          
        </AppBar>
      </Box>
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
              Veja, crie, atualize e remova empresas do sistema! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum veniam architecto sit perferendis fugit ullam adipisci molestiae mollitia facilis totam fugiat accusamus assumenda quibusdam cumque vero, doloremque labore vitae omnis.
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
              Veja, crie, atualize e remova responsáveis do sistema! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum veniam architecto sit perferendis fugit ullam adipisci molestiae mollitia facilis totam fugiat accusamus assumenda quibusdam cumque vero, doloremque labore vitae omnis.
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
              Veja, crie, atualize e remova responsáveis do sistema! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum veniam architecto sit perferendis fugit ullam adipisci molestiae mollitia facilis totam fugiat accusamus assumenda quibusdam cumque vero, doloremque labore vitae omnis.
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
              Adiocioneadasdasddas e remova tickets do sistema! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum veniam architecto sit perferendis fugit ullam adipisci molestiae mollitia facilis totam fugiat accusamus assumenda quibusdam cumque vero, doloremque labore vitae omnis.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
    </>
  )
}