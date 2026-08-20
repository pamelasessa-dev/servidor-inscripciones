import type { Estudiante } from "../types/types.estudiante";

export let estudiantes: Estudiante[] = [];

export function setEstudiantes(nuevaLista: Estudiante[]){
    estudiantes = nuevaLista;
}