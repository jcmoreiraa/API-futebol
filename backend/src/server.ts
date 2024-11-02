import express from 'express';
import campeonatoRouter from './routes/campeonatoRouter';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Certifique-se de que esta porta corresponda à sua aplicação frontend
    credentials: true 
}));

app.use(express.json());

app.use('/campeonato', campeonatoRouter);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
