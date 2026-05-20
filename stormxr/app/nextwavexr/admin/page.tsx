"use client"

import { useConvexAuth } from "convex/react"
import { useEffect, useLayoutEffect } from "react";
import { UnauthenticatedScreen } from "./create/page";
import { useRouter } from "next/navigation";

export default function Page() {

    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/nextwavexr/admin/dashboard")
        }
    }, [isAuthenticated]);

    if (isLoading) return null;
    
    return (
        <UnauthenticatedScreen />
    )
}

// export default function Page() {
//   const { isAuthenticated } = useConvexAuth();
//   const { signIn } = useAuthActions();

//   const [step, setStep] = useState<"email" | "code">("email");
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useLayoutEffect(() => {
//     if (isAuthenticated) {
//       window.location.href = "/admin/dashboard";
//     }
//   }, [isAuthenticated]);

//   const handleSendCode = async () => {
//     if (!email) return;
//     setLoading(true);
//     setError("");
//     try {
//       await signIn("resend-otp", { email });
//       setStep("code");
//     } catch (e) {
//       setError("Failed to send code. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = async () => {
//     if (!code) return;
//     setLoading(true);
//     setError("");
//     try {
//       await signIn("resend-otp", { email, code });
//     } catch (e) {
//       setError("Invalid code. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-950">
//       <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
//         <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
//         <p className="text-gray-400 text-sm mb-6">
//           {step === "email"
//             ? "Enter your email to receive a sign-in code."
//             : `We sent a code to ${email}`}
//         </p>

//         {error && (
//           <p className="text-red-400 text-sm mb-4">{error}</p>
//         )}

//         {step === "email" ? (
//           <>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
//               placeholder="you@example.com"
//               className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//             />
//             <button
//               onClick={handleSendCode}
//               disabled={loading || !email}
//               className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-lg py-3 text-sm transition-colors"
//             >
//               {loading ? "Sending..." : "Send Code"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
//               placeholder="Enter 8-digit code"
//               maxLength={8}
//               className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-4 tracking-widest text-center text-lg"
//             />
//             <button
//               onClick={handleVerifyCode}
//               disabled={loading || code.length < 8}
//               className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-lg py-3 text-sm transition-colors"
//             >
//               {loading ? "Verifying..." : "Verify Code"}
//             </button>
//             <button
//               onClick={() => { setStep("email"); setCode(""); setError(""); }}
//               className="w-full mt-3 text-gray-400 hover:text-white text-sm transition-colors"
//             >
//               ← Use a different email
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }