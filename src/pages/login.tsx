import { useEffect } from "react";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace("/home");
    }
  }, [session, isPending, router]);

  const handleLogin = async () => {
    // After GitHub OAuth, redirect to /home.
    // Middleware will then send USER-role users to /movements automatically.
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/home",
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg
          className="animate-spin h-8 w-8 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-10 bg-white rounded-xl shadow-lg border border-gray-200 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Inicia Sesión</h1>
        <p className="text-gray-500 mb-8">Ingresa con GitHub para continuar</p>
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          Continuar con GitHub
        </button>
      </div>
    </div>
  );
}

