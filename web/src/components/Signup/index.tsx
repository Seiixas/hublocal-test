import { Container } from "../Signin/style";

import hublocalGif from '../../assets/signin/hublocal-logo-animated.gif';
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

export function Signup() {
  const [nameAuthentication, setNameAuthentication] = useState<string | null>(null);
  const [emailAuthentication, setEmailAuthentication] = useState<string | null>(null);
  const [passwordAuthentication, setPasswordAuthentication] = useState<string | null>(null);
  
  function handleSignup(event: FormEvent) {
    event.preventDefault();

    console.log({
      name: nameAuthentication,
      password: passwordAuthentication,
      email: emailAuthentication
    });
  }

  return (
    <Container>
      <form onSubmit={handleSignup}>
        <img src={hublocalGif} alt="" />
        <h2>Efetue o seu cadastro</h2>

        <TextField 
          placeholder="Ex: Maria José da Silva"
          type="text"
          label="Nome completo"
          onChange={(event) => setNameAuthentication(event.target.value)} />

        <TextField 
          type="password"
          label="Senha"
          helperText="Necessário 5 caracteres"
          onChange={(event) => setPasswordAuthentication(event.target.value)} />

        <TextField 
          placeholder="Ex: maria@jose.com"
          label="E-mail"
          type="email"
          onChange={(event) => setEmailAuthentication(event.target.value)} />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Container>
  )
}