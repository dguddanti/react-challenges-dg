import { createFileRoute, redirect } from '@tanstack/react-router';
import { signInWithGoogle } from '../utilities/firebase';
import * as z from 'zod';

const Login = () => (
  <div className="flex flex-col items-center justify-center p-12">
    <button
      type="button"
      onClick={signInWithGoogle}
      className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
    >
      Sign in with Google
    </button>
  </div>
);

// if user exists, redirect to original page in search or home
// the validate ensures search.redirect is present, possibly ''
export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ href: search.redirect || '/' })
    }
  },
  component: Login,
});