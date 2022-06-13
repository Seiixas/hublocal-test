import { Container } from "../Signin/style";

import hublocalGif from '../../assets/signin/hublocal-logo-animated.gif';
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { api } from "../../lib/api";
import { Message } from "../Message";

export function Signup() {
  const [nameAuthentication, setNameAuthentication] = useState<string | null>(null);
  const [emailAuthentication, setEmailAuthentication] = useState<string | null>(null);
  const [passwordAuthentication, setPasswordAuthentication] = useState<string | null>(null);
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning'>('success');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function handleSignup(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/users', {
        email: emailAuthentication,
        password: passwordAuthentication,
        name: nameAuthentication
      });

      if (response.status === 201) {
        setAlertSeverity('success');
        setAlertMessage('Conta criada com sucesso!');
        setIsAlertOpen(true);
        setEmailAuthentication(null);
        setNameAuthentication(null);
        setPasswordAuthentication(null);
      }
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
      <form onSubmit={handleSignup}>
        <img src={hublocalGif} alt="" />
        <h2>Efetue o seu cadastro</h2>

        <TextField 
          placeholder="Ex: Maria José da Silva"
          type="text"
          label="Nome completo"
          required
          onChange={(event) => setNameAuthentication(event.target.value)} />

        <TextField 
          placeholder="Ex: maria@jose.com"
          label="E-mail"
          type="email"
          required
          onChange={(event) => setEmailAuthentication(event.target.value)} />

        <TextField 
          type="password"
          label="Senha"
          required
          onChange={(event) => setPasswordAuthentication(event.target.value)} />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Container>
  )
}