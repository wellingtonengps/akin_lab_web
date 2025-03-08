export interface AuthResponse {
  name: string;
  lastName: string;
  gender: string;
  email: string;
  avatar: string;
  username: string;
  accessToken: string;
  password: string | null;
  refreshToken: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}
