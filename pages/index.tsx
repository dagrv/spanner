import React, { ReactNode, useState } from 'react'
import { addDays, format, parseISO } from 'date-fns'
import { classNames } from '../utils/class-names'

let numberFormatter = new Intl.NumberFormat('en', {
	style: 'currency',
	currency: 'USD',
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
	number: number
	me: { name: string; address: string }
	client: { name: string, address: string }
	dates: { issue: string }
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

enum TotalFeatures {
	None = 1 << 0,
	IncludingVAT = 1 << 1,
}

function total(items: Invoice['items'], features: TotalFeatures = TotalFeatures.None) {
	return items.reduce((sum, item) => {
		let subtotal = item.price * item.units

		if (features & TotalFeatures.IncludingVAT) {
			subtotal *= 1 + item.vat
		}

		return sum + subtotal
	}, 0)
}

function BigHeading( { invoice } : { invoice: Invoice }) {
	return (
		<>
			<div>
				<header className="bg-gradient-to-l from-green-600 to-green-700 p-12 flex justify-between items-center">
					<span className="space-x-1 text-4xl font-bold text-white">
						<span className="font-semibold mr-2">SPANNER</span>
						<span className="font-normal">INVOICES</span>
					</span>
					
					<span className="text-2xl text-white font-semibold mt-2">
						{format(parseISO(invoice.dates.issue), 'PPP')}
					</span>
				</header>
				<div className="bg-gradient-to-l from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
			</div>

			<div className="px-12 py-8">
				<span className="text-2xl space-x-3">
					<span>
						<span className="text-green-800 font-semibold uppercase dark:text-green-500">Invoice </span>
						<span className="text-gray-800 text-2xl dark:text-white"> #{invoice.number.toString().padStart(4, '0')}</span>
					</span>
				</span>
			</div>

			<div className="px-12 flex justify-between">
				<div>
					<h3 className="font-semibold text-gray-800 dark:text-white">Information</h3>
						
						<table>
							<tbody>
								<tr>
									<td>Issue Date:</td>
									<td className="px-3">{format(parseISO(invoice.dates.issue), 'PPP')}</td>
								</tr>
								<tr>
									<td>Due Date:</td>
									<td className="px-3">
										<div className="space-x-3">
											<span>{format(addDays(parseISO(invoice.dates.issue), 30), 'PPP')}</span> {/* EYE */}
											<span className="text-green-700 font-semibold">(30 Days)</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="space-2">
						<h3 className="font-semibold text-gray-800 dark:text-white">Client</h3>
						<div className="flex flex-col text-gray-800 dark:text-white">
							<span>{invoice.client.name}</span>
							<span>{invoice.client.address}</span>
						</div>
					</div>
			</div>
		</>
	)
}

function SmallHeading( { invoice } : { invoice: Invoice }) {
	return (
		<>
			<div>
				<header className="bg-gradient-to-l from-green-600 to-green-700 px-12 py-8 flex justify-between items-center">
					<span className="space-x-1 text-2xl font-bold text-white">
						<span className="font-semibold">SPANNER</span>
						<span className="font-normal">INVOICES</span>
					</span>
					<span className="text-xl text-white font-semibold">
						{format(parseISO(invoice.dates.issue), 'PPP')}
					</span>
				</header>
				<div className="bg-gradient-to-l from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
			</div>
		</>
	)
}

function Footer({ items } : { items: Invoice['items'] }) {
	return (
		<div>
			<div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
			<div className="bg-gradient-to-r from-green-600 to-green-700 p-12 text-white space-y-8">
				<div className="flex justify-between text-2xl font-semibold">
					<span className="text-green-100">TOTAL </span>
					<span className="text-green-100 tabular-nums">{numberFormatter.format(total(items, TotalFeatures.IncludingVAT) / 100)}</span>
				</div>

				<div className="flex justify-between">
					<div className="space-y-2">
						<h3 className="font-semibold text-green-100 text-xl">Payment details</h3>
						<table>
							<tbody>
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
							</tbody>
						</table>
					</div>

					<div className="space-y-2">
						<h3 className="font-semibold text-green-100 text-xl">Payment Terms and Conditions</h3>
						<table>
							<tbody>
								<tr>
									<td className="font-bold">LOCALE</td>
									<td className="px-2">FR</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

function Items({ items, children }: { items: Invoice['items'], children?: ReactNode }) {
	return (
		<table className="min-w-full divide-y divide-gray-200 border-t dark:divide-gray-900">
			<thead className="bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
				<tr>
					<th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider w-full whitespace-nowrap">
						Description
					</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
						#
					</th>
					<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
						Unit Price
					</th>
					<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
						TAX/TVA
					</th>
					<th scope="col" className="px-12 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
						Subtotal
					</th>
				</tr>
			</thead>
			
			<tbody>
				{items.map((item, lineIdx) => (
					<tr key={item.id} className={classNames(
						lineIdx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-100 dark:bg-gray-800',
						lineIdx === items.length - 1 && 'border-b dark:border-gray-700'
					)}>
						<td className="px-12 py-4 whitespace-pre-wrap text-sm font-semibold align-top">
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
						<td className="px-12 py-4 whitespace-nowrap text-sm font-medium text-right tabular-nums align-top">
							{ numberFormatter.format(item.price * item.units / 100) }
						</td>
					</tr>
				))}
			</tbody>
		{children}
	</table>
	)
}

function randomInt(min: number, max: number) {
	return (Math.random() * (max - min + 1) | 0)
}

export function getServerSideProps() {
	let invoice: Invoice = {
		number: (Math.random() * 1000) | 0,
		me: {
			name: 'Spanner Invoices',
			address: '4 rue du Jardin, 75005 Paris'
		},
		client: {
			name: 'Random Inc.',
			address: '32 rue de la Fontaine, 33000 Bordeaux'
		},
		dates: {
			issue: new Date().toISOString(),
		},
		items: [],
	}

	for (let i = 0; i < 10; i++) {
		invoice.items.push({
			id: i + 1,
			description: [
				`Line Item #${i + 1}`,
				...range(randomInt(0, 3)).map((i) => {
					return `\tSub Line Item #${i + 1}`
				})
			].join('\n'),
			units: randomInt(1, 20),
			price: randomInt(50, 75) * 100,
			vat: [0.18, 0.21, 0.12, ][Math.random() * 3 | 0],
		})
	}

	return { props: { invoice } }
}


export default function Invoice({ invoice }: { invoice: Invoice }) {
	let vats = Object.values<{ total: number; vat: number }>(
		invoice.items.reduce((grouped, item) => {
			grouped[item.vat] = grouped[item.vat] || { total: 0, vat: item.vat }
			grouped[item.vat].total += item.price * item.units * item.vat
			return grouped
		}, {})
	)
	.filter(({ total }) => total)
	.sort((a, z) => a.vat - z.vat)

	let [perPage, setPerPage] = useState([invoice.items.length])
	let pages = perPage.map((amount, i) => {
		let offset = perPage.slice(0, i).reduce((total, amount) => total + amount, 0)
		return invoice.items.slice(offset, offset + amount)
	})

	return (
		<div className="space-y-8 print:space-y-0 w-full p-12 print:p-0">
			{pages.map((items, pageIdx) => (
				<div key={pageIdx} className="bg-white page flex flex-col mx-auto">	
					<div className="space-y-4 pb-12">
						{pageIdx === 0 ? <BigHeading invoice={invoice} /> : <SmallHeading invoice={invoice} /> }
					</div>

					<div className="flex flex-col flex-1 relative">
						<FitContent onResize={() => {
							setPerPage((perPage) => {
								let clone = perPage.slice()
								
								clone[pageIdx] -= 1
								clone[pageIdx + 1] = clone[pageIdx + 1] || 0
								clone[pageIdx + 1] += 1
								
								return clone
							})
						}}>

						{pageIdx === pages.length - 1 ? (
							<>
							<Items items={items} />
								<div className="flex justify-end my-2 mx-6 p-2">
									<div className="rounded-lg border overflow-hidden">
										<table>
											<tbody>
												{vats.length > 0 && (
													<tr className="odd:bg-white even:bg-gray-50">
														<th scope="col"
															className="px-4 py-2 text-right text-xs font-medium text-gray-800">
																Subtotal
														</th>
														
														<th className="px-4 py-2 whitespace-nowrap text-sm font-medium tabular-nums">
															{numberFormatter.format(total(invoice.items) / 100)}
														</th>
													</tr>
												)}
										
												{vats.map(({ total, vat }) => (
													<tr key={vat} className="odd:bg-white even:bg-gray-50">
														<th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-800">
															TVA ({(vat * 100).toFixed(0)}%)
														</th>
														<td className="px-4 py-2 whitespace-nowrap text-sm text-right tabular-nums text-gray-800">
															{numberFormatter.format(total / 100)}
														</td>
													</tr>
												))}

												<tr className="odd:bg-white even:bg-gray-50">
													<th scope="col" className="px-4 py-2 text-right text-xs font-medium text-gray-800">
														Total
													</th>
													<td className="px-4 py-2 whitespace-nowrap text-base text-right tabular-nums">
														{numberFormatter.format(total(invoice.items, TotalFeatures.IncludingVAT) / 100)}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</>
						): (
							<>
								<Items items={items} />
								<div className="flex justify-end my-2 mx-6 p-2">
									<div className="rounded-lg border overflow-hidden">
										<table>
											<tbody>
												<tr className="odd:bg-white even:bg-gray-50">
													<th scope="col" className="px-4 py-2 text-right text-sm font-medium text-gray-700 uppercase">
														Subtotal on this page
													</th>
													<td className="px-4 py-2 whitespace-nowrap text-md text-gray-800 text-right">
														{ numberFormatter.format(total(items) / 100) }
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</>
						)}
						</FitContent>
					</div>

					{pageIdx === pages.length - 1 ? (
						<Footer items={invoice.items} />
					) : (
						<div className="flex items-center justify-between text-sm border-t border-gray-100 px-12 py-3 bg-gray-50 text-gray-800">
							<span>Spanner Invoices</span>
							<span>
								{pageIdx + 1} of {pages.length}
							</span>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

function FitContent({ children, onResize }: { children: ReactNode, onResize: () => void }) {
	let [availableHeight, setAvailableHeight] = useState<number | null>(null)

	console.log({ availableHeight });
	
	if (availableHeight === null) {
		return (
			<div className="h-full" ref={(element) => {
				if (!element) return
				setAvailableHeight(element.parentElement.clientHeight)
			}} />
		) 
	}

	return (
		<div 
			ref={(element) => {
				if (!element) return

				let height = element.parentElement.scrollHeight

				if (height > availableHeight) {
					onResize()
					setAvailableHeight(null)
				}
		}}
		>
			{children}
		</div>
	)
}