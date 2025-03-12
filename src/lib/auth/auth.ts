'use server';

import { BACKEND_URL } from './constants';
import { FormState, LoginFormSchema } from './type';

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    console.log({ result });
  } else {
    return {
      message:
        response.status === 401 ? 'Invalid Credentials!' : response.statusText,
    };
  }
}
