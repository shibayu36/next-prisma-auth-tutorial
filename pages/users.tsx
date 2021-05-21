import React from "react";
import { useQuery } from "react-query";
import { client } from "../lib/client";

const UsersHandler: React.VFC = () => {
  const { data, isLoading, error } = useQuery("allUsers", async () => await client.allUsers());

  if (isLoading) return <div>Loading...</div>;

  if (error) return <span>"An error has occurred: " + error</span>;
  console.log(error);

  console.log(data);
  data.getAllUsers.map((user) => {
    console.log(user.name);
  });

  return (
    <ul>
      {data.getAllUsers.map((user) => (
        <li>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersHandler;
