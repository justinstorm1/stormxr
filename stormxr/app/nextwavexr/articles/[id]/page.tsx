import { fetchQuery } from "convex/nextjs";
import { api } from '@/convex/_generated/api';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import { ArticleContent } from "../../components/ArticleContent";
import { estimateReadingTime } from "../../components/editor/readingTime";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type PageParams = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { id } = await params;
    const article = await fetchQuery(api.articles.getArticleByIdOrSlug, { idOrSlug: id });
    if (!article) return {};

    const description = article.metaDescription || article.excerpt || undefined;

    return {
        title: article.title,
        description,
        alternates: article.canonicalUrl ? { canonical: article.canonicalUrl } : undefined,
        openGraph: {
            title: article.title,
            description,
            images: article.headerImage ? [{ url: article.headerImage }] : undefined,
            type: "article"
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description,
            images: article.headerImage ? [article.headerImage] : undefined
        }
    };
}

export default async function Page({ params }: PageParams) {
    const { id } = await params;
    const article = await fetchQuery(api.articles.getArticleByIdOrSlug, { idOrSlug: id });

    if (!article) notFound();

    if (article.content) {
        const { minutes } = estimateReadingTime(article.content);

        return (
            <div className="min-h-dvh flex flex-col">
                <Navbar articleLink={undefined} />
                <article className="mx-auto w-full max-w-3xl px-5 py-10">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{article.category}</Badge>
                        {article.featured && <Badge>Featured</Badge>}
                    </div>
                    <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{article.title}</h1>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{article.author}</span>
                        <span aria-hidden>·</span>
                        <span>
                            {new Date(article.date).toLocaleDateString("en-us", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                timeZone: "UTC"
                            })}
                        </span>
                        <span aria-hidden>·</span>
                        <span>{minutes} min read</span>
                    </div>

                    {article.headerImage && (
                        <Image
                            src={article.headerImage}
                            alt={article.title}
                            width={1600}
                            height={900}
                            className="mt-6 w-full rounded-lg object-cover"
                            priority
                        />
                    )}

                    <div className="mt-8">
                        <ArticleContent content={article.content} />
                    </div>

                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                            {article.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </article>
            </div>
        )
    }

    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar articleLink={article.link} />
            <iframe
                src={article.link}
                className='flex-1 flex'
            />
        </div>
    )
}
