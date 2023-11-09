import { NavLink } from "react-router-dom";
import { Grid, Image } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useLocalStorage, useDisclosure } from "@mantine/hooks";
import classes from "./PostDetails.page.module.css";

function PostDetailsPage() {
  const postDetail = useLoaderData();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const editPostLink = "/posts/" + postDetail.id + "/edit";
  return (
    <Grid justify="center">
      <Grid.Col span="content">
        <Image
          height={504}
          radius="md"
          src={postDetail.image}
          withPlaceholder
        />
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
        {postDetail.canEdit ? (
          <NavLink to={editPostLink} className={classes.active}>
            Edit
          </NavLink>
        ) : (
          <></>
        )}
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
