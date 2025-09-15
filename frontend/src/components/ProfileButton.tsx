"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { ROUTES, API_CONFIG } from "@/constants";
import { STYLES } from "@/constants/styles";
import { formatApiUrl } from "@/lib/utils";

const ProfileButton = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMemory, setUserMemory] = useState<string>("");
  const [isLoadingMemory, setIsLoadingMemory] = useState(true);

  const handleLogout = async () => {
    await signOut({ callbackUrl: ROUTES.SIGN_IN });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchUserMemory = async () => {
    if (!session?.user?.email) return;

    setIsLoadingMemory(true);
    try {
      const response = await fetch(
        formatApiUrl(
          `${API_CONFIG.USER_MEMORY_ENDPOINT}?email=${encodeURIComponent(
            session.user.email
          )}`,
          API_CONFIG.BASE_URL
        ),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserMemory(data.memory || data.message || "");
    } catch (error) {
      console.error("Failed to fetch user memory:", error);
      setUserMemory("Unable to load your memory at this time.");
    } finally {
      setIsLoadingMemory(false);
    }
  };

  useEffect(() => {
    if (isModalOpen && session?.user?.email) {
      fetchUserMemory();
    }
  }, [isModalOpen, session?.user?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!session?.user) return null;

  return (
    <div className="absolute top-4 right-4 sm:right-6 md:right-8 z-[1001]">
      {/* Profile Button */}
      <button
        onClick={toggleModal}
        className={STYLES.BUTTON.PROFILE}
        aria-label="Open user profile"
      >
        <Image
          src={session.user.image || "https://via.placeholder.com/40"}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className={STYLES.MODAL.OVERLAY} onClick={toggleModal}>
          <div
            className={STYLES.MODAL.CONTAINER}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleModal}
                className={STYLES.BUTTON.ICON}
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 mb-5 p-2 gap-2">
              <Image
                src={session.user.image || "https://via.placeholder.com/60"}
                alt="User profile"
                width={50}
                height={50}
                className="rounded-full border-2 border-zinc-900"
              />
              <div>
                <h4 className="text-lg font-medium text-white">
                  {session.user.name}
                </h4>
                <p className="text-gray-400 text-sm">{session.user.email}</p>
              </div>
            </div>

            {/* User Memory */}
            <div className="flex flex-col gap-2">
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-400 mb-2 gap-2 p-2">
                  What i learned about you.
                </h5>
                <div className="bg-zinc-900 rounded-md p-4 max-h-40 overflow-y-auto">
                  {isLoadingMemory ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                      <span className="ml-2 text-gray-300">Loading...</span>
                    </div>
                  ) : (
                    <p className="text-gray-300">
                      {userMemory ||
                        "Your search history and preferences will appear here."}
                    </p>
                  )}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={
                  STYLES.BUTTON.SECONDARY +
                  " bg-red-700 border-2 border-zinc-900"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
