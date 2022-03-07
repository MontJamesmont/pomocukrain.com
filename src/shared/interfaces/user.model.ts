export interface User {
  id?: string;
  username: string;
  name: string;
  surname: string;
  department: string;
  src: string;
}

export const loggedUserMock = { id: 'asd4759835tsfgh', username: 'AdamS', name: 'Adam', surname: 'Smith', src: 'https://i.pravatar.cc/300', department: 'Printing' }
