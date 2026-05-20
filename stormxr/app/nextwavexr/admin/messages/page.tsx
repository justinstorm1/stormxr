"use client";

import { useMemo, useState } from "react";

import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
} from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Id } from "@/convex/_generated/dataModel";

type SortOrder = "asc" | "desc";

export default function Page() {
    const messages = useQuery(api.messages.getMessages) || [];

    const toggleCompleteMessage = useMutation(
        api.messages.toggleCompleteMessage
    );

    const deleteMessage = useMutation(
        api.messages.deleteMessage
    );

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] =
        useState<SortOrder>("desc");

    const [selectedRows, setSelectedRows] = useState<string[]>(
        []
    );

    const [selectedMessage, setSelectedMessage] =
        useState<(typeof messages)[number] | null>(null);

    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        email: true,
        phone: true,
        subject: true,
        message: true,
        status: true,
    });

    // ---------------- FILTER + SORT ----------------
    const filteredMessages = useMemo(() => {
        let data = [...messages];

        if (search.trim()) {
            const query = search.toLowerCase();

            data = data.filter((message) =>
                [
                    message.name,
                    message.email,
                    message.phoneNumber,
                    message.subject,
                    message.content,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        value!
                            .toLowerCase()
                            .includes(query)
                    )
            );
        }

        data.sort((a, b) => {
            return sortOrder === "asc"
                ? a._creationTime - b._creationTime
                : b._creationTime - a._creationTime;
        });

        return data;
    }, [messages, search, sortOrder]);

    // ---------------- SELECTION ----------------
    const allSelected =
        filteredMessages.length > 0 &&
        filteredMessages.every((message) =>
            selectedRows.includes(message._id)
        );

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(
                filteredMessages.map((m) => m._id)
            );
        } else {
            setSelectedRows([]);
        }
    };

    const toggleRow = (id: string, checked: boolean) => {
        setSelectedRows((prev) =>
            checked
                ? [...prev, id]
                : prev.filter((item) => item !== id)
        );
    };

    // ---------------- SINGLE ACTION ----------------
    const handleToggleCompleteMessage = async (
        messageId: Id<"messages">
    ) => {
        try {
            await toggleCompleteMessage({ messageId });
        } catch (error) {
            console.error(error);
        }
    };

    // ---------------- BULK ACTIONS ----------------
    const handleBulkComplete = async (completed: boolean) => {
        try {
            await Promise.all(
                selectedRows.map(async (id) => {
                    const msg = messages.find(
                        (m) => m._id === id
                    );

                    if (
                        msg &&
                        msg.completed !== completed
                    ) {
                        await toggleCompleteMessage({
                            messageId: id as Id<"messages">,
                        });
                    }
                })
            );

            setSelectedRows([]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleBulkDelete = async () => {
        try {
            await Promise.all(
                selectedRows.map((id) =>
                    deleteMessage({
                        messageId: id as Id<"messages">,
                    })
                )
            );

            setSelectedRows([]);
        } catch (error) {
            console.error(error);
        }
    };

    // ---------------- UI ----------------
    return (
        <>
            <div className="w-full p-5">
                {/* TOOLBAR */}
                <div className="flex items-center pb-4 gap-2">
                    <Input
                        placeholder="Filter messages..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="max-w-sm"
                    />

                    {selectedRows.length > 0 && (
                        <>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleBulkComplete(true)
                                }
                            >
                                Mark Complete
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleBulkComplete(false)
                                }
                            >
                                Mark Incomplete
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={handleBulkDelete}
                            >
                                Delete Selected
                            </Button>
                        </>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="ml-auto"
                            >
                                Columns
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            {Object.entries(
                                visibleColumns
                            ).map(([key, value]) => (
                                <DropdownMenuCheckboxItem
                                    key={key}
                                    checked={value}
                                    onCheckedChange={(checked) =>
                                        setVisibleColumns(
                                            (prev) => ({
                                                ...prev,
                                                [key]: checked,
                                            })
                                        )
                                    }
                                    className="capitalize"
                                >
                                    {key}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={allSelected}
                                        onCheckedChange={(checked) =>
                                            toggleSelectAll(
                                                checked === true
                                            )
                                        }
                                    />
                                </TableHead>

                                {visibleColumns.name && (
                                    <TableHead>Name</TableHead>
                                )}

                                {visibleColumns.email && (
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="-ml-3"
                                            onClick={() =>
                                                setSortOrder((p) =>
                                                    p === "desc"
                                                        ? "asc"
                                                        : "desc"
                                                )
                                            }
                                        >
                                            Email
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                )}

                                {visibleColumns.phone && (
                                    <TableHead>Phone</TableHead>
                                )}

                                {visibleColumns.subject && (
                                    <TableHead>Subject</TableHead>
                                )}

                                {visibleColumns.message && (
                                    <TableHead>Message</TableHead>
                                )}

                                {visibleColumns.status && (
                                    <TableHead>Status</TableHead>
                                )}

                                <TableHead />
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredMessages.length ? (
                                filteredMessages.map((message) => {
                                    const isSelected =
                                        selectedRows.includes(
                                            message._id
                                        );

                                    return (
                                        <TableRow
                                            key={message._id}
                                            data-state={
                                                isSelected
                                                    ? "selected"
                                                    : undefined
                                            }
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={(checked) =>
                                                        toggleRow(
                                                            message._id,
                                                            checked === true
                                                        )
                                                    }
                                                />
                                            </TableCell>

                                            {visibleColumns.name && (
                                                <TableCell className="font-medium">
                                                    {message.name}
                                                </TableCell>
                                            )}

                                            {visibleColumns.email && (
                                                <TableCell className="lowercase">
                                                    <a
                                                        href={`mailto:${message.email}`}
                                                        className="hover:underline"
                                                    >
                                                        {message.email}
                                                    </a>
                                                </TableCell>
                                            )}

                                            {visibleColumns.phone && (
                                                <TableCell>
                                                    {message.phoneNumber || "-"}
                                                </TableCell>
                                            )}

                                            {visibleColumns.subject && (
                                                <TableCell>
                                                    {message.subject}
                                                </TableCell>
                                            )}

                                            {visibleColumns.message && (
                                                <TableCell className="max-w-[350px] truncate">
                                                    {message.content}
                                                </TableCell>
                                            )}

                                            {visibleColumns.status && (
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            message.completed
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {message.completed
                                                            ? "Completed"
                                                            : "Open"}
                                                    </Badge>
                                                </TableCell>
                                            )}

                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent className="w-fit" align="end">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(
                                                                    message.email
                                                                )
                                                            }
                                                        >
                                                            Copy email
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                setSelectedMessage(
                                                                    message
                                                                )
                                                            }
                                                        >
                                                            View message
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleToggleCompleteMessage(
                                                                    message._id
                                                                )
                                                            }
                                                        >
                                                            Mark{" "}
                                                            {message.completed
                                                                ? "Incomplete"
                                                                : "Complete"}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No messages found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end py-4 text-sm text-muted-foreground">
                    {selectedRows.length} of{" "}
                    {filteredMessages.length} selected
                </div>
            </div>

            {/* VIEW MODAL */}
            <Dialog
                open={!!selectedMessage}
                onOpenChange={(open) => {
                    if (!open) setSelectedMessage(null);
                }}
            >
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedMessage?.subject}
                        </DialogTitle>

                        <DialogDescription>
                            Message from{" "}
                            <span className="font-medium text-foreground">
                                {selectedMessage?.name}
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* CONTACT INFO */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border p-3">
                                <p className="text-xs text-muted-foreground">
                                    Email
                                </p>

                                <a
                                    href={`mailto:${selectedMessage?.email}`}
                                    className="text-sm hover:underline"
                                >
                                    {selectedMessage?.email}
                                </a>
                            </div>

                            <div className="rounded-lg border p-3">
                                <p className="text-xs text-muted-foreground">
                                    Phone
                                </p>

                                <a
                                    href={`tel:${selectedMessage?.phoneNumber}`}
                                    className="text-sm hover:underline"
                                >
                                    {selectedMessage?.phoneNumber || "-"}
                                </a>
                            </div>
                        </div>

                        {/* MESSAGE BODY */}
                        <div className="rounded-lg border p-4">
                            <p className="mb-2 text-xs text-muted-foreground">
                                Message
                            </p>

                            <p className="whitespace-pre-wrap text-sm leading-6">
                                {selectedMessage?.content}
                            </p>
                        </div>

                        {/* FOOTER ACTIONS */}
                        <div className="flex items-center justify-between">
                            <Badge
                                variant={
                                    selectedMessage?.completed
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {selectedMessage?.completed
                                    ? "Completed"
                                    : "Open"}
                            </Badge>

                            <div className="flex gap-2">
                                <Button asChild variant="outline">
                                    <a
                                        href={`mailto:${selectedMessage?.email}`}
                                    >
                                        Reply
                                    </a>
                                </Button>

                                {selectedMessage?.phoneNumber && (
                                    <Button asChild>
                                        <a
                                            href={`tel:${selectedMessage?.phoneNumber}`}
                                        >
                                            Call
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}