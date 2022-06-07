import { Container } from "../Signin/style";

import hublocalGif from '../../assets/signin/hublocal-logo-animated.gif';
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { api } from "../../lib/api";

export function Signup() {
  const [nameAuthentication, setNameAuthentication] = useState<string | null>(null);
  const [emailAuthentication, setEmailAuthentication] = useState<string | null>(null);
  const [passwordAuthentication, setPasswordAuthentication] = useState<string | null>(null);
  
  async function handleSignup(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/users', {
        email: emailAuthentication,
        password: passwordAuthentication,
        name: nameAuthentication
      });

      if (response.status === 201) {
        alert('Account created successfully');
        setEmailAuthentication(null);
        setNameAuthentication(null);
        setPasswordAuthentication(null);
      }
    } catch (err: any) {
      const { message } = err.response.data;
      alert(message);
    }
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
          placeholder="Ex: maria@jose.com"
          label="E-mail"
          type="email"
          onChange={(event) => setEmailAuthentication(event.target.value)} />

        <TextField 
          type="password"
          label="Senha"
          helperText="Necessário 5 caracteres"
          onChange={(event) => setPasswordAuthentication(event.target.value)} />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Container>
  )
}