import React from 'react'
import {addDays, format} from 'date-fns'
import {classNames} from '../utils/class-names'

let numberFormatter = new Intl.NumberFormat('fr', {
	style: 'currency',
	currency: 'Eur',
	minimumFractionDigits: 2
})

interface Item {
	id: number
	description: string
	units: number
	price: number
	vat: number
}

interface Invoice {
	number: string
	me: {
		name: ReactNode
		address: string
	},
	client: {
		name: string
		address: string
	},
	dates: {
		issue: Date
	}
	items: Item[]
}

function range(n: number) {
	return Array.apply(null, Array(n)).map((x, i) => i);
}

function chunk<T>(array:T[], n: number): T[][] {
	return range(Math.ceil(array.length / n)).map((x, i) => {
		return array.slice(i * n, i * n + n);
	});
}

enum TotalFeautures {
	None = 1 << 0,
	IncludingVAT = 1 << 1,
}

function total(items: Invoice['items'], features: TotalFeautures = TotalFeautures.None) {
	return items.reduce((sum, item) => {
		let subtotal = item.price * item.units

		if (features & TotalFeautures.IncludingVAT) {
			subtotal *= 1 + item.vat
		}

		return sum + subtotal
	}, 0)
}

function BigHeading({data}: {data:Invoice}) {
	return (
	<>
		<div>
			<header className="bg-gradient-to-l from-green-600 to-green-700 p-12 flex justify-between items-center">
				<h1>{data.me.name}</h1>
				<span className="text-lg text-white font-semibold mt-2">{format(data.dates.issue, 'PPP')}</span>
			</header>
			<div className="bg-gradient-to-l from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
		</div>

		<div className="px-12">
			<span className="text-2xl">
				<span className="text-green-800 font-semibold uppercase">Invoice </span>
				<span className="text-gray-700 text-2xl"> #{data.number}</span>
			</span>
		</div>

		<div className="px-12 flex justify-between">
			<div>
			<h3 className="font-semibold text-gray-700">Information</h3>
				
				<table>
					<tr>
						<td>Issue Date:</td>
						<td className="px-2">{format(data.dates.issue, 'PPP')}</td>
					</tr>
					<tr>
						<td>Due Date:</td>
						<td className="px-2">
							<div className="space-x-2">
								<span>{format(addDays(data.dates.issue, 30), 'PPP')}</span>
								<span className="text-green-700 font-medium">(30 Days)</span>
							</div>
						</td>
					</tr>
				</table>
			</div>

			<div className="space-2">
			<h3 className="font-semibold text-gray-700">Client</h3>
				<div className="flex flex-col">
					<span>{data.client.name}</span>
					<span>{data.client.address}</span>
				</div>
			</div>
		</div>
	</>
	)
}

function SmallHeading({data}: {data:Invoice}) {
	return (
	<>
		<div>
			<header className="bg-gradient-to-l from-green-600 to-green-700 px-12 py-8 flex justify-between items-center">
				<h1>{data.me.name}</h1>
				<span className="text-xl text-white font-semibold mt-2">{format(data.dates.issue, 'PPP')}</span>
			</header>
			<div className="bg-gradient-to-l from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
		</div>
	</>
	)
}

