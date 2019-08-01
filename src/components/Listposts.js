import React, { Component } from "react";
import Loader from "../spinner.gif";
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
    this.setState({ loading: true }, () => {
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
              loading: true,
              posts: data,
              error: "Not available"
            });
          }
        })
        .catch(err => this.setState({ error: err }));
    });
  }

  nextpage = () => {
    let cpage = this.state.currentPage;
    if (cpage => 1) {
      this.setState({
        currentPage: cpage + 1
      });
    }
  };

  previouspage = () => {
    let cpage = this.state.currentPage;
    if (cpage > 1) {
      this.setState({
        currentPage: cpage - 1
      });
    }
  };

  render() {
    const { loading, posts, error, currentPage, postsPerPage } = this.state;

    const indexofLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexofLastPost - postsPerPage;
    const currentposts = posts.slice(indexOfFirstPost, indexofLastPost);

    const blogposts = currentposts.length
      ? currentposts.map(blogpost => (
          <div key={blogpost.id} className="col-4 mb-3">
            <div className="card" style={{ width: "18.93rem" }}>
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
        ))
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
          {loading && <img className="loader" src={Loader} alt="Loader" />}
          {blogposts}
        </div>
        <div className="row">
          <div className="col-5 offset-5">
            <Pagination
              totalPosts={posts.length}
              postsPerPage={postsPerPage}
              nextpage={this.nextpage}
              previouspage={this.previouspage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Listposts;
