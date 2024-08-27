import { LoaderFunctionArgs, json } from "react-router-dom";
import supabase from "@/config/supabaseClient";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
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
    projects_to_tags (
      tags (
        id,
        name
      )
    )
  `
    )
    .eq("slug", id!)
    .single();
  if (error) {
    throw json({ message: "Could not find selected project" }, { status: 500 });
  }
  if (data) {
    const { data: imageData } = supabase.storage
      .from("images")
      .getPublicUrl(data.image_name!);
    const project = {
      ...data,
      image_url: imageData.publicUrl,
      tags: data.projects_to_tags?.map((tag) => tag.tags?.name),
    };
    return project;
  }
}
