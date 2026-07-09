"use client"

import SlidingNumber from "../../components/SlidingNumber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteArticleDialog } from "../../components/DeleteArticleDialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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
            toast.success("Article deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete article");
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

                {articles?.map((article, index) => {
                    const status = article.status ?? (article.published ? "published" : "draft");
                    const source = article.source ?? "link";

                    return (
                    <Card key={index} className="@container/card">
                        <CardContent className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                {article.headerImage ? (
                                    <Image
                                        src={article.headerImage}
                                        width={100}
                                        height={100}
                                        className="rounded-md object-cover"
                                        alt={article.title}
                                    />
                                ) : (
                                    <div className="flex size-[100px] shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                                        No image
                                    </div>
                                )}
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
                            <div className="flex flex-wrap items-center gap-1.5">
                                <Badge variant={status === "published" ? "default" : status === "scheduled" ? "outline" : "secondary"} className="capitalize">
                                    {status}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                    {source === "native" ? "Written" : "UploadVR"}
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button asChild className="ms-auto" variant={'outline'}>

                                <Link href={`/nextwavexr/admin/edit/${article._id}`}>
                                    <Pencil />
                                    Edit
                                </Link>
                            </Button>
                            <DeleteArticleDialog
                                title={article.title}
                                onConfirm={() => handleDeleteArticle(article._id)}
                            />
                        </CardFooter>
                    </Card>
                    );
                })}

            </div>

        </div>
    )
}