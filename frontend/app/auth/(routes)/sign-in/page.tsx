"use client";
import { signIn } from "next-auth/react";
import { useRef } from "react"


export default function Sign_in() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      redirect: false,
      // callbackUrl: "/",
    })
  };

  return (
  <div>
    <h1>Вход</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Имя пользователя:
          <input
            type="text"
            ref={usernameRef}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Пароль:
          <input
            type="password"
            ref={passwordRef}
            required
          />
        </label>
      </div>
        <button type="submit">Войти</button>
    </form>
  </div>
  );
}
