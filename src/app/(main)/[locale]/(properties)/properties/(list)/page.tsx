"use client";
import { PropertiesFilter } from "@/libs/hooks/PropertiesFilter";
import PropertiesMain from "../_components/PropertiesMain";
import PropertiesSort from "../_components/PropertiesSort";
import { PropertiesInquiry } from "@/libs/types/property/property.input";
import { Direction, Message } from "@/libs/enums/common.enum";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
// @ts-ignore
import { Property } from "@/libs/types/property/property";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetProperty } from "@/services/Property.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

export const initialInput = {
  page: 1,
  limit: 6,
  sort: "createdAt",
  direction: Direction.DESC,
  search: {
    squaresRange: {
      start: 0,
      end: 500,
    },
    pricesRange: {
      start: 0,
      end: 2000000,
    },
  },
};

export default function Property() {
  const queries = useSearchParams();
  const queriesInput = queries.get("input");
  const [initial, setInitial] = useState<PropertiesInquiry>(
    queriesInput ? JSON.parse(queriesInput) : initialInput,
  );

  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number>(0);

  const {
    loading: getPropertiesLoading,
    data: getPropertiesData,
    error: getPropertiesError,
    refetch: getPropertiesRefetch,
  } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "network-only",
    variables: { input: initial },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProperties(data?.getProperties?.list);
      setTotal(data?.getProperties?.metaCounter[0]?.total);
    },
  });

  useEffect(() => {
    if (queries.get("input")) {
      const inputValues = JSON.parse(queries.get("input") ?? "/properties");
      setInitial(inputValues);
    }
  }, [queries]);

  const likePropertyHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetProperty(id);
        getPropertiesRefetch({ input: initial });
        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likePropertyHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [getPropertiesRefetch, initial],
  );
  return (
    <section className="py-20">
      <PropertiesFilter.Provider
        value={{ filters: initial, setFilters: setInitial }}
      >
        <PropertiesSort />
        <PropertiesMain
          properties={properties}
          loading={getPropertiesLoading}
          getPropertiesData={getPropertiesData}
          likePropertyHandler={likePropertyHandler}
          total={total}
        />
      </PropertiesFilter.Provider>
    </section>
  );
}
