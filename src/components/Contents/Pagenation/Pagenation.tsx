'use client';

import { Pagination as MantinePagination } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface PageProps {
  type: string;
  pages?: number[];
}

const Pagination = ({ type, pages = [] }: PageProps) => {
  const totalPages = pages.length;
  const router = useRouter()
  const params = useParams();
  const pageFromUrl = params.page ? Number(params.page) : 1;
  console.log(pageFromUrl)
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const onPageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`/${type}/${page}`)
  };


  if (totalPages <= 1) return null;

  return (
    <MantinePagination
      onChange={onPageChange}
      total={totalPages}
      value={currentPage}
      siblings={1}
      boundaries={1}
    />
  );
};

export default Pagination;