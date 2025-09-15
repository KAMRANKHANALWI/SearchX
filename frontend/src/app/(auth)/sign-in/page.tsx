"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CommonLayout from "@/components/CommonLayout";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { STYLES } from "@/constants/styles";

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push(ROUTES.HOME);
    }
  }, [status, session, router]);

  const handleGoogleSignIn = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Don't render anything if user is authenticated (will redirect)
  if (status === "authenticated") {
    return null;
  }

  return (
    <CommonLayout>
      <div className={`${STYLES.CONTAINER.CENTERED} p-4 h-full`}>
        <div className="w-full max-w-md flex flex-col items-center justify-center gap-2">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to SearchX
            </h1>
          </div>

          <button
            onClick={() => handleGoogleSignIn("google")}
            className={STYLES.BUTTON.PRIMARY}
          >
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </CommonLayout>
  );
};

export default SignIn;
