"use client"

import Navbar from '../components/Navbar';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardFooter } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Newspaper } from 'lucide-react';

export default function Page() {

    const articles = useQuery(api.articles.getArticles);

    const publishedArticles = articles?.filter(a => a.published);

    const sortedArticles = publishedArticles ? [...publishedArticles].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ) : []
    
    return (
        <div className="min-h-dvh w-full flex flex-col">
            <Navbar articleLink={undefined} />
            {publishedArticles && publishedArticles.length > 0 ? (
                <div className="p-5 gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {sortedArticles?.map(article => (
                        <Article 
                            key={article._id} 
                            id={article._id} 
                        />
                    ))}
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

function Article({ id }: { id: Id<"articles">} ) {
    
    const article = useQuery(api.articles.getArticle, { articleId: id});

    if (!article) {
        return (
            <p>Loadimg...</p>
        )
    }
    
    return (
        <Link href={`/nextwavexr/articles/${article._id}`}>
            <Card className="gap-0 relative">
                <img 
                    src={article.headerImage}
                    alt='...'
                    className="p-0 m-0"
                />
                <CardFooter className='flex flex-col items-start'>
                    <p>{article.category}</p>
                    <p className="font-bold text-xl mb-2">{article.title}</p>
                    <p>
                        {String(
                            new Date(article.date).toLocaleDateString("en-us", { 
                                month: "long", 
                                day: "numeric",
                                year: "numeric",
                                timeZone: "UTC"
                            })
                        )}
                    </p>
                    <p>{article.author}</p>
                </CardFooter>
            </Card>
        </Link>
    )
}