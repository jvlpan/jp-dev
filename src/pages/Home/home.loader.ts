import { json } from "react-router-dom";
import supabase from "@/config/supabaseClient";

export async function loader() {
  const { data, error } = await supabase
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
    .order("order", { ascending: true });

  if (error) {
    return json(
      { projects: null, error: "Could not fetch projects" },
      { status: 500 }
    );
  }

  if (data) {
    const projectsWithImages = data.map((project) => {
      const { data: imageData } = supabase.storage
        .from("images")
        .getPublicUrl(project.image_name!);

      return {
        ...project,
        image_url: imageData.publicUrl,
        tags: project.projects_to_tags?.map((tag) => tag.tags?.name) || [],
      };
    });

    return json({ projects: projectsWithImages, error: null });
  }

  return json({ projects: null, error: "No projects found" });
}
