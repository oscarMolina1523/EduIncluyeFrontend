import {jwtDecode} from "jwt-decode";

export function decodeToken<T>(token: string): T {
  return jwtDecode<T>(token);
}
