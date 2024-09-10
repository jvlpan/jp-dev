import { json } from "react-router-dom";
import supabase from "@/config/supabaseClient";

export async function loader() {
  const [projectsResponse, tagsResponse] = await Promise.all([
    supabase
      .from("projects")
      .select(
        `
      id,
      slug,
      title,
      image_name,
      image_alt,
      link,
      description,
      is_featured,
      projects_to_tags (
        tags (
          id,
          name
        )
      )
    `
      )
      .order("is_featured", { ascending: true })
      .order("order", { ascending: true }),

    supabase.from("tags").select("id, name, category"),
  ]);

  const { data: projects, error: projectsError } = projectsResponse;
  const { data: tags, error: tagsError } = tagsResponse;

  if (projectsError || tagsError) {
    return json(
      { projects: null, error: "Could not fetch data" },
      { status: 500 }
    );
  }

  if (projects && tags) {
    const projectsWithImages = projects.map((project) => {
      const { data: imageData } = supabase.storage
        .from("images")
        .getPublicUrl(project.image_name!);

      return {
        ...project,
        image_url: imageData.publicUrl,
        tags: project.projects_to_tags?.map((tag) => tag.tags?.name) || [],
      };
    });

    return json({ projects: projectsWithImages, tags, error: null });
  }

  return json({ projects: null, tags: null, error: "No projects found" });
}
