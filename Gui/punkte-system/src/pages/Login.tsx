import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          benutzername: login.username,
          passwortHash: login.password,
        }),
      });

      if (res.ok) {
        navigate("/update");
      } else {
        alert("Login fehlgeschlagen");
      }
    } catch (err) {
      alert("Fehler beim Login");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Benutzername"
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
          fullWidth
        />
        <TextField
          label="Passwort"
          type="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          fullWidth
        />
        <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Box>
    </Container>
  );
}
