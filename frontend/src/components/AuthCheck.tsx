"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants";
import { AuthCheckProps } from "@/types";

export default function AuthCheck({ children }: AuthCheckProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(ROUTES.SIGN_IN);
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return redirect(ROUTES.SIGN_IN);
  }

  return <>{children}</>;
}
