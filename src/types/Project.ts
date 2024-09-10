export default interface ProjectType {
  id: number;
  slug: string;
  title: string;
  image_name: string;
  image_alt: string;
  link: string;
  description: string;
  image_url: string;
  is_featured: boolean;
  tags: string[];
}
