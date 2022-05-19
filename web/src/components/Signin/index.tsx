import { Container } from "./style";

import hublocalGif from '../../assets/signin/hublocal-logo-animated.gif';
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export function Singin() {
  const [emailAuthentication, setEmailAuthentication] = useState<string | null>(null);
  const [passwordAuthentication, setPasswordAuthentication] = useState<string | null>(null);

  function handleAuthentication(event: FormEvent) {
    event.preventDefault();

    console.log({
      email: emailAuthentication,
      password: passwordAuthentication
    });
  }

  return (
    <Container>
      <form onSubmit={handleAuthentication}>
        <img src={hublocalGif} alt="" />
        <TextField
          label="E-mail"
          type="email"
          onChange={(event) => setEmailAuthentication(event.target.value)} />

        <TextField 
          type="password"
          label="Senha"
          onChange={(event) => setPasswordAuthentication(event.target.value)} />
        <Button type="submit">Entrar</Button>
        <span>Não é cadastrado? Crie sua conta <Link to='/signup'>aqui</Link>.</span>
      </form>
    </Container>
  )
}