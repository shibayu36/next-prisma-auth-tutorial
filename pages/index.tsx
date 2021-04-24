import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";
import { NewTodoForm } from "../components/NewTodoForm";
import { TodoList } from "../components/TodoList";

const Home: React.VFC = () => {
  const [session, isLoading] = useSession();
  if (isLoading) return null;

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
          <NewTodoForm />
          <TodoList />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default Home;
