import { Button } from '@/components/ui/button.tsx'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { LuPencil } from 'react-icons/lu'
import React, { useEffect, useState } from 'react'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task } from '@/api/fakeTasksApi.ts'
import { useEditTaskMutation } from '@/api/hooks/task/mutation/useEditTaskMutation.tsx'

type Props = {
    task: Task
}

export const EditTaskAction: React.FC<Props> = ({ task }) => {
    const [open, setOpen] = useState(false)

    const FormSchema = z.object({
        title: z.string().min(1, { message: 'Please complete the title.' }),
        description: z
            .string()
            .min(1, { message: 'Please complete the description.' }),
        asignee: z.string().optional(),
        status: z.union(
            [
                z.literal('DONE'),
                z.literal('TESTING'),
                z.literal('TODO'),
                z.literal('IN PROGRESS'),
            ],
            {
                required_error: 'Please select a status.',
            }
        ),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        form.setValue('title', task.title)
        form.setValue('description', task.description)
        form.setValue('asignee', task?.asignee)
        form.setValue('status', task.status)
    }, [task, form])

    const { mutate } = useEditTaskMutation(task, {
        onSuccess: () => {
            setOpen(false)
            form.reset()
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size={'sm'}>
                    <LuPencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit task</DialogTitle>
                    <DialogDescription>
                        Change task description here.
                    </DialogDescription>
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
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
