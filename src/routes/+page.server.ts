import type { Actions } from './$types';

export const actions = {
  default: async ({cookies, request}) => {
    const data = await request.formData();
    console.log('Form submitted', data);
  }
} satisfies Actions;
