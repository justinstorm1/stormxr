"use client"

import Navbar from '../components/Navbar';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { Card, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Newspaper } from 'lucide-react';
import Image from 'next/image';
import type { Doc } from '@/convex/_generated/dataModel';

export default function Page() {

    const articles = useQuery(api.articles.getArticles);

    const publishedArticles = articles?.filter(
        (a) => (a.status ? a.status === "published" : a.published)
    );

    const sortedArticles = publishedArticles ? [...publishedArticles].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ) : []

    const featuredArticle = sortedArticles.find((a) => a.featured);
    const restArticles = sortedArticles.filter((a) => a._id !== featuredArticle?._id);

    return (
        <div className="min-h-dvh w-full flex flex-col">
            <Navbar articleLink={undefined} />
            {sortedArticles.length > 0 ? (
                <div className="flex flex-col gap-4 p-5">
                    {featuredArticle && <FeaturedArticle article={featuredArticle} />}
                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {restArticles.map(article => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='flex-1 flex items-center justify-center'>
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia>
                                <Newspaper />
                            </EmptyMedia>
                            <EmptyTitle>No articles</EmptyTitle>
                            <EmptyDescription>We can&apos;t retrieve any articles here.</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </div>
            )}
        </div>
    )
}

function articleHref(article: Doc<"articles">) {
    return `/nextwavexr/articles/${article.slug ?? article._id}`;
}

function formatArticleDate(date: number) {
    return new Date(date).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    });
}

function FeaturedArticle({ article }: { article: Doc<"articles"> }) {
    return (
        <Link href={articleHref(article)} className="max-w-md mx-auto">
            <Card className="gap-0 relative overflow-hidden">
                {article.headerImage && (
                    <Image
                        src={article.headerImage}
                        alt={`Header image for article ${article.title}`}
                        width={1600}
                        height={900}
                        className="w-full object-cover md:max-h-[420px]"
                    />
                )}
                <CardFooter className='flex flex-col items-start gap-2'>
                    <div className="flex items-center gap-2">
                        <Badge>Featured</Badge>
                        <span className="text-sm text-muted-foreground">{article.category}</span>
                    </div>
                    <p className="font-bold text-2xl">{article.title}</p>
                    {article.excerpt && <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>}
                    <p className="text-sm text-muted-foreground">{formatArticleDate(article.date)} · {article.author}</p>
                </CardFooter>
            </Card>
        </Link>
    )
}

function ArticleCard({ article }: { article: Doc<"articles"> }) {
    return (
        <Link href={articleHref(article)}>
            <Card className="gap-0 relative h-full">
                {article.headerImage ? (
                    <Image
                        src={article.headerImage}
                        alt={`Header image for article ${article.title}`}
                        width={1000}
                        height={1000}
                        className="p-0 m-0 object-cover"
                    />
                ) : (
                    <div className="flex aspect-video items-center justify-center bg-muted text-sm text-muted-foreground">
                        No image
                    </div>
                )}
                <CardFooter className='flex flex-col items-start'>
                    <p>{article.category}</p>
                    <p className="font-bold text-xl mb-2">{article.title}</p>
                    <p>{formatArticleDate(article.date)}</p>
                    <p>{article.author}</p>
                </CardFooter>
            </Card>
        </Link>
    )
}
