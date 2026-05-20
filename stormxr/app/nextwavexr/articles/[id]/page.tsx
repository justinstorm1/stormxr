"use client"

import Navbar from "../../components/Navbar";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const articleId = params.id as Id<"articles">;

    const article = useQuery(api.articles.getArticle, { articleId });

    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar articleLink={article?.link} />
            {/* <p>{id}</p>
            <p>{article?.title}</p> */}
            <iframe 
                src={article?.link}
                className='flex-1 flex'
            />
        </div>
    )
}