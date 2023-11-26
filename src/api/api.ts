export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json() as Promise<{ data: T }>;
  
  return (await data).data;
}; 
