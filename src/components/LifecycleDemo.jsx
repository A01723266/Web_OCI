import { useEffect, useRef, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function LifecycleDemo() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const didMount = useRef(false);

  useEffect(() => {
    console.log("LifecycleDemo montado");

    return () => {
      console.log("LifecycleDemo desmontado");
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      console.log("LifecycleDemo actualizado");
      return;
    }

    didMount.current = true;
  });

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Ciclo de vida del componente
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Revisa la consola del navegador al montar, actualizar y desmontar este componente.
      </Typography>

      <Box display="grid" gap={2}>
        <TextField
          label="Texto para actualizar"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <Box display="flex" gap={2} alignItems="center">
          <Button variant="contained" onClick={() => setCount((value) => value + 1)}>
            Actualizar contador
          </Button>
          <Typography>Actualizaciones: {count}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default LifecycleDemo;
