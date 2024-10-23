import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full  bg-[var(--color-bg-secondary)]  text-[var(--color-text-primary)] py-2">
      <div className="container w-full mx-auto">
        {/* footer section links */}
        <div className="">
          <h4 className="font-semibold mb-3.5">Quick Links</h4>
          <ul className="[&>li]:mb-2.5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        {/* footer social Links */}
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h4 className="font-semibold">Follow Me</h4>
          <ul className="flex justify-center items-center gap-x-2 text-2xl text-black">
            <li>
              <a
                href="https://linkedin.com/in/bhaskar-sharma-105a55238"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://github.com/probhask" target="_blank">
                <FaGithubSquare />
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center mt-2">
          <p>&copy; 2024 NamasteReads</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
