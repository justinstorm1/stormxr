"use client"

import React, { useState, useEffect } from 'react';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Eye, EyeOff, Link2, Lock, Mail, Plus, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthActions } from '@convex-dev/auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DatePicker from '../../components/DatePicker';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleEditor } from '../../components/editor/ArticleEditor';
import { toast } from 'sonner';

export default function Page() {
    const [mode, setMode] = useState<'import' | 'write'>('import');

    return (
        <div className="min-h-dvh flex flex-col p-5">
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'import' | 'write')} className="mx-auto w-full max-w-5xl">
                <TabsList className="mx-auto">
                    <TabsTrigger value="import">Import from UploadVR</TabsTrigger>
                    <TabsTrigger value="write">Write Article</TabsTrigger>
                </TabsList>
                <TabsContent value="import">
                    <ImportLinkForm />
                </TabsContent>
                <TabsContent value="write">
                    <ArticleEditor mode="create" />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ImportLinkForm() {

    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [published, setPublished] = useState(false);
    const [link, setLink] = useState("");
    const [headerImage, setHeaderImage] = useState<string | null>(null);
    const [fetchingImage, setFetchingImage] = useState(false);


    useEffect(() => {
        const isValidUrl = (str: string) => {
            try { new URL(str); return true; } catch { return false; }
        };

        if (!link || !isValidUrl(link)) {
            setHeaderImage(null);
            return;
        }

        const timeout = setTimeout(async () => {
            setFetchingImage(true);
            try {
                const res = await fetch(`../api/og-image?url=${encodeURIComponent(link)}`);
                const data = await res.json();
                setHeaderImage(data.image ?? null); 
                if (data.title) setTitle(data.title);
                if (data.author) setAuthor(data.author);
                if (data.category) setCategory(data.category);
                if (data.date) {
                    const [year, month, day] = data.date.split("-").map(Number);
                    setDate(new Date(year, month - 1, day));
                }
            } catch {
                setHeaderImage(null);
            } finally {
                setFetchingImage(false);
            }
        }, 600);

        return () => clearTimeout(timeout);
    }, [link]);

    const addDisabled = !headerImage || !link || !title || !author || !date || !category;
    const resetDisabled = !headerImage && !link && !title && !author && !category;

    const addArticle = useMutation(api.articles.addArticle);

    const resetAll = () => {
        setHeaderImage("");
        setLink("");
        setTitle("");
        setAuthor("");
        setDate(new Date());
        setCategory("");
    }

    const handleAddArticle = async () => {
        try {
            const articleId = await addArticle({
                headerImage: headerImage as string,
                link,
                title,
                author,
                date: date.getTime(),
                category,
                published
            });
            toast.success("Article added");
            window.location.href = "/nextwavexr/admin/dashboard";
        } catch (error) {
            console.error(error);
            toast.error("Failed to add article");
        }
    }

    return (
        <div className="mx-auto flex max-w-xl flex-col gap-6 pt-6">

                <Button
                    className='ms-auto'
                    size={'lg'}
                    variant={'ghost'}
                    onClick={resetAll}
                    disabled={resetDisabled}
                >
                    <RefreshCw />
                    Reset
                </Button>

                {fetchingImage && (
                    <div className="w-full h-48 rounded-lg bg-muted animate-pulse" />
                )}

                {headerImage && !fetchingImage && (
                    <Image
                        src={headerImage}
                        alt="Article header"
                        className="rounded-lg object-cover"
                        width={1000}
                        height={10000}
                    />
                )}

                    <Field>
                        <FieldLabel htmlFor='link'>Link</FieldLabel>
                        <InputGroup id='link'>
                            <InputGroupInput 
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder='Article link'
                            />
                            <InputGroupButton asChild> 
                                <Link href={link} target='_blank'>
                                    <Link2 />
                                </Link>
                            </InputGroupButton>
                        </InputGroup>
                    </Field>


                    <Field>
                        <FieldLabel htmlFor='title'>Title</FieldLabel>
                        <Textarea 
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Article title'
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor='author'>Author</FieldLabel>
                        <Input 
                            id='author'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder='Article author'
                        />
                    </Field>

                    <DatePicker
                        value={date}
                        onChange={(d) => setDate(d!)}
                    />

                    <Field>
                        <FieldLabel htmlFor='category'>Category</FieldLabel>
                        <Input 
                            id='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Article category'
                        />
                    </Field>

                    <Field orientation={'horizontal'}>
                        <FieldContent>
                            <FieldLabel htmlFor='published'>Published</FieldLabel>
                        </FieldContent>
                        <Switch
                            id='published' 
                            checked={published}
                            onCheckedChange={setPublished}
                        />
                    </Field>

                    <Button disabled={addDisabled} onClick={handleAddArticle}>
                        <Plus />
                        Add
                    </Button>

        </div>
    )
}

export function UnauthenticatedScreen() {

    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const handleSignIn = async () => {
        try {
            await signIn("password", { email, password, flow: "signIn" })
        } catch (error) {
            console.error(error);
            setInvalid(true);
        }
    }

    return (
        <div className='min-h-dvh flex items-center justify-center p-5'>
            <Card className='w-full max-w-[400px]'>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignIn();
                        }}
                    >
                        <FieldGroup>
                            {invalid && (
                                <Field data-invalid>
                                    <FieldLabel>Invalid email or password</FieldLabel>
                                </Field>
                            )}
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon align={'inline-start'}>
                                        <Mail />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id='email'
                                        type='email'
                                        placeholder='email@example.com'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid={invalid}
                                    />
                                </InputGroup>
                            </Field>
                            <Field data-invalid={invalid}>
                                <FieldLabel htmlFor='password'>Password</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon align={'inline-start'}>
                                        <Lock />
                                    </InputGroupAddon>
                                    <InputGroupInput 
                                        id='password'
                                        type={passwordVisible ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        aria-invalid={invalid}
                                    />
                                    <InputGroupAddon align={'inline-end'}>
                                        <InputGroupButton onClick={() => setPasswordVisible((prev) => !prev)}>
                                            {passwordVisible ? <EyeOff /> : <Eye />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                            <Field>
                                <Button type='submit'>Login</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


