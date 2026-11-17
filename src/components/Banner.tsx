import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const buttonStyle = 'rounded-md border border-indigo-600 px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50';

const Banner = () => {
  const { user } = useAuthState();

  return (
    <div className="flex items-center gap-4 px-6 pb-2">
      <span className="text-sm text-gray-600">
        Welcome, {user ? user.displayName : 'guest'}!
      </span>
      <span className="ml-auto">
        {
          user
            ? <button type="button" className={buttonStyle} onClick={signOut}>Sign Out</button>
            : <button type="button" className={buttonStyle} onClick={signInWithGoogle}>Sign In</button>
        }
      </span>
    </div>
  );
};

export default Banner;