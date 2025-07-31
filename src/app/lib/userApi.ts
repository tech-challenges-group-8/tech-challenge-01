export const userApi = {
  getUserSession: async () => {
    const response = await fetch(`/api/user-session`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to get user session");
    }

    return data.user;
  },

  createUser: async (userData: { name: string; email: string; password: string }) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create user");
    }

    return data;
  },
};
