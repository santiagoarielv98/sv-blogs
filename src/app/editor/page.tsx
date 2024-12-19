import Editor from "@/components/editor";
import { Container, Heading } from "@chakra-ui/react";

export default function EditorPage() {
  return (
    <Container maxW="3xl" paddingBlock={24}>
      <Heading textAlign="center" mb={6}>
        Editor de Contenido
      </Heading>
      <Editor />
    </Container>
  );
}
