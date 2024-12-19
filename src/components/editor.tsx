// components/Editor.tsx
"use client"; // Necesario porque React Quill no es compatible con Server Components

import { Button, Input, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Field } from "./ui/field";
import { toaster } from "./ui/toaster";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Editor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const postData = { title, content };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toaster.create({
          title: "Contenido guardado.",
          description: "Tu publicación se ha guardado exitosamente.",
          duration: 5000,
        });
        setTitle("");
        setContent("");
      } else {
        throw new Error("Error al guardar");
      }
    } catch {
      toaster.create({
        title: "Error.",
        description: "No se pudo guardar el contenido.",
        duration: 5000,
      });
    }
  };

  return (
    <VStack gap={4} align="stretch">
      <Field label="Título">
        <Input
          placeholder="Ingresa el título del contenido"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Field>
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ width: "100%" }}
        />
      </Field>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Publicar
      </Button>
    </VStack>
  );
};

export default Editor;
