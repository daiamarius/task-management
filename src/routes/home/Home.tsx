import {TaskBarChart} from "@/routes/home/components/TaskBarChart.tsx";
import {UserPieChart} from "@/routes/home/components/UserPieChart.tsx";
import {Statuses} from "@/api/fakeTasksApi.ts";
import {TaskSummaryCard} from "@/routes/home/components/TaskSummaryCard.tsx";

export const Home = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <h1 className={'text-2xl font-semibold leading-none tracking-tight'}>Current tasks summary</h1>
      <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'}>
        {Statuses.map(x => <TaskSummaryCard key={x} status={x}/>)}
      </div>

    <div className={'grid grid-cols-1 xl:grid-cols-3 gap-4 items-stretch'}>
      <TaskBarChart/>
      <UserPieChart/>
    </div>

    </div>

  );
};
