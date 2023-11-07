import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function EditPostPage() {
  // const posts = useLoaderData();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  // const handleSubmit = async (values) => {
  //   const res = await axios.post(`${DOMAIN}/api/posts`, values);
  //   if (res?.data.success) {
  //     navigate("/posts");
  //   }
  // };

  return (
    <p>Edit page in progress...</p>
    // <Box maw={300} mx="auto">
    //   <form onSubmit={form.onSubmit(handleSubmit)}>
    //     <TextInput
    //       label="Title"
    //       placeholder="Enter a Title"
    //       {...form.getInputProps("title")}
    //     />

    //     <TextInput
    //       label="Category"
    //       placeholder="Enter a Category"
    //       {...form.getInputProps("category")}
    //     />
    //     <TextInput
    //       label="Image"
    //       placeholder="Enter an Image"
    //       {...form.getInputProps("image")}
    //     />

    //     <TextInput
    //       label="Content"
    //       placeholder="Enter some content"
    //       {...form.getInputProps("content")}
    //     />

    //     <Group position="right" mt="md">
    //       <Button type="submit">Submit</Button>
    //     </Group>
    //   </form>
    // </Box>
  );
}

// export const editPostDetailsLoader = async ({ params }) => {
//   // do something with this
//   const res = await axios.get(`${DOMAIN}/api/posts/${params.id}/edit`);
//   return res.data;
// };

export default EditPostPage;
