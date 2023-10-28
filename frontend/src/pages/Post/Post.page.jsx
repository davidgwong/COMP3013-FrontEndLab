import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "@mantine/core";

export const PostPage = () => {
  const posts = useLoaderData();

  return (
    <Container>
      <Suspense fallback={<Loader m="50%" />}>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "xs", cols: 1 },
            { maxWidth: "sm", cols: 2 },
          ]}
        >
          <Await resolve={posts.res} errorElement={<p>Error...</p>}>
            {(res) =>
              res.data.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))
            }
          </Await>
        </SimpleGrid>
      </Suspense>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = axios.get(`${DOMAIN}/api/posts`);
  return defer({ res });
};
