import { Button } from '@/components/ui/button.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx'
import { z } from 'zod'
import { LuArrowRight } from 'react-icons/lu'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx'
import { UserSelect } from '@/components/shared/UserSelect.tsx'
import { useContext } from 'react'
import { AuthenticationContext } from '@/auth/AuthenticationContext.tsx'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const { login } = useContext(AuthenticationContext)

    const navigate = useNavigate()

    const FormSchema = z.object({
        user: z.string({
            required_error: 'Please select an user.',
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        login(data.user)
        setTimeout(() => navigate('/'), 0)
    }

    return (
        <Card className={'max-w-lg w-full mx-auto'}>
            <CardHeader>
                <CardTitle>Who are you?</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="user"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User</FormLabel>
                                    <UserSelect
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className={'w-full'} size={'lg'}>
                            Continue
                            <LuArrowRight />
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
