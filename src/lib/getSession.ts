import { auth } from "@/auth";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await auth();

  if (session?.user?.email) {
    try {
      const response = await fetch(`http://localhost:3000//api/getUser?email=${session.user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        session.user.id = userData.id; // Assign the id from the fetched user data to session.user.id
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  return session;
});
