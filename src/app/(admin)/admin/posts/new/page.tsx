export default function NewPostPage() {
  return (
    <form method="POST" action="/api/posts">
      <input type="text" name="title" placeholder="Título" required />
      <textarea name="content" placeholder="Contenido" required></textarea>
      <button type="submit">Crear Post</button>
    </form>
  );
}
