import React from 'react';
import {Status} from "@/api/fakeTasksApi.ts";
import {RiProgress1Line, RiProgress3Line, RiProgress6Line, RiProgress8Line} from "react-icons/ri";

type Props = {
  className?: string;
  status: Status;
}
export const StatusIcon: React.FC<Props> = ({status, className}) => {
  switch (status) {
    case "TESTING":
      return <RiProgress6Line className={className}/>
    case "DONE":
      return <RiProgress8Line className={className}/>
    case "IN PROGRESS":
      return <RiProgress3Line className={className}/>
    case "TODO":
    default:
      return <RiProgress1Line className={className}/>
  }
};
