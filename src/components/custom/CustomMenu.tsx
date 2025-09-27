
import { Link, useLocation } from 'react-router'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu'
import { cn } from '@/lib/utils';

const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return pathname === path;
    }

    return (
        <NavigationMenu className='py-5'>
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/') && 'bg-slate-300', 'p-2 rounded-md')}
                    >
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {/* Heroes */}
                {/* <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/heroes/1') && 'bg-slate-300', 'p-2 rounded-md')}>
                        <Link to="/heroes/1">Hero</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem> */}
                {/* search */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/search') && 'bg-slate-300', 'p-2 rounded-md')}>
                        <Link to="/search">Buscar superheroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    )
}

export { CustomMenu }
