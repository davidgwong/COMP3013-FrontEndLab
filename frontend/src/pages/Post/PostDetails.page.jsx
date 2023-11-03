import { Button, Grid } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

function PostDetailsPage() {
  const postDetail = useLoaderData();
  return (
    <Grid justify="center">
      <Grid.Col span="content">
        <img src={postDetail.image} />
      </Grid.Col>
      <Grid.Col span={2}>
        <p>
          <b>Author: </b>
          {postDetail.author}
        </p>
        <p>
          <b>Title: </b>
          {postDetail.title}
        </p>
        <p>
          <b>Category: </b>
          {postDetail.category}
        </p>
        <p>
          <b>Content: </b>
          {postDetail.content}
        </p>
        {postDetail.canEdit ? <Button>Edit</Button> : <></>}
      </Grid.Col>
    </Grid>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
