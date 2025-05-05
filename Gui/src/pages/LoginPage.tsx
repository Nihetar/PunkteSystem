import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // TODO: Implement real login logic

  const handleLogin = async () => {
    login('testToken');
    navigate('/', { replace: true });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Benutzername"
          value={""}
          fullWidth
        />
        <TextField
          label="Passwort"
          type="password"
          value={""}
          fullWidth
        />
        <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Box>
    </Container>
  );
}
