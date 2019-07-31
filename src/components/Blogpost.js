import React, { Component } from "react";
import Loader from "../loader.gif";

class Blogpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      loading: false
    };
  }
  componentDidMount() {
    let slug_url = this.props.match.params.slug;
    // console.log(slug_url)
    this.setState({ loading: true }, () => {
      fetch("https://epower.ng/wp-json/wp/v2/posts/?slug=" + slug_url)
        .then(res => res.json())
        .then(data => {
          if (data.length) {
            this.setState({
              loading: false,
              post: data
            });
          } else {
            this.setState({
              loading: false,
              post: data
            });
          }
        })
        .catch(err => console.log(err));
    });
  }
  render() {
    // console.log(this.state.post);
    const { loading, post } = this.state;
    // const getblogpost = this.state.post
    const getblogpost = post
      ? this.state.post.map(blogpost => {
          return (
            <div key={blogpost.id} className="list-group col-10 offset-1">
              <div className="list-group-item list-group-item-action text-center">
                <h2 className="mb-4 text-danger bg-white p-4">
                  {blogpost.title.rendered}
                </h2>
                <hr />

                <p
                  dangerouslySetInnerHTML={{
                    __html: blogpost.content.rendered
                  }}
                />
              </div>
            </div>
          );
        })
      : "";
    return (
      <div className="container">
        <div className="row">
          {getblogpost}
          {loading && <img className="loader" src={Loader} alt="Loader" />}
        </div>
      </div>
    );
  }
}
export default Blogpost;
