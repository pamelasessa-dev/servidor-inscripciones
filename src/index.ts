import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante{
  id:number;
  nombre:string;
  email:string;
  bootcamp:string;
}
let estudiantes: Estudiante[] = [];

/*CRUD*/
//---endpoints--/7
//obtener un estudiante especifico por su id
interface idParam {
  id:string;
}

app.get("/api/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscado = Number(req.params.id);
  if(isNaN(idBuscado)){
    return res.status(400)
    .json({error: "debe escribir un número válido"});

  }
  const estudianteFiltrado = estudiantes.find(
    (e) => e.id === idBuscado,
  );
  if(!estudianteFiltrado){
    return res.status(404)
    .json({error: "no esxiste un estudiante con ese id"});

  }
  res.status(200).json(estudianteFiltrado);
});

//obtener los estudiantes

app.get("/api/estudiantes", (req: Request, res: Response) => {
  res.status(200).json(estudiantes);
});

//Crear un estudiante
app.post("/api/estudiantes",(req:Request, res:Response) =>{
  const {nombre,email,bootcamp} = req.body;
  if(!email){
    return res.status(400).json({
      mensaje: "Debe ingresar su email!"
    });
  }
  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);

});

//Actualizar estudiante
app.put("/api/estudiantes/:id",(req:Request, res:Response)=>{
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex((estudiante)=>{
    return estudiante.id === idBuscado;
  });
  if(index === -1){
    return res.status(404).json({
      error: "Estudiante no encontrado."
    });

  }
  const {nombre,email,bootcamp} = req.body;


  estudiantes[index] = {
    id: idBuscado,
    nombre: nombre ?? estudiantes[index]?.nombre,
    email: email ?? estudiantes[index]?.email,
    bootcamp: bootcamp ?? estudiantes[index]?.bootcamp

  };
  res.json(estudiantes[index]);
});

//Eliminar un estudiante
app.delete("/api/estudiantes/:id",(req:Request, res:Response) =>{
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex(function (e){
    return e.id === id;
  });
  
  if(indice === -1){
  return res
  .status(404)
  .json({ error:"Estudiante no encontrado."
});
}else{
  estudiantes = estudiantes.filter(
    (e) => e.id !== id,
  );
  res.json({mensaje: "Estudiante eliminado correctamente"})
}

});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'Servidor en línea',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});