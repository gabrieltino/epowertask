import React, { Component } from "react";
import Loader from "../loader.gif";
import Pagination from "./Pagination";

class Listposts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      error: null,
      currentPage: 1,
      postsPerPage: 6
    };
  }
  componentDidMount() {
    fetch("https://epower.ng/wp-json/wp/v2/posts")
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          this.setState({
            loading: false,
            posts: data
          });
        } else {
          this.setState({
            loading: false,
            posts: data,
            error: "Not available"
          });
        }
      })
      .catch(err => this.setState({ error: err }));
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    })
  }

  paginate = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const { loading, posts, error, currentPage, postsPerPage } = this.state;

    const indexofLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexofLastPost - postsPerPage;
    const currentsposts = posts.slice(indexOfFirstPost, indexofLastPost);

    const blogposts = currentsposts.length ? (currentsposts.map(blogpost => (
          <div key={blogpost.id} className="col-4 mb-3">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={blogpost.featured_image_thumbnail}
                className="card-img-top"
                alt="featured_image"
              />
              <div className="card-body">
                <p className="card-text">
                  <a href={`/${blogpost.slug}`}>{blogpost.title.rendered}</a>
                </p>
                <p>{blogpost.excerpt.rendered}</p>
              </div>
            </div>
          </div>
        )))
      : "";
    return (
      <div className="container">
        <div className="row">
          {error && (
            <div
              className="alert alert-danger"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}
          {/* {loading && <img className="loader" src={Loader} alt="Loader" />} */}
          {blogposts}
        </div>
        <div className="row">
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            paginate={this.paginate}
          />
        </div>
      </div>
    );
  }
}
export default Listposts;
