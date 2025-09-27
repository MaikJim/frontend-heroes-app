import AdminLayout from "@/admin/layout/AdminLayout";
import AdminPages from "@/admin/pages/AdminPages";
import HeroesLayout from "@/heroes/layout/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";

import { lazy } from "react";
import { createHashRouter } from "react-router";


const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([

    {
        path: "/",
        element: <HeroesLayout />,
        children: [

            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/heroes/:idSlug",
                element: <HeroPage />
            },
            {
                path: "/search",
                element: <SearchPage />
            },
            {
                path: "*",
                element: <div>404 | Page not found</div>
            }
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPages />
            }

        ],
    }

])