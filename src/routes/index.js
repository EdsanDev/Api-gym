import User from './Users.js'
import Cliente from './Cliente.js';

export default function Rutas(app){
    app.use('/user',User);
    app.use('/cliente',Cliente);
}