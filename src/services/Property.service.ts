import { initializeApollo } from "@/apollo/client";
import { LIKE_TARGET_PROPERTY } from "@/apollo/user/mutation";

export const likeTargetProperty = async (id: string): Promise<void> => {
  const apolloClient = await initializeApollo();

  try {
    await apolloClient.mutate({
      mutation: LIKE_TARGET_PROPERTY,
      variables: { input: id },
    });
  } catch (error) {
    (console.error("Error in likeTargetProperty service: "), error);
    throw error;
  }
};
