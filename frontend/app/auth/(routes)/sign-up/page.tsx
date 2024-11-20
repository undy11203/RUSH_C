"use client";
import { signIn } from "next-auth/react";
import { useRef } from "react";


export default function Sign_up() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;

    const response = await fetch('http://localhost:9000/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (response.ok) {
      alert('Registration successful!');
      await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
        // callbackUrl: "/",
      })
    } else {
      alert('Registration failed.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        ref={emailRef}
        required
      />
      <br/>
      <input
        type="username"
        placeholder="Username"
        ref={usernameRef}
        required
      />
      <br/>
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        required
      />
      <br/>
      <button type="submit">Register</button>
    </form>
  );
}