import { Container } from "./style";

import hublocalGif from '../../assets/signin/hublocal-logo-animated.gif';
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

export function Singin() {
  const [emailAuthentication, setEmailAuthentication] = useState<string | null>(null);
  const [passwordAuthentication, setPasswordAuthentication] = useState<string | null>(null);

  async function handleAuthentication(event: FormEvent) {
    event.preventDefault();


    console.log({
      email: emailAuthentication,
      password: passwordAuthentication
    });

    try {
      const response = await api.post('/users/auth', {
        email: emailAuthentication,
        password: passwordAuthentication
      });

      const { auth } = response.data;

      localStorage.setItem('token', auth);
    } catch (err: any) {
      const { message } = err.response.data;
      alert(message);
    }
  }

  return (
    <Container>
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