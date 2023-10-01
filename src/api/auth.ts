import { fetcher } from '~/lib/axios';

type RegisterData = {
  username: string;
  password: string;
  email: string;
};

export const register = async ({ username, email, password }: RegisterData) => {
  let data;
  await fetcher
    .post('/auth/register', { username, email, password })
    .then((res) => {
      data = res.data;
    });
  return data;
};
