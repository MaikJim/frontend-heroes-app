import { Badge } from "@/components/ui/badge"
import { Users, Heart, Zap, Trophy } from "lucide-react"
import HeroStat from "./HeroStat"
// import { useQuery } from "@tanstack/react-query"
// import { getSummaryAction } from "../actions/get-summary.action"
import { useHeroesSummary } from "../hooks/useHeroesSummary"
import { use } from "react"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"

export const HeroStats = () => {


    // const { data: summary } = useQuery({
    //     queryKey: ['summary-information'],
    //     queryFn: getSummaryAction,
    //     staleTime: 1000 * 60 * 5, // 5 minutes
    // });

    const { data: summary } = useHeroesSummary();
    const { favoriteCount } = use(FavoriteHeroContext)

    // const percentageFavorite = useMemo(() => {
    //     const percentage = (favoriteCount / (summary?.totalHeroes || 1)) * 100;
    //     return percentage.toFixed(2);
    // },[favoriteCount, summary])

    if (!summary) return <div>Loading...</div>;
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <HeroStat
                title="Total de personajes"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summary?.heroCount}
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summary?.villainCount}
                    </Badge>
                </div>
            </ HeroStat>

            {/* TODO: tenemos que calcular este valor  */}
            <HeroStat
                title="Favorites"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
                <p className="text-xs text-muted-foreground">
                    {((favoriteCount / summary?.totalHeroes) * 100).toFixed(2)}% of total
                </p>
            </ HeroStat>

            <HeroStat
                title="Strongest"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}</p>
            </ HeroStat>

            <HeroStat
                title="Smartest"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}</p>
            </ HeroStat>

        </div>
    )
}


