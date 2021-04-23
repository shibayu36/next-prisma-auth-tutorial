import { signIn, signOut, useSession } from "next-auth/client";

const Home: React.VFC = () => {
  const [session] = useSession();
  return (
    <>
      {!session && (
        <>
          サインインしてください。 <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          サインイン完了。 id: {session.user.id}, email: {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default Home;
