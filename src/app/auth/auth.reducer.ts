import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.models';
import * as UserAction from './auth.action';

export interface State {
    user: Usuario;
}

export const initialState: State = {
    user: null
}

const _authReducer = createReducer(initialState,

    on(UserAction.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(UserAction.unSetUser, (state) => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}