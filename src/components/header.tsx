import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '~/components/sheet';
import { CalendarCheck, HelpCircle, Home, Menu, ScrollText } from 'lucide-react';
import { useTheme } from '~/components/providers/theme-provider';
import LanguageSwitcher from '~/components/language-switcher';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '~/components/theme-switcher';
import Separator from '~/components/separator';
import Button from '~/components/button';
import Info from '~/config/info.json';
import { useState } from 'react';
import i18n from 'i18n';
import { cn } from '~/utils';

function Header(props: React.HTMLProps<HTMLElement>) {
	const navigate = useNavigate();
	const location = useLocation();
	const { theme } = useTheme();

	const [sidebar, setSidebar] = useState(false);

	return <nav {...props} key='header' className={cn('sticky h-18 flex px-[20px] py-[10px] items-center gap-[10px] border-b text-card-foreground shadow-sm bg-background z-10', props.className)}>
		<div className='container flex h-14 items-center gap-[10px] p-0'>
			<a href='/' onClick={e => (e.preventDefault(), navigate('/'))} className='flex items-center gap-[10px] mr-[10px] cursor-pointer hover:opacity-75 transition-opacity'>
				<img alt='logo' src={`/img/logo-${theme}.png`} width={56} height={56} />
				<h3 className='select-none font-logo scroll-m-20 text-3xl font-semibold tracking-tight'>
					{Info.Name}
				</h3>
			</a>
			<Separator orientation='vertical' className='h-5 hidden sm:flex' />
			<NavigationMenu className='w-full hidden sm:flex md:items-center md:w-auto'>
				<NavigationMenuList>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink href='/' className='uppercase font-semibold bg-transparent' onClick={e => (e.preventDefault(), navigate('/'))}>
							{i18n.Messages.HOME}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink
							className='uppercase font-semibold bg-transparent'
							href='/#/menu'
							onClick={e => (e.preventDefault(), navigate('/menu'))}
						>
							{i18n.Messages.MENU}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink href='/#/reservation' className='uppercase font-semibold bg-transparent' onClick={e => (e.preventDefault(), navigate('/reservation'))}>
							{i18n.Messages.RESERVE}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className='cursor-pointer select-none w-full'>
						<NavigationMenuLink href='/#/faq' className='uppercase font-semibold bg-transparent' onClick={e => (e.preventDefault(), navigate('/faq'))}>
							{i18n.Messages.FAQ}
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className='ml-auto flex flex-row gap-3 items-center flex-shrink-0 flex-grow-0'>
				<LanguageSwitcher />
				<ThemeSwitcher />
				<Sheet open={sidebar} onOpenChange={setSidebar}>
					<SheetTrigger className='sm:hidden flex'>
						<Button variant='outline' size='icon'>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>{Info.Name}</SheetTitle>
							<SheetDescription>
								<div onClick={() => navigate('/')} className={`flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>
									<Home />
									{i18n.Messages.HOME}
								</div>
								<div onClick={() => navigate('/menu')} className={`flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer ${location.pathname === '/menu' ? 'text-foreground' : 'text-muted-foreground'}`}>
									<ScrollText />
									{i18n.Messages.MENU}
								</div>
								<div onClick={() => navigate('/reservation')} className={`flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer ${location.pathname === '/reservation' ? 'text-foreground' : 'text-muted-foreground'}`}>
									<CalendarCheck />
									{i18n.Messages.RESERVE}
								</div>
								<div onClick={() => navigate('/faq')} className={`flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer ${location.pathname === '/faq' ? 'text-foreground' : 'text-muted-foreground'}`}>
									<HelpCircle />
									{i18n.Messages.FAQ}
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	</nav>;
}

export default Header;