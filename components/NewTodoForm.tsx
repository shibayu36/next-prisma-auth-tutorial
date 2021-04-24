import React, { FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export const NewTodoForm: React.VFC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ title: "", body: "" });

  const { mutate: addTodo } = useMutation(
    () => {
      return fetch("/api/todos", { method: "POST", body: JSON.stringify(formData) });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    addTodo();
    setFormData({ title: "", body: "" });
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        タイトル
        <input
          style={{
            width: "500px",
          }}
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "16px",
        }}
      >
        内容
        <textarea
          style={{
            width: "500px",
          }}
          id="body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
      </label>
      <button
        style={{
          width: "100px",
          marginTop: "16px",
        }}
      >
        Save
      </button>
    </form>
  );
};
