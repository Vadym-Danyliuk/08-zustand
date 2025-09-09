import { fetchNoteById } from '@/lib/api';
import css from './EditNote.module.css';
import EditNoteClient from './EditNoteClient';

interface EditNoteProps {
  params: { id: string };
}

export default async function EditNote({ params }: EditNoteProps) {
  const note = await fetchNoteById(params.id);

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Edit note</h1>
        <EditNoteClient note={note} />
      </div>
    </main>
  );
}