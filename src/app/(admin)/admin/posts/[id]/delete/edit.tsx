export default function DeletePostPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>¿Estás seguro de que deseas eliminar este post?</p>
      <form method="POST" action={`/api/posts/${params.id}/delete`}>
        <button type="submit">Eliminar</button>
        <a href="/admin/posts">Cancelar</a>
      </form>
    </div>
  );
}
