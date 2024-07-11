import React from 'react';
import {Outlet} from "react-router-dom";
import {Toolbar} from "@/layout/components/Toolbar.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

export const AppLayout: React.FC = () => {
    return (
        <div className={'flex flex-col  min-h-screen bg-slate-50'}>
          <Toolbar/>
          <div className={'flex flex-col px-2 sm:px-4 md:px-8 lg:px-16 xl:px-20 py-8'}>
            <Outlet/>
          </div>
          <Toaster/>
        </div>
    );
};
