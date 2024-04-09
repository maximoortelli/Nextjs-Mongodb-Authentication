"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {

  const [error, setError] = useState();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try { 
      const signupResponse = await axios.post('/api/auth/signup', {
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const res = await signIn("credentials", {
         email: signupResponse.data.email,
         password: formData.get("password"),
         redirect: false,
      });

      if(res?.ok) return router.push("/dashboard");
      console.log(res);
    } catch (error){
      console.log(error);
      if(error instanceof AxiosError){
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
       <form onSubmit={handleSubmit} className="bg-gray-400 p-4 rounded-lg shadow-md">

      { error && <div className="bg-red-500 text-white p-2 mb-2">
          {error}
        </div>}
        <h1 className="text-3xl text-black font-bold text-center py-2">Register</h1>

        <input 
           type="text" 
           placeholder="Full name" 
           name="fullname" 
           className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
        />
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
            Register
          </button>
        </div>
       </form>
    </div>
  );
}

export default RegisterPage;
