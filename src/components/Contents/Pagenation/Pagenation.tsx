'use client';

import { Pagination as MantinePagination } from '@mantine/core';
import Link from 'next/link';

interface PageProps {
  type: string;
  pages?: number[]; // optionalに変更
  currentPage?: number;
}

const Pagination = ({ type, pages = [], currentPage = 1 }: PageProps) => {
  const totalPages = pages.length;

  if (totalPages <= 1) return null; // 1ページ以下の場合は表示しない

  return (
    <MantinePagination
      total={totalPages}
      value={currentPage}
      getItemProps={(page) => ({
        component: Link,
        href: `/${type}/${page}`,
      })}
      siblings={1}
      boundaries={1}
    />
  );
};

export default Pagination;