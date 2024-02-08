import Link from "next/link";

export default function Home() {
  return (
    <main className="justify-center items-center gap-12 py-20 px-10 flex-col flex bg-gradient-to-b from-slate-900 to-zinc-800 min-h-screen">
      <h1>
        Learning Code With Us 
      </h1>
      <div className="flex flex-col gap-y-4">
        
      <Link className="w-96 bg-cyan-600 hover:bg-gray-50 text-white hover:text-black rounded-xl px-4 py-2 text-center" href={"/signup"}>
      Create New Account
      </Link>
      <Link className="w-96 bg-cyan-600 hover:bg-gray-50 text-white hover:text-black rounded-xl px-4 py-2 text-center" href={"/login"}>
      Login With Email
      </Link>
  <div className="w-full flex gap-x-2">
  <Link className="grow w-44 bg-amber-600 hover:bg-gray-50 text-white hover:text-black rounded-xl px-4 py-2 text-center" href={"https://github.com/rezamoradi0/"}>
      About Me
      </Link>
      <Link className="grow w-44 bg-amber-600 hover:bg-gray-50 text-white hover:text-black rounded-xl px-4 py-2 text-center" href={"https://t.me/Reza_M_Info"}>
      Contact Me
      </Link>
  </div>
      
      </div>
     </main>
  );
}
