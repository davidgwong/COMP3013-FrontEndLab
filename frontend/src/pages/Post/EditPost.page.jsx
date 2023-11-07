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
  const form = useForm();

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts`, values);
    if (res?.data.success) {
      navigate("/posts");
    }
  };
  console.log(postDetails);
  const [title, setTitle] = useState(postDetails.title);

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          {...form.getInputProps("title")}
          value={postDetails.title}
        />

        <TextInput
          label="Category"
          {...form.getInputProps("category")}
          value={postDetails.category}
        />
        <TextInput
          label="Image"
          {...form.getInputProps("image")}
          value={postDetails.image}
        />

        <Textarea
          label="Content"
          {...form.getInputProps("content")}
          value={postDetails.content}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export const editPostDetailsLoader = async ({ params }) => {
  // do something with this
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default EditPostPage;
