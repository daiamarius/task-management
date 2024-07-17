import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { LuPlus } from 'react-icons/lu'
import { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { UserSelect } from '@/components/shared/UserSelect.tsx'
import { z } from 'zod'
import { useAddTaskMutation } from '@/api/hooks/task/mutation/useAddTaskMutation.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const AddTaskAction = () => {
    const [open, setOpen] = useState(false)

    const FormSchema = z.object({
        title: z.string().min(1, { message: 'Please complete the title.' }),
        description: z
            .string()
            .min(1, { message: 'Please complete the description.' }),
        asignee: z.string().optional(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { mutate } = useAddTaskMutation({
        onSuccess: () => {
            setOpen(false)
            form.reset()
            form.setValue('asignee', '')
            form.setValue('title', '')
            form.setValue('description', '')
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={'flex gap-2'}>
                    <LuPlus />
                    Add task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add task</DialogTitle>
                    <DialogDescription>Add new task here.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Task title..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="This is how the feature is going to be implemented ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="asignee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Asignee</FormLabel>
                                    <UserSelect
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'outline'}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add task</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
