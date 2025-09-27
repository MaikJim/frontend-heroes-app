import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHeroesAction } from "@/heroes/actions/search-heros.action"
import { HeroGrid } from "@/heroes/components/HeroGrid"
// import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"


const SearchPage = () => {
    // TODO: useQuery


    const [searchParams] = useSearchParams();

    const name = searchParams.get('name') ?? '';
    const strength = searchParams.get('strength') ?? '';

    const { data: heroes } = useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5 // 5 minutos
    });

    return (
        <>
            <CustomJumbotron
                title="Busqueda de SuperHroes"
                description="Descubre explora y administra super heroes y villanos."
            />

            {/* <CustomBreadcrumbs currentPage="Busqueda de Heroes"
                breadcrumbs={
                    [
                        { label: 'Inicio', to: '/' },
                        { label: 'Heroes', to: '/heroes/1' },

                    ]}

            /> */}
            <HeroStats />
            {/* Search Controls */}
            <SearchControls />

            {/*  */}
            <HeroGrid heroes={heroes ?? []} />
        </>
    )
}

export default SearchPage
