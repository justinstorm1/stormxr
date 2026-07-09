"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function DeleteArticleDialog({
    title,
    onConfirm,
    trigger
}: {
    title: string
    onConfirm: () => void
    trigger?: React.ReactNode
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger ?? (
                    <Button variant="destructive">
                        <Trash2 />
                        Delete
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2 />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Article?</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete the &quot;{title}&quot; article? This cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onConfirm}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
