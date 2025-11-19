const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// api types
type ApiOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

const api = async (url: string, options: ApiOptions = {}) => {
  const token = () => localStorage.getItem("token");

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// auth api
export const register = (name: string, email: string, password: string) => {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = (email: string, password: string) => {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// task api
export const getTasks = (status?: string) => {
  const query = status ? `?status=${status}` : "";
  return api(`/tasks${query}`);
};

export const createTask = (
  title: string,
  description: string,
  status: string
) => {
  return api("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, description, status }),
  });
};

export const updateTask = (
  id: number,
  title: string,
  description: string,
  status: string
) => {
  return api(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description, status }),
  });
};

export const deleteTask = (id: number) => {
  return api(`/tasks/${id}`, {
    method: "DELETE",
  });
};
