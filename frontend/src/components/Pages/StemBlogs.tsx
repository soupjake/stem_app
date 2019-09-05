import React, { FunctionComponent, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import blogsimage from "../../assets/blogs.jpg";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import ContentDom from "../Layout/ContentDom";
import LinkButton from "../Layout/LinkButton";
import { Blog } from "../../models/blog";
import { GetAllBlogs } from "../../services/blog_service";
import { ConvertDate } from "../../helpers/DateHelper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    paper: {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(4)
    },
    textField: {
      flexBasis: 200,
      marginBottom: theme.spacing(4),
      "& .MuiFilledInput-root": {
        backgroundColor: "white",
        borderRadius: 4
      },
      "& .MuiFilledInput-underline:before": {
        borderBottom: 0
      },
      "& .MuiFilledInput-underline:after": {
        marginRight: 2,
        marginLeft: 2,
        borderRadius: 4
      }
    }
  })
);

const StemBlogs: FunctionComponent = props => {
  const classes = useStyles({});
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchBlogs();
  }, [blogs.length]);

  async function fetchBlogs() {
    setLoading(true);
    const result = await GetAllBlogs();
    if (result) {
      setBlogs(result);
      setFilteredBlogs(result);
    }
    setLoading(false);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
  }

  function handleSubmitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const regex = new RegExp(`^.*${searchTerm}.*$`, "i");
    if (!searchTerm) {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => regex.test(blog.title)));
    }
  }

  const pagination =
    filteredBlogs.length > 0 ? (
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={filteredBlogs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={""}
      />
    ) : (
      <Paper elevation={0} className={classes.paper}>
        <p className="text-center">No blogs found</p>
      </Paper>
    );

  const content = loading ? (
    <Grid container justify="center" className="mt-24 mb-24">
      <CircularProgress color="primary" />
    </Grid>
  ) : (
    <>
      {filteredBlogs
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((blog: Blog) => {
          return (
            <div key={blog.blogId}>
              <Paper elevation={0} className={classes.paper}>
                <h6 className="primary-text text-center">{blog.title}</h6>
                <p>{blog.description}</p>
                <ContentDom className="blog-short-content blog-image" content={blog.content} />
                <p>...</p>
                <p>Published: {ConvertDate(blog.createdAt)}</p>
                <Grid container justify="center">
                  <LinkButton
                    className={classes.button}
                    to={{ pathname: `/blog/${blog.blogId}` }}
                  >
                    View
                  </LinkButton>
                </Grid>
              </Paper>
            </div>
          );
        })}
      {pagination}
    </>
  );

  return (
    <div>
      <Grid container direction="column" justify="center">
        <Grid item xs={12}>
          <img src={blogsimage} className="header-image" alt="" />
          <div className="header-text">Blogs</div>
        </Grid>
        <Grid container justify="center" className="content-container">
          <Grid item md={8} sm={10} xs={12} className="mb-24">
            <h2 className="content-title mb-24">News &amp; Advice Blogs</h2>
            <p>
              Keep up to date with the latest industry news, as well as regular
              activites offering recruitment and careers advice.
            </p>
          </Grid>
          <Grid item md={8} sm={10} xs={12} className="mb-24">
            <form onSubmit={handleSubmitSearch}>
              <TextField
                className={classes.textField}
                variant="filled"
                margin="dense"
                fullWidth
                hiddenLabel
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(event.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  )
                }}
              />
            </form>
            {content}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StemBlogs;