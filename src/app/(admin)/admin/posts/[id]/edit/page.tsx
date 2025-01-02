export default function EditPostPage({ params }: { params: { id: string } }) {
  const post = {}; // Obtener datos del post por ID
  return (
    <form method="POST" action={`/api/posts/${params.id}`}>
      <input type="text" name="title" defaultValue={post.title} required />
      <textarea name="content" defaultValue={post.content} required></textarea>
      <button type="submit">Actualizar</button>
    </form>
  );
}
