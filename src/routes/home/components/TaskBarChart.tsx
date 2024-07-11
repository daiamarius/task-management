import React, {useMemo} from 'react';
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useGetTasksQuery} from "@/api/hooks/task/query/useGetTasksQuery.tsx";
import {Task} from "@/api/fakeTasksApi.ts";
import {ChartColors} from "@/routes/home/components/ChartColors.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";


function groupTasksByMonth(tasks: Task[]) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const summaryMap = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;

    if (!acc[monthYear]) {
      acc[monthYear] = {month: monthYear, todo: 0, in_progress: 0, testing: 0, done: 0};
    }

    switch (task.status) {
      case 'TODO':
        acc[monthYear].todo += 1;
        break;
      case 'IN PROGRESS':
        acc[monthYear].in_progress += 1;
        break;
      case 'TESTING':
        acc[monthYear].testing += 1;
        break;
      case 'DONE':
        acc[monthYear].done += 1;
        break;
    }

    return acc;
  }, {} as Record<string, { month: string, todo: number, in_progress: number, testing: number, done: number }>);


  const summaryArray = Object.values(summaryMap);

  summaryArray.sort((a, b) => {
    const [aMonth, aYear] = a.month.split(' ');
    const [bMonth, bYear] = b.month.split(' ');

    const aDate = new Date(`${aMonth} 1, ${aYear}`);
    const bDate = new Date(`${bMonth} 1, ${bYear}`);

    return aDate.getTime() - bDate.getTime();
  });

  return summaryArray;
}


const chartConfig = {
  todo: {
    label: "Todo",
    color: ChartColors.Slate,
  },
  in_progress: {
    label: "In progress",
    color: ChartColors.Cyan,
  },
  testing: {
    label: "Testing",
    color: ChartColors.Indigo,
  },
  done: {
    label: "Done",
    color: ChartColors.Emerald,
  },
} satisfies ChartConfig

export const TaskBarChart: React.FC = () => {

  const {data: tasks, isLoading} = useGetTasksQuery({})

  const chartData = useMemo(() => {
    if (!tasks) {
      return [];
    }
    return groupTasksByMonth(tasks)
  }, [tasks])

  return (
    <Card className={'xl:col-span-2'}>
      <CardHeader>
        <CardTitle>
          Tasks summary
        </CardTitle>
        <CardDescription>
          Task status summary grouped by their creation date.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className={'flex flex-col gap-4'}>
            <div className={'grid grid-cols-12 gap-4 items-end h-full'}>
              <Skeleton className={'h-[500px]'}/>
              <Skeleton className={'h-[200px]'}/>
              <Skeleton className={'h-[400px]'}/>
              <Skeleton className={'h-[300px]'}/>
              <Skeleton className={'h-[500px]'}/>
              <Skeleton className={'h-[200px]'}/>
              <Skeleton className={'h-[400px]'}/>
              <Skeleton className={'h-[500px]'}/>
              <Skeleton className={'h-[300px]'}/>
              <Skeleton className={'h-[200px]'}/>
              <Skeleton className={'h-[300px]'}/>
              <Skeleton className={'h-[400px]'}/>
            </div>
            <div className={'flex flex-row justify-center gap-2'}>
              <Skeleton className={'w-24 h-8'}/>
              <Skeleton className={'w-24 h-8'}/>
              <Skeleton className={'w-24 h-8'}/>
              <Skeleton className={'w-24 h-8'}/>
            </div>
          </div>
        )}
        {!isLoading && (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false}/>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent/>}/>
              <ChartLegend content={<ChartLegendContent/>}/>
              <Bar dataKey="todo" fill="var(--color-todo)" radius={4}/>
              <Bar dataKey="in_progress" fill="var(--color-in_progress)" radius={4}/>
              <Bar dataKey="testing" fill="var(--color-testing)" radius={4}/>
              <Bar dataKey="done" fill="var(--color-done)" radius={4}/>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
