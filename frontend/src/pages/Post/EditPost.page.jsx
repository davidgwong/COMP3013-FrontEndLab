import { TextInput, Button, Group, Box, Textarea } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function EditPostPage() {
  const postDetails = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts/:id`, values);
    if (res?.data.success) {
      navigate("/posts/" + values.id);
    }
  };

  const form = useForm({
    initialValues: {
      title: postDetails.title,
      category: postDetails.category,
      image: postDetails.image,
      content: postDetails.content,
      id: postDetails.id,
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Title" {...form.getInputProps("title")} />

        <TextInput label="Category" {...form.getInputProps("category")} />
        <TextInput label="Image" {...form.getInputProps("image")} />

        <Textarea label="Content" {...form.getInputProps("content")} />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export const editPostDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default EditPostPage;
