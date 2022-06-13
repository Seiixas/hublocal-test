import { Container } from "./style";

import hublocalGif from '../../assets/signin/hublocal-logo-animated.gif';
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { Message } from "../Message";

export function Singin() {
  const [emailAuthentication, setEmailAuthentication] = useState<string | null>(null);
  const [passwordAuthentication, setPasswordAuthentication] = useState<string | null>(null);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function handleAuthentication(event: FormEvent) {
    event.preventDefault();
    
    try {
      const response = await api.post('/users/auth', {
        email: emailAuthentication,
        password: passwordAuthentication
      });

      const { auth } = response.data;

      localStorage.setItem('token', auth);
    } catch (err: any) {
      const { message } = err.response.data;
      setAlertSeverity('error');
      setAlertMessage(message);
      setIsAlertOpen(true);
    }
  }

  return (
    <Container>
      <Message 
        visibility={isAlertOpen}
        type={alertSeverity}>
          {alertMessage}
      </Message>
      <form onSubmit={handleAuthentication}>
        <img src={hublocalGif} alt="" />
        <TextField
          label="E-mail"
          type="email"
          required
          onChange={(event) => setEmailAuthentication(event.target.value)} />

        <TextField 
          type="password"
          label="Senha"
          required
          onChange={(event) => setPasswordAuthentication(event.target.value)} />
        <Button type="submit">Entrar</Button>
        <span>Não é cadastrado? Crie sua conta <Link to='/signup'>aqui</Link>.</span>
      </form>
    </Container>
  )
}