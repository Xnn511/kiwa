import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/components/dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/card';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '~/components/empty-state';
import { Filter, SearchX } from 'lucide-react';
import { Page } from '~/components/layouts';
import { useMemo, useState } from 'react';
import Button from '~/components/button';
import Input from '~/components/input';
import Badge from '~/components/badge';
import i18n, { useLocale } from 'i18n';
import { cn } from '~/utils';

import Info from '~/config/info.json';
import List from '~/config/menu.json';
import Tags from '~/config/tags.json';

export const path = '/menu';
export const element = Menu;

const tags = [...new Set(List.flatMap(item => item.tags))].map(getTagByName).filter(Boolean);
const categories = [...new Set(List.flatMap(item => item.category))].filter(Boolean);
const tagCategories = [...new Set(tags.map(tag => tag.category))];

function Menu() {
	// Pre-defined state
	const [params, setParams] = useSearchParams();
	const param = params.get('tags');
	const { locale } = useLocale();

	// State
	const filter = param?.length ? Object.fromEntries(param.split(',').map(t => ([t, true]))) : {};
	const [filters, setFilters] = useState<Record<number, boolean>>(filter);
	const [search, setSearch] = useState('');

	// Data
	const list = useMemo(() => List.filter(item => {
		const hasFilter = Object.keys(filters).length;
		const name = i18n.Messages[item.name as keyof typeof i18n.Messages];
		const description = i18n.Messages[item.description as keyof typeof i18n.Messages];

		if (search) {
			if ([name.toLowerCase(), description.toLowerCase()].some(property => property.includes(search.toLowerCase()))) {
				return true;
			} else {
				return false;
			}
		}

		if (hasFilter && item.tags.some((tag: any) => (tag = getTagByName(tag)) && filters[tag.id])) {
			return true;
		} else if (hasFilter) {
			return false;
		}

		return true;
	}).sort((a, b) => {
		const fName = i18n.Messages[a.name as keyof typeof i18n.Messages];
		const sName = i18n.Messages[b.name as keyof typeof i18n.Messages];

		if (fName < sName) {
			return -1;
		}

		if (fName > sName) {
			return 1;
		}

		return 0;
	}), [filters, search, locale]);

	const currency = new Intl.NumberFormat(Info.DefaultLanguage, {
		style: 'currency',
		currency: Info.Currency
	});

	return <Page section={i18n.Messages.MENU} className='py-0 gap-0 mt-3'>
		<div className='flex gap-3 h-full w-full sticky top-0 bg-background py-3 mb-5'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon' aria-label={i18n.Messages.FILTERS} className='flex basis-auto shrink-0'>
						<Filter width={18} height={18} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					<DropdownMenuLabel>
						{i18n.Messages.FILTERS}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{tagCategories.map((category) => <>
						<DropdownMenuLabel key={category}>
							{i18n.Messages[category as keyof typeof i18n.Messages] ?? 'Unknown'}
						</DropdownMenuLabel>
						{tags.filter(t => t!.category === category).filter(Boolean).map(tag => {
							return <DropdownMenuCheckboxItem
								key={tag.name}
								checked={filters[tag!.id]}
								onSelect={(e) => e.preventDefault()}
								onCheckedChange={() => {
									const payload = { ...filters };

									if (filters[tag.id]) {
										delete payload[tag.id];
									} else {
										payload[tag.id] = true;
									}

									const keys = Object.keys(payload);

									if (keys.length) {
										params.set('tags', keys.join(','));
									} else {
										params.delete('tags');
									}

									setFilters(payload);
									setParams(params);
								}}
							>
								{i18n.Messages[tag.name as keyof typeof i18n.Messages] ?? 'Unknown'}
							</DropdownMenuCheckboxItem>;
						})}
					</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Input
				className='flex-grow'
				placeholder={i18n.Messages.SEARCH_MENU}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
		{list.length ? categories.map((category, index) => {
			const items = list.filter(i => i.category === category);
			if (!items.length) return null;

			return <div key={category} className={cn('flex flex-col gap-5', index !== 0 && 'mt-10')}>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{i18n.Messages[category as keyof typeof i18n.Messages]}
				</h3>
				<div className='grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] grid overflow-hidden gap-5'>
					{items.map(item =>
						<Card key={item.name} className='bg-primary-foreground w-auto h-auto'>
							<CardHeader className='pb-2'>
								<img alt={i18n.Messages[item.name as keyof typeof i18n.Messages] ?? 'Unknown'} className='rounded-xl bg-secondary mb-2 object-cover md:h-[275px] h-[225px] max-w-auto' src={item.image} />
								<div className='flex gap-2'>
									<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
										{i18n.Messages[item.name as keyof typeof i18n.Messages] ?? 'Unknown'}
									</h3>
								</div>
							</CardHeader>
							<CardContent className='flex-1'>
								<p className='leading-7 break-words'>
									{i18n.Messages[item.description as keyof typeof i18n.Messages] ?? 'Unknown'}
								</p>
							</CardContent>
							<CardFooter className='flex justify-between items-center'>
								{item.tags.length ? <div className='flex gap-2 items-center overflow-x-auto no-scrollbar'>
									{item.tags.map(name => {
										const tag = getTagByName(name);
										if (!tag) return null;

										return <Badge key={tag.name + item.name} className='select-none'>
											{i18n.Messages[tag.name as keyof typeof i18n.Messages] ?? 'Unknown'}
										</Badge>;
									}).filter(Boolean)}
								</div> : ''}
								<p className='leading-7 break-all float-left text-xl whitespace-nowrap ml-2'>
									{currency.format(item.price)}
								</p>
							</CardFooter>
						</Card>
					)}
				</div>
			</div>;
		}) : <EmptyState icon={<SearchX size={250} />} message={i18n.Messages.NOT_FOUND} />}
		<div className='mb-10' />
	</Page >;
}

function getTagByName(name: string) {
	return Tags.find(tag => tag.name === name);
}