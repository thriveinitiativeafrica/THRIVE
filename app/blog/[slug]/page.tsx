import { redirect } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleBlogRedirectPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  redirect(`/stories/${slug}`);
}
