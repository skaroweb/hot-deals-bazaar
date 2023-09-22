import BlogSinglePost from "../components/BlogSinglePost";
import LatestBlog from "../components/Sidebar/LatestBlog";
import TopProducts from "../components/Sidebar/TopProducts";
import { useState } from "react";

const BlogSingle = () => {
  const [blogExcept, setBlogExcept] = useState([]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <BlogSinglePost setBlogExcept={setBlogExcept} />
          </div>
          <div className="col-md-3">
            <div className="sticky_sidebar">
              <TopProducts />
              <LatestBlog blogExcept={blogExcept} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogSingle;
