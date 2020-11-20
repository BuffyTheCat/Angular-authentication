export interface User {
    email?: string
    username?: string
    password: string
    returnSecureToken?: boolean,
    token?: string
}

export interface UserInfo {
    provider: string
    name: string
    system: string
    hasQuestions: boolean
    questionIsAnswered: boolean
    mfa: boolean
}

export interface AuthResponce {
    idToken: string
    expiresIn: string
    email?: string
}

export interface ChangePass {
    idToken: string
    password: string
}

export interface SentAnswer {
    answer: string,
    rememberMe: boolean
}