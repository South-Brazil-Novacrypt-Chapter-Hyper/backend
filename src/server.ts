import Express from 'express';
import Cors from 'cors';

const app = Express();


app.use(Cors())
app.use(Express.json())

app.listen(3333, () => console.log('Servidor foi iniciado'))