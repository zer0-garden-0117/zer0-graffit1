// 記事データ
export type PostItem = {
    slug: string;
    title: string;
    description?: string;
    date: string;
    tags: string[] | null;
    contentHtml: string;
  };
  
  // ページング情報
  export type PageData = {
    currentPage: number;
    totalPages: number;
    start: number;
    end: number;
    pages: number[];
  };