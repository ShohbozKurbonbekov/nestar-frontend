import { initializeApollo } from "@/apollo/client";
import { LIKE_TARGET_MEMBER } from "@/apollo/user/mutation";

export const likeTargetMember = async (id: string): Promise<void> => {
  const apolloClient = await initializeApollo();

  try {
    await apolloClient.mutate({
      mutation: LIKE_TARGET_MEMBER,
      variables: { input: id },
    });
  } catch (error) {
    console.error("Error in likeTargetMember service: ", error);
    throw error;
  }
};
