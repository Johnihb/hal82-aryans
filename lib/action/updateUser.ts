
export const updateUser = async ({data}:{data:{phone:string , username:string}}) => {

  const response = await fetch('/api/update-user', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(!response.ok) throw new Error('Failed to update user');

  return response.json();

}



