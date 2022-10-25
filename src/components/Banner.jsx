import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = ({ user }) => {
  return user ? <SignOutButton /> : <SignInButton />;
};

const Banner = ({ title, user }) => (
  <div className="d-flex">
    <h1>{title}</h1> <AuthButton user={user} />
  </div>
);

export default Banner;
