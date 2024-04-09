"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
         email: formData.get("email"),
         password: formData.get("password"),
         redirect: false,
      });

      if(res?.error) return setError(res.error as string);

      if(res?.ok) return router.push("/dashboard/profile");
      console.log(res);
  };

  return (
    <div className="flex justify-center items-center h-screen">
       <form onSubmit={handleSubmit} className="bg-gray-400 p-4 rounded-lg shadow-md">

      { error && <div className="bg-red-500 text-white p-2 mb-2">
          {error}
        </div>}
        <h1 className="text-3xl text-black font-bold text-center py-2">Sign In</h1>

        <input 
           type="email" 
           placeholder="Email" 
           name="email" 
           className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"/>
        <input 
           type="password" 
           placeholder="Password" 
           name="password" 
           className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"/>
         <div className="flex justify-center"> {/* Contenedor para centrar el botón */}
          <button className="bg-indigo-500 px-4 py-2 rounded-md my-2">
            Login
          </button>
        </div>
       </form>
    </div>
  );
}

export default LoginPage;