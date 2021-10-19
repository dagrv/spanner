import React from 'react'
import {addDays, format} from 'date-fns'

let numberFormatter = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'Eur',
	minimumFractionDigits: 2
})
interface Item {
	description: string
	units: number
	price: number
	vat: number
}
interface Invoice {
	items: Item[]
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
			{ id: 1, description: 'Line Item #1', units: 0, price: 10000, vat: 0.21 },
			{ id: 2, description: 'Line Item #2', units: 0, price: 15000, vat: 0.18 },
			{ id: 3, description: 'Line Item #3', units: 0, price: 20000, vat: 0.12 },
			{ id: 4, description: 'Line Item #4', units: 0, price: 10000, vat: 0.18 },
		],
	}

	let vats = Object.values<{total: number; vat: number}>(
		data.items.reduce((grouped, item) => {
			grouped[item.vat] ??= { total: 0, vat: item.vat }
			grouped[item.vat].total += item.price * item.units * item.vat
			return grouped
		}, {})
	)
	//.filter(({total}) => total)

	return (
		<div>
			<div className="bg-white page shadow rounded-lg overflow-hidden space-y-10 flex flex-col">
				<div>
					<header className="bg-gradient-to-l from-green-600 to-green-700 p-12 flex justify-between">
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

				<div className="flex flex-col flex-1">
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
									TAX
								</th>
								<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
									Subtotal
								</th>
							</tr>
						</thead>
						
						<tbody>
							{data.items.map((item, lineIdx) => (
								<tr key={item.id} className={lineIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
									<td className="px-6 py-4 whitespace-nowrap font-semibold">
										{ item.description }
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{ item.units }
									</td>
									<td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-right">
										{ numberFormatter.format(item.price / 100) }
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										{ (item.vat * 100).toFixed(0) } %
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right tabular-nums">
										{ numberFormatter.format(item.price * item.units / 100) }
									</td>
								</tr>
							))}
						</tbody>

						<tfoot>
							{vats.length > 0 && (
								<tr className="border-t-2">
									<th colSpan={3} />
									<th className="px-6 py-2 whitespace-nowrap text-base text-right border-l border-r">
										Subtotal
									</th>
									<th className="px-6 py-2 whitespace-nowrap text-base text-right tabular-nums">
										{numberFormatter.format(total(data.items) / 100)}
									</th>
								</tr>
							)}
							
							{vats.map(({total, vat}) => (
								<tr key={vat}>
									<th colSpan={3} />
									<th className="px-6 py-2 whitespace-nowrap text-base text-right border-l border-r">
										VAT ({(vat * 100).toFixed(0)}%)
									</th>
									<th className="px-6 py-2 whitespace-nowrap text-base text-right tabular-nums">
										{numberFormatter.format(total / 100)}
									</th>
								</tr>
							))}

							<tr>
								<th colSpan={3} />
								<th className="px-6 py-2 whitespace-nowrap text-base text-right border-t border-r border-l border-b">
									Total
								</th>
								<th className="px-6 py-2 whitespace-nowrap text-base text-right tabular-nums border-b border-t">
									{numberFormatter.format(total(data.items, TotalFeautures.IncludingVAT) / 100)}
								</th>
							</tr>
						</tfoot> 
					</table>
					
				</div>

				<div>
					<div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-80 w-full h-3"></div>
					<div className="bg-gradient-to-r from-green-600 to-green-700 p-12 text-white space-y-8">
						<div className="flex justify-between text-2xl font-semibold">
							<span className="text-green-100">Total to pay </span>
							<span className="text-green-100">{numberFormatter.format(total(data.items, TotalFeautures.IncludingVAT) / 100)}</span>
						</div>

						<div className="flex justify-between">
							<div className="space-y-2">
								<h3 className="font-semibold text-green-100 text-xl">Payment details</h3>
								<table>
									<tr>
										<td className="font-bold">VAT</td>
										<td className="px-2">FR 0000 000 000</td>
									</tr>
									<tr>
										<td className="font-bold">IBAN</td>
										<td className="px-2">FR76 0000 0000 0000 0000 0000777</td>
									</tr>
									<tr>
										<td className="font-bold">EMAIL</td>
										<td className="px-2">help@spanner.com</td>
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
			</div>
		</div>
	)
}