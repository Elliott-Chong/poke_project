import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

type Props = {};

const RegisterPage = (props: Props) => {
  const { register } = useGlobalContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    register(
      formData.get("username") as string,
      formData.get("email") as string,
      formData.get("password") as string,
      formData.get("password2") as string
    );
  };
  return (
    <main className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-poppins text-white">
      <div className="flex flex-col bg-zinc-600 rounded-md">
        <div className="bg-zinc-800 p-5 rounded-md">
          <h1 className="font-bold text-3xl">Register</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-5 flex flex-col gap-6 text-white"
        >
          <div className="flex flex-col gap-2 font-bold">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="flex flex-col gap-2 font-bold">
            <label htmlFor="email">email</label>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-2 font-bold">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="flex flex-col gap-2 font-bold">
            <label htmlFor="password2">Confirm password</label>
            <input
              className="input"
              type="password"
              name="password2"
              placeholder="Confirm password"
              id="password2"
            />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="btn self-start bg-blue-600">
              Register
            </button>
            <Link className="underline" to="/register">
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
