export default function PostsPage() {
  const posts = []; // Obtener posts desde tu API o base de datos
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
          <a href={`/admin/posts/${post.id}/edit`}>Editar</a>
          <button onClick={() => deletePost(post.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
