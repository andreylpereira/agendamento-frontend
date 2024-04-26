import { createFeatureSelector } from '@ngrx/store';
import Agendamento from '../models/agendamento.model';


export const selectAgendamentos = createFeatureSelector<Agendamento[]>('agendamento');