function Footer({items}:{items:Invoice['items']}) {
	return (
		<div>
			<div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
			<div className="bg-gradient-to-r from-green-600 to-green-700 p-12 text-white space-y-8">
				<div className="flex justify-between text-2xl font-semibold">
					<span className="text-green-100">TOTAL </span>
					<span className="text-green-100 tabular-nums">{numberFormatter.format(total(items, TotalFeautures.IncludingVAT) / 100)}</span>
				</div>

				<div className="flex justify-between">
					<div className="space-y-2">
						<h3 className="font-semibold text-green-100 text-xl">Payment details</h3>
						<table>
							<tr>
								<td className="font-bold">TVA</td>
								<td className="px-2">FR 0000 000 000</td>
							</tr>
							<tr>
								<td className="font-bold">IBAN</td>
								<td className="px-2">FR76 0000 0000 0000 0000 0000777</td>
							</tr>
							<tr>
								<td className="font-bold">EMAIL</td>
								<td className="px-2">help@spanner-invoices.com</td>
							</tr>
						</table>
					</div>

					<div className="space-y-2">
						<h3 className="font-semibold text-green-100 text-xl">Payment Terms & Conditions</h3>
						<table>
							<tr>
								<td className="font-bold">LOCALE</td>
								<td className="px-2">FR</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

function Items({ items, children }: {items:Invoice['items'], children?: ReactNode}) {
	return (
		<table className="min-w-full divide-y divide-gray-200 border-t">
		<thead className="bg-gray-50">
			<tr>
				<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full whitespace-nowrap">
					Description
				</th>
				<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
					#
				</th>
				<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
					Unit Price
				</th>
				<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
					TAX/TVA
				</th>
				<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
					Subtotal
				</th>
			</tr>
		</thead>
		
		<tbody>
			{items.map((item, lineIdx) => (
				<tr key={item.id} className={classNames(
					lineIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100',
					lineIdx === items.length - 1 && 'border-b'
				)}>
					<td className="px-6 py-4 whitespace-pre-wrap text-sm font-semibold align-top">
						{ item.description }
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm align-top">
						{ item.units }
					</td>
					<td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-right align-top">
						{ numberFormatter.format(item.price / 100) }
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right align-top">
						{ (item.vat * 100).toFixed(0) } %
					</td>
					<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right tabular-nums align-top">
						{ numberFormatter.format(item.price * item.units / 100) }
					</td>
				</tr>
			))}
		</tbody>
		{children}
	</table>
	)
}


export default function Invoice() {
	let data = {
		number: '00014',
		me: {
			name: (
				<span className="spce-x-1 text-4xl font-bold text-white">
					<span className="font-semibold mr-3">SPANNER</span>
					<span className="font-normal mr-3">INVOICES</span>
				</span>
			),
			address: '4 rue du Jardin, 75005 Paris'
		},
		client: {
			name: 'Random Inc.',
			address: '32 rue de la Fontaine, 33000 Bordeaux'
		},
		dates: {
			issue: new Date(),
		},
		items: [
			
		],
	}

	for (let i = 0; i < 100; i++) {
		data.items.push({
			id: i + 1,
			description: `Line Item #${i + 1}`,
			units: (Math.random() * 20)|0,
			price: (Math.random() * 50 + 75)|0 * 100,
			vat: [0.18, 0.21, 0.12, ][Math.random() * 3 | 0],
		})
	}

	let vats = Object.values<{ total: number; vat: number }>(
		data.items.reduce((grouped, item) => {
			grouped[item.vat] = grouped[item.vat] || { total: 0, vat: item.vat }
			grouped[item.vat].total += item.price * item.units * item.vat
			return grouped
		}, {})
	).filter(({ total }) => total)

	return (
		<div className="space-y-8">
			{chunk(data.items, 9).map((items, pageIndex, list) => {
				return ( 
				<div className="bg-white page shadow rounded-lg overflow-hidden space-y-8 flex flex-col">	
					{pageIndex === 0 ? <BigHeading data={data} /> : <SmallHeading data={data} />}

					<div className="flex flex-col flex-1">
						{pageIndex === list.length-1? (
							<Items items={items}>
								<tfoot>
									{ vats.length > 0 && (
									<tr className="border-t-2">
											<th colSpan={3} />
											<th className="px-6 py-2 whitespace-nowrap text-base text-right border-l border-r border-b border-t">
												Subtotal
											</th>
											<th className="px-6 py-2 whitespace-nowrap text-base text-right tabular-nums border-b border-t">
												{numberFormatter.format(total(data.items) / 100)}
											</th>
										</tr>
									)}
							
									{ vats.map(({total, vat}) => (
										<tr key={vat}>
											<th colSpan={3} />
											<th className="px-6 py-2 whitespace-nowrap text-base text-right border-l border-r">
												TVA ({(vat * 100).toFixed(0)}%)
											</th>
											<th className="px-6 py-2 whitespace-nowrap text-base text-right tabular-nums">
												{numberFormatter.format(total / 100)}
											</th>
										</tr>
									))}

									<tr>
										<th colSpan={3} />
										<th className="px-6 py-2 whitespace-nowrap text-base text-right border-t border-r border-l border-b">
											TOTAL
										</th>
										<th className="px-6 py-2 whitespace-nowrap text-base text-right tabular-nums border-b border-t">
											{numberFormatter.format(total(data.items, TotalFeautures.IncludingVAT) / 100)}
										</th>
									</tr>
								</tfoot>
							</Items>
						): (
							<Items items={items} />
						)}
					</div>
					{pageIndex === list.length -1 && <Footer items={data.items} /> }
				</div>
				)
			})}
		</div>
	)
}