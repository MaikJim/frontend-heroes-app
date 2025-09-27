import { use, useMemo } from "react"
// import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
// import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
// import { getHeroesByPage } from "@/heroes/actions/get-heroes-by-page.action"
import { useSearchParams } from "react-router"
// import { getSummaryAction } from "@/heroes/actions/get-summary.action"
import { useHeroesSummary } from "@/heroes/hooks/useHeroesSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

export const HomePage = () => {

    // const [activeTab, setActiveTab] = useState<"all" | "favorites" | "heroes" | "villains">("all");
    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') as "all" | "favorites" | "heroes" | "villains" || 'all';
    const page = searchParams.get('page') ?? "1";
    const limit = searchParams.get('limit') ?? "6";
    const category = searchParams.get('category') ?? "all";

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)
    const { data: summary } = useHeroesSummary();

    const { favoriteCount, favorites } = use(FavoriteHeroContext)

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title="Universo de SuperHeroes"
                    description="Descubre explora y administra super heroes y villanos."
                />

                {/*  <CustomBreadcrumbs currentPage="Inicio"
                    breadcrumbs={
                        [
                            { label: 'Busqueda de Heroes', to: '/search' },
                            { label: 'Heroes', to: '/heroes/1' },

                        ]}

                /> */}

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            value="all"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'all');
                                prev.set('category', 'all');
                                prev.set('page', '1');
                                return prev;
                            })}>
                            All Characters ({summary?.totalHeroes ?? 0})
                        </TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            className="flex items-center gap-2"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'favorites');
                                prev.set('category', 'favorites');
                                return prev;
                            })}>
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="heroes"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'heroes');
                                prev.set('category', 'hero');
                                prev.set('page', '1');
                                return prev;
                            })}>
                            Heroes ({summary?.heroCount ?? 0})
                        </TabsTrigger>
                        <TabsTrigger
                            value="villains"
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'villain');
                                prev.set('category', 'villain');
                                prev.set('page', '1');
                                return prev;
                            })}>
                            Villains ({summary?.villainCount ?? 0})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <h1>Todos los personajes </h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="favorites">
                        <h1>Personajes Favoritos</h1>
                        <HeroGrid heroes={favorites} />
                    </TabsContent>

                    <TabsContent value="heroes">
                        <h1>Héroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                    <TabsContent value="villians">
                        <h1>Villanos</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}

                {
                    (selectedTab !== 'favorites') && (
                        <CustomPagination totalPages={heroesResponse?.pages ?? 0} />
                    )
                }
            </>
        </>
    )
}