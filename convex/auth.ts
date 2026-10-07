import { convexAuth } from "@convex-dev/auth/server"
import { Password } from "@convex-dev/auth/providers/Password"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // Admin accounts already exist; refuse new sign-ups so nobody can create
      // an account through the public auth endpoint and gain admin access.
      profile(params) {
        if (params.flow === "signUp") {
          throw new Error("Sign-ups are disabled")
        }
        return { email: params.email as string }
      },
    }),
  ],
})
