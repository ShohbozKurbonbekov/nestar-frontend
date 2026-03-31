import { SUBSCRIBE, UNSUBSCRIBE } from "@/apollo/user/mutation";
import { FollowContext } from "@/libs/context/FollowContext";
import { sweetTopSuccessAlert } from "@/libs/sweetAlert";
import { useMutation } from "@apollo/client";
import { ReactNode, useCallback } from "react";

interface FollowProviderType {
  children: ReactNode;
}

function FollowProvider({ children }: FollowProviderType) {
  // Mutation
  const [subscribe] = useMutation(SUBSCRIBE);
  const [unSubscribe] = useMutation(UNSUBSCRIBE);

  // Handlers
  const onFollow = useCallback(
    async (targetId?: string) => {
      await subscribe({
        variables: {
          input: targetId,
        },
      });
    },
    [subscribe]
  );

  const onUnFollow = useCallback(
    async (targetId?: string) => {
      if (!targetId) return;

      await unSubscribe({
        variables: {
          input: targetId,
        },
      });
    },
    [unSubscribe]
  );
  return (
    <FollowContext.Provider value={{ onFollow, onUnFollow }}>
      {children}
    </FollowContext.Provider>
  );
}

export default FollowProvider;
