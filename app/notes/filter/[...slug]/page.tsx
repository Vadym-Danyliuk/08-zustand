import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

interface NotesProps {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: NotesProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.slug?.[0] || 'all');
  const title = `Нотатки: ${tag}`;
  const description = `Перегляд нотаток з категорії "${tag}"`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.vercel.app/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const tag = decodeURIComponent(params.slug?.[0] || 'all');
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}