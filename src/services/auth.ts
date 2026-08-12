import { events } from "../data/events";
import { users } from "../data/users";
import { User } from "../models/User";

export const AuthService = {
  async authenticateUser(
    username: string,
    password: string,
  ): Promise<{
    user: Omit<User, "password" | "events">;
    accessToken: string;
  } | null> {
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      // In a real application, you would generate a JWT or similar token here
      const accessToken = `fake-jwt-token-for-${user.name}`;
      const userWithoutSensitiveData = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        events: user.events,
      };

      return { user: userWithoutSensitiveData, accessToken };
    }
    return null;
  },
};
