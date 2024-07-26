import { Statuses } from '@/api/fakeTasksApi.ts'
import { StatusTrack } from '@/routes/board/track/StatusTrack.tsx'
import { AddTaskModal } from '@/routes/board/components/AddTaskAction.tsx'
import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'

export const Board = () => {
    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'flex flex-row gap-2 justify-between items-center'}>
                <h1 className={'text-4xl font-bold'}>The board</h1>
                <Button
                    className={'flex gap-2'}
                    onClick={() => AddTaskModal.create({ props: {} })}
                >
                    <LuPlus />
                    Add task
                </Button>
                <AddTaskModal.Container />
            </div>

            <div
                className={
                    'grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'
                }
            >
                {Statuses.map((x) => (
                    <StatusTrack key={x} status={x} />
                ))}
            </div>
        </div>
    )
}
