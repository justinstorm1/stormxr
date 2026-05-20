"use client"

import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff, Mail, Lock, UserPlus, Users, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
    const user = useQuery(api.user.getUser);
    const users = useQuery(api.user.getUsers); // you'll need to create this query

    const { signIn, signOut } = useAuthActions();
    const deleteUser = useMutation(api.user.deleteUser); // you'll need to create this mutation

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignUp = async () => {
        setError(null);
        setSuccess(false);
        try {
            await signOut();
            await signIn("password", { email, password, flow: "signUp" });
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setSuccess(true);
        } catch (err: any) {
            setError(err?.message ?? "Something went wrong.");
        }
    }

    const createDisabled = !email || !password || !confirmPassword || password !== confirmPassword;

    return (
        <div className="p-6 max-w-4xl w-full mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Accounts</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage admin accounts for this site.</p>
            </div>

            <Tabs className="mx-auto w-full" defaultValue="accounts">
                <TabsList>
                    <TabsTrigger value="accounts">
                        <Users className="size-4 mr-2" />
                        View Accounts
                    </TabsTrigger>
                    <TabsTrigger value="create">
                        <UserPlus className="size-4 mr-2" />
                        Add Account
                    </TabsTrigger>
                </TabsList>

                {/* ── View Accounts ── */}
                <TabsContent value="accounts" className="mt-4">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>All Accounts</CardTitle>
                            <CardDescription>
                                {users?.length ?? 0} account{users?.length !== 1 ? "s" : ""} registered
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0" >
                            {!users || users.length === 0 ? (
                                <p className="text-muted-foreground text-sm text-center py-10">No accounts found.</p>
                            ) : (
                                <ul className="divide-y">
                                    {users.map((u, i) => (
                                        <li key={u._id} className="flex items-center gap-3 px-6 py-4">
                                            <div className="h-9 w-9 rounded-lg border flex items-center justify-center uppercase text-sm font-medium shrink-0">
                                                {u.email?.slice(0, 2)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{u.email}</p>
                                            </div>
                                            {u._id === user?._id && (
                                                <Badge variant="secondary">You</Badge>
                                            )}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="shrink-0">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        disabled={u._id === user?._id}
                                                        onClick={() => deleteUser({ userId: u._id })}
                                                        className="cursor-pointer"
                                                    >
                                                        <Trash2 />
                                                        Delete Account
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ── Add Account ── */}
                <TabsContent value="create" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an Account</CardTitle>
                            <CardDescription>
                                Enter an email and password to create a new admin account.
                            </CardDescription>
                            {user?.email && (
                                <CardDescription>
                                    Currently logged in as <span className="font-medium text-foreground">{user.email}</span>
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSignUp();
                                }}
                            >
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon align="inline-start">
                                                <Mail />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                id="email"
                                                type="email"
                                                placeholder="email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon align="inline-start">
                                                <Lock />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                id="password"
                                                type={passwordVisible ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupButton onClick={() => setPasswordVisible((p) => !p)}>
                                                    {passwordVisible ? <EyeOff /> : <Eye />}
                                                </InputGroupButton>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon align="inline-start">
                                                <Lock />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                id="confirm-password"
                                                type={passwordVisible ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <InputGroupAddon align="inline-end">
                                                <InputGroupButton onClick={() => setPasswordVisible((p) => !p)}>
                                                    {passwordVisible ? <EyeOff /> : <Eye />}
                                                </InputGroupButton>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Field>

                                    {password && confirmPassword && password !== confirmPassword && (
                                        <p className="text-sm text-destructive">Passwords do not match.</p>
                                    )}
                                    {error && <p className="text-sm text-destructive">{error}</p>}
                                    {success && <p className="text-sm text-green-600">Account created successfully.</p>}

                                    <Field>
                                        <Button type="submit" disabled={createDisabled}>
                                            <UserPlus className="size-4 mr-2" />
                                            Create Account
                                        </Button>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}