import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const duration = expirationDate.getTime() - new Date().getTime();
  return duration;
} 

export function getAuthToken() {
  const token = localStorage.getItem('token');
  if(!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  if(tokenDuration < 0) {
    return 'expire';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if(!token) {
    return redirect('/auth');
  }
  return null;
}

export function confirmAuthLoader() {
  const token = getAuthToken();
  if(token) {
    return redirect('/');
  }
  return null;
}