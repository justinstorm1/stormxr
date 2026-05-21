"use client"

import SlidingNumber from "../../components/SlidingNumber";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Page() {

    const articles = useQuery(api.articles.getArticles);
    const deleteArticle = useMutation(api.articles.deleteArticle);

    const cards = [
        {
            title: articles?.length ?? 0,
            description: "Total Articles"
        },
    ]

    const handleDeleteArticle = async (articleId: Id<"articles">) => {
        try {
            await deleteArticle({ articleId });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col p-5 @container/main gap-10">

           <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">

                {cards.map((card, index) => (
                    <Card key={index} className="@container/card">
                        <CardHeader>
                            <CardDescription>{card.description}</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                <SlidingNumber number={card.title} />
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}

            </div>

            <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">

                {articles?.map((article, index) => (
                    <Card key={index} className="@container/card">
                        <CardContent className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <img 
                                    src={article.headerImage}
                                    className="h-12 rounded-md"
                                    alt={article.title}
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold line-clamp-2">{article.title}</span>
                                </div>
                            </div>
                            <div className="flex flex-col text-sm">
                                <span>{article.category}</span>
                                <span>{article.author}</span>
                                <span>{
                                    new Date(article.date).toLocaleDateString("en-us", {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric",
                                        timeZone: "UTC"
                                    })
                                }</span>
                            </div>
                            {article.published ? (
                                <div className="flex items-center gap-2">
                                    <div className="relative flex items-center justify-center w-3 h-3">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </div>
                                    <span>Published</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="relative flex items-center justify-center w-3 h-3">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-gray-300 opacity-50 animate-pulse"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
                                    </div>
                                    <span>Unpublished</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button asChild className="ms-auto" variant={'outline'}>
                               
                                <Link href={`/nextwavexr/admin/edit/${article._id}`}>
                                    <Pencil />
                                    Edit
                                </Link>
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={'destructive'}>
                                        <Trash2 />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent size="sm">
                                    <AlertDialogHeader>
                                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                                <Trash2 />
                                        </AlertDialogMedia>
                                        <AlertDialogTitle>Delete Article?</AlertDialogTitle>
                                        <AlertDialogDescription>Are you sure you want to delete the "{article.title}" article?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel variant={'outline'}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                            variant={'destructive'}
                                            onClick={() => handleDeleteArticle(article._id)}
                                        >Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}

            </div>

        </div>
    )
}