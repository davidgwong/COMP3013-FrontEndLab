import { Container } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import { Await, defer, useLoaderData } from "react-router-dom";
import axios from "axios";
import { Suspense } from "react";
import { Loader } from "@mantine/core";

function PostDetailsPage() {
  const postDetail = useLoaderData();
  return (
    <Container>
      <p>{postDetail.title}</p>
      <p>{postDetail.category}</p>
      <p>{postDetail.content}</p>
      <img src={postDetail.image}></img>
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
