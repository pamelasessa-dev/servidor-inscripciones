import { Router } from "express";
import type { Request, Response } from "express";
import type { Estudiante } from "../types/types.estudiante";
import { estudiantes,
    setEstudiantes,
 } from "../data/data.estudiantes";

const router: ReturnType<typeof Router> = Router();
//endpoints
router.get("/api/estudiantes/:id", (req: Request, res: Response) => {
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

router.get("/api/estudiantes", (req: Request, res: Response) => {
  res.status(200).json(estudiantes);
});

//Crear un estudiante
router.post("/api/estudiantes",(req:Request, res:Response) =>{
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
router.put("/api/estudiantes/:id",(req:Request, res:Response)=>{
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
router.delete("/api/estudiantes/:id",(req:Request, res:Response) =>{
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
  const nuevaLista = estudiantes.filter(
    (e) => e.id !== id,
  );
  setEstudiantes(nuevaLista);

  res.json({
    mensaje: "Estudiante eliminado correctamente",
});
}

});

export default router;