import {useMemo, useState} from "react"
import {Label, Pie, PieChart, Sector} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {ChartColors} from "@/routes/home/components/ChartColors.tsx";
import {useGetUsersQuery} from "@/api/hooks/user/query/useGetUsersQuery.tsx";
import {UserLabel} from "@/components/shared/UserLabel.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {PieSectorDataItem} from "recharts/types/polar/Pie";
import {Position, Positions, User} from "@/api/fakeTasksApi.ts";


const chartConfig = {
  'PRODUCT OWNER': {
    label: "Product owner",
    color: ChartColors.Emerald,
  },
  'DEVELOPER': {
    label: "Developer",
    color: ChartColors.Cyan,
  },
  'TESTER': {
    label: "Tester",
    color: ChartColors.Indigo,
  },
  'CLIENT': {
    label: "Client",
    color: ChartColors.Slate,
  },
} satisfies ChartConfig

type GroupedUser = {
  position: Position;
  count: number;
  fill: string;
}


function groupUsersByPosition(users: User[]): GroupedUser[] {
  const positionMap: { [key: string]: number } = {};

  users.forEach(user => {
    if (positionMap[user.position]) {
      positionMap[user.position]++;
    } else {
      positionMap[user.position] = 1;
    }
  });

  const result = Object.keys(positionMap).map(position => ({
    position: position,
    count: positionMap[position],
    fill: chartConfig[position as keyof typeof chartConfig].color
  }));

  return result as GroupedUser[];
}


export const UserPieChart = () => {
  const {data: users} = useGetUsersQuery({});


  const chartData = useMemo(() => {
    if (!users) {
      return undefined;
    }
    return groupUsersByPosition(users);
  }, [users])

  const [activePosition, setActivePosition] = useState('DEVELOPER')

  const activeIndex = useMemo(
    () => chartData?.findIndex((item) => item.position === activePosition),
    [activePosition, chartData]
  )


  return (
    <Card className="flex flex-col relative">
      <CardHeader>
        <CardTitle>Team summary</CardTitle>
        <CardDescription>Team summary grouped by their position.</CardDescription>
        <Select value={activePosition} onValueChange={setActivePosition}>
          <SelectTrigger
            className="ml-auto h-7 w-[160px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select a position"/>
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {Positions.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] mb-4"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent/>}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="position"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                              outerRadius = 0,
                              ...props
                            }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius}/>
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 20}
                    innerRadius={outerRadius + 10}
                  />
                </g>
              )}
            >
              <Label
                content={({viewBox}) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {users?.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Members
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className={'flex flex-col divide-y w-full'}>
          {users?.map(x => <div key={x.id} className={'p-1.5'}>
            <UserLabel user={x} showPosition={true}/>
          </div>)}
        </div>
      </CardContent>
    </Card>
  )
}
