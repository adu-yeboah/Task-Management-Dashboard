export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}