"use client"

import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const sendMessage = useMutation(api.messages.sendMessage);

    const [messageSent, setMessageSent] = useState(false);

    const handleSendMessage = async () => {
        try {
            const result = await sendMessage({
                name,
                email, 
                phoneNumber,
                subject,
                content
            });
            if (result.success) {
                setMessageSent(true);
                setName("");
                setEmail("");
                setPhoneNumber("");
                setSubject("");
                setContent("");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-dvh w-full flex flex-col">
            <Navbar articleLink={undefined} />
            <div className="p-5 flex flex-1 items-center justify-center">
                {!messageSent ? (
                    <div className="max-w-md w-full">
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                        >
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Your Information</FieldLegend>
                                    <FieldDescription>All information is encrypted. Only we can see it.</FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="name">Name*</FieldLabel>
                                            <Input 
                                                id="name"
                                                placeholder="Name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="email">Email*</FieldLabel>
                                            <Input 
                                                id="email"
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
                                            <Input 
                                                id="phone-number"
                                                placeholder="Phone Number"
                                                type="text"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </Field>
                                    </FieldGroup>
                                    <FieldSeparator />
                                </FieldSet>
                                <FieldSet>
                                    <FieldLegend>Message</FieldLegend>
                                    <FieldDescription>What are we discussing today?</FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="subject">Subject*</FieldLabel>
                                            <Input 
                                                id="subject"
                                                placeholder="Subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="content">Content*</FieldLabel>
                                            <Textarea 
                                                id="content"
                                                placeholder="Content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                required
                                            />
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <Field>
                                    <Button type="submit">
                                        <Send />
                                        Send
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </div>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant={'icon'}>
                                <Send />
                            </EmptyMedia>
                            <EmptyTitle>your message was sent</EmptyTitle>
                            <EmptyDescription>Thanks for reaching out. We’ll get back to you soon.</EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button onClick={() => setMessageSent(false)}>Send Another Message</Button>
                        </EmptyContent>
                    </Empty>
                )}
            </div>
        </div>
    )
}
