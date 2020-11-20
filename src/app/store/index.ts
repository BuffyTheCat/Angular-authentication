import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './login/login.effect';
import * as login from './login/login.reducer';
import { LogoutEffects } from './logout/logout.effect';
import { ResetPasswordEffects } from './reset-password/reset-password.effect';
export interface AppState {
    login: login.LoginState;
}

export const appReducers: ActionReducerMap<AppState> = {
    login: login.reducer,
};

export const APP_EFFECTS = [
    AuthEffects,
    LogoutEffects,
    ResetPasswordEffects,
];
