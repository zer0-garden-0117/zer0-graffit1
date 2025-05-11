'use client';

import { useMantineColorScheme } from "@mantine/core";

import Giscus from "@giscus/react";

export default function GiscusComments() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Giscus
      theme={colorScheme === "dark" ? "dark_dimmed" : "light"}
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` || `owner/repo`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID  || "owner/repo"}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
      mapping={"pathname"}
      loading={"lazy"}
      lang={"ja"}
      reactionsEnabled={'0'}
    />
  );
}
