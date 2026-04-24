"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon, Plus, Loader2 } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from "../ui/input-group"
import { addFeedAction, getUserCategoriesAction } from "@/lib/actions/feed-actions"
import { useEffect } from "react"

function AddNewFeedDialog() {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [mode, setMode] = useState<"url" | "xml">("url")
    const [categories, setCategories] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")


    useEffect(() => {
        if (open) {
            getUserCategoriesAction().then(setCategories)
        }
    }, [open])

    async function handleSubmit(formData: FormData) {
        setError(null)
        startTransition(async () => {
            const result = await addFeedAction(formData)
            if (result.error) {
                setError(result.error)
            } else {
                setOpen(false)
                // You might want to show a success message here
            }
        })
    }
    const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline"><Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New RSS Feed</DialogTitle>
                        <DialogDescription>
                            Add a new rss feed to your collection.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="mt-4">
                        <div className="flex gap-2 mb-4">
                            <Button
                                type="button"
                                variant={mode === "url" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setMode("url")}
                            >
                                URL
                            </Button>
                            <Button
                                type="button"
                                variant={mode === "xml" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setMode("xml")}
                            >
                                XML Text
                            </Button>
                        </div>

                        {mode === "url" ? (
                            <Field>
                                <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        id="input-group-url"
                                        name="url"
                                        placeholder="example.com/feed"
                                        required={mode === "url"}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InfoIcon size={16} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                        ) : (
                            <Field>
                                <FieldLabel htmlFor="xml-content">Raw XML Content</FieldLabel>
                                <Textarea
                                    id="xml-content"
                                    name="xmlContent"
                                    placeholder="Paste your RSS/Atom XML here..."
                                    className="min-h-[100px]"
                                    required={mode === "xml"}
                                />
                            </Field>
                        )}

                        <Field>
                            <FieldLabel htmlFor="category">Category</FieldLabel>

                            <Input
                                id="category"
                                name="category"
                                placeholder="Select or enter category"
                                list="categories-list"
                            />

                            <datalist id="categories-list">
                                {categories.map(cat => (
                                    <option key={cat} value={cat} />
                                ))}
                            </datalist>

                        </Field>

                        {error && (
                            <p className="text-sm text-destructive mt-2">{error}</p>
                        )}
                    </FieldGroup>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="animate-spin" /> : "Add Feed"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddNewFeedDialog