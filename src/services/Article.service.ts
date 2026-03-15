import { initializeApollo } from "@/apollo/client";
import { LIKE_TARGET_BOARD_ARTICLE } from "@/apollo/user/mutation";

export const likeTargetArticle = async (id: string): Promise<void> => {
  const apolloClient = await initializeApollo();

  try {
    await apolloClient.mutate({
      mutation: LIKE_TARGET_BOARD_ARTICLE,
      variables: { input: id },
    });
  } catch (error) {
    console.error("Error in likeTargetArticle service: ", error);
    throw error;
  }
};
