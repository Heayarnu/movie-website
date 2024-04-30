import { SearchProps } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react';

const SearchPage = ({ params: { term } }: SearchProps) => {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  return <div>Welcome to the search page: {termToUse}</div>;
};

export default SearchPage;
