import React, { useState, useEffect } from "react";

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);

  function sanitizeTitleForURL(title) {
    // Replace any whitespace with a hyphen
    title = title.replace(/\s+/g, "-");
    // Remove special characters like "&", ":", and any other unwanted characters
    title = title.replace(/[^a-zA-Z0-9-]/g, "");
    // Replace consecutive hyphens with a single hyphen
    title = title.replace(/-+/g, "-");
    // Convert to lowercase
    title = title.toLowerCase();
    return title;
  }

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const h2Elements = doc.querySelectorAll("h2");

    const headingData = Array.from(h2Elements).map((element, index) => {
      const text = element.textContent;
      const id = sanitizeTitleForURL(text); // Convert text to a suitable id format
      return { text, id: `${id}` };
    });
    setHeadings(headingData);
  }, [content]);

  useEffect(() => {
    const clickHandler = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("data-id");
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };

    headings.forEach((heading) => {
      const link = document.querySelector(`a[data-id="${heading.id}"]`);
      if (link) {
        link.addEventListener("click", clickHandler);
      }
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        const link = document.querySelector(`a[data-id="${heading.id}"]`);
        if (link) {
          link.removeEventListener("click", clickHandler);
        }
      });
    };
  }, [headings]);

  return (
    <div className="table-of-contents">
      <h3>Table of Contents</h3>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`} data-id={heading.id}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
