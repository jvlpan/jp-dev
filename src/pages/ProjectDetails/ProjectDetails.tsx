import { useEffect, useState, useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { getImageUrl } from "./projectdetails.loader";
import Markdown from "react-markdown";
import ExternalLink from "@/components/ExternalLink";
import Tags from "@/components/Tags";
import ProjectType from "@/types/Project";
import { Slide } from "yet-another-react-lightbox";
import classes from "./ProjectDetails.module.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

let imageUrls: Slide[];

function replaceImageUrls(description: string) {
  return description.replace(
    /!\[(.*?)\]\("?(.*?)"?\)/g,
    (_, alt, fullImgName) => {
      const [slug, image] = fullImgName.split("/");
      const imageUrl = getImageUrl(slug, image);

      if (imageUrl.endsWith("mp4")) {
        imageUrls.push({
          type: "video",
          title: alt,
          sources: [{ src: imageUrl, type: "video/mp4" }],
        });
      } else {
        imageUrls.push({ src: imageUrl, alt: alt, title: alt });
      }
      return `![${alt}](${imageUrl})`;
    }
  );
}

export default function ProjectDetails() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  const [project] = useState<ProjectType>(useLoaderData() as ProjectType);

  const updatedDescription = useMemo(() => {
    imageUrls = [
      { src: project.image_url, alt: project.image_alt, title: project.title },
    ];
    return replaceImageUrls(project.detailed_description);
  }, [
    project.detailed_description,
    project.image_url,
    project.image_alt,
    project.title,
  ]);

  let content;
  if (updatedDescription) {
    content = (
      <Markdown
        components={{
          img({ alt, src }) {
            if (src && src.endsWith(".mp4")) {
              return (
                <div className={classes["video-container"]}>
                  <span id="videoDesc" className="sr-only">
                    {alt}
                  </span>
                  <video
                    controls
                    muted
                    loop
                    aria-describedby="videoDesc"
                    preload="metadata"
                    poster={src}
                    style={{ padding: "0.5rem" }}
                    className={classes.video}
                  >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            }
            if (src) {
              return <img src={src} alt={alt} />;
            }
            return null;
          },
          em(props) {
            const { ...rest } = props;
            return <i style={{ color: "#accd67" }} {...rest} />;
          },
        }}
      >
        {updatedDescription}
      </Markdown>
    );
  } else {
    content = (
      <p className={classes.description}>
        Details for this project are still being written! Please check back
        later for more information.
      </p>
    );
  }

  let linkContent;

  if (project.category === "portfolio") {
    linkContent = (
      <div className={classes["visit-link"]}>You are here &#x2728;</div>
    );
  } else if (project.link) {
    const linkText =
      project.category === "website" ? "Visit the project" : "Learn more";
    linkContent = (
      <ExternalLink link={project.link} className={classes["visit-link"]}>
        {linkText}
      </ExternalLink>
    );
  } else {
    linkContent = (
      <motion.div className={classes["visit-link"]}>
        No link available
      </motion.div>
    );
  }

  const [open, setOpen] = useState(false);

  return (
    project && (
      <article className={classes.project}>
        <p className={classes.header}>Project Details</p>
        <h1 className={classes["project-title"]}>{project.title}</h1>
        <section className={classes.introduction}>
          <button
            className={classes["image-wrapper"]}
            type="button"
            onClick={() => setOpen(true)}
          >
            <img
              className={classes["project-image"]}
              alt={project.image_alt}
              src={project.image_url}
            />
          </button>
          <Lightbox
            plugins={[Video, Captions]}
            open={open}
            close={() => setOpen(false)}
            slides={imageUrls}
            className={classes.lightbox}
          />
          <div className={classes.description}>
            <h2>Summary</h2>
            <p>{project.description}</p>
          </div>
          <div className={classes.skills}>
            <h3 className={classes["call-to-filter"]}>
              See my other projects with these skills:
            </h3>
            <Tags tags={project.tags} shouldNavigate />
          </div>
          {linkContent}
        </section>
        <section className={classes.markdown}>
          <h2>More About This Project</h2>
          {content}
        </section>
        <Link to="/" className={classes["link-to-home"]}>
          Return to Home
        </Link>
      </article>
    )
  );
}
