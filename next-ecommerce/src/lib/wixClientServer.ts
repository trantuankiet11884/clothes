import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import Cookies from "js-cookie";

export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookieValue = Cookies.get("refreshToken");
    refreshToken = cookieValue ? JSON.parse(cookieValue) : null;
  } catch (e) {}

  const wixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
