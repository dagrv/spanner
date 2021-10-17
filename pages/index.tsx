import Head from 'next/head'
import React from 'react'

let numberFormatter = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'Eur',
	minimumFractionDigits: 2
})

export default function Invoice() {
	let data = {
		number: '00014',
		me: {
			name: (
				<span className="spce-x-1 text-5xl font-bold text-green-100">
					<span className="font-bold mr-3">INVOICER</span>
					<span className="font-normal">X</span>
				</span>
			),
			address: '4 rue du Jardin, 75005 Paris'
		},
		client: {
			name: 'Random Inc.',
			address: '32 rue du Fontaine, 33000 Bordeaux'
		},
		dates: {
			issue: new Date(),
		},
		items: [
			{ id: 1, description: 'Line Item #1', units: 12, price: 4456, vat: 0.19 },
			{ id: 2, description: 'Line Item #2', units: 5, price: 56444, vat: 0.22 },
			{ id: 3, description: 'Line Item #3', units: 1, price: 1300, vat: 0.12 },
		],
	}

	return (
		<div>
			<div className="bg-white page shadow rounded-lg overflow-hidden space-y-8">
				<div>
					<header className="bg-green-800 p-12">
						<h1>{data.me.name}</h1>
					</header>
					<div className="bg-yellow-500 opacity-70 w-full h-4"></div>
				</div>

				<div className="px-12">
					<span className="text-2xl">
						<span className="text-green-800 font-semibold uppercase">Invoice </span>
						<span className="text-gray-700 text-lg">— {data.number}</span>
					</span>
				</div>

				<div className="flex flex-col">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="overflow-hidden border-b border-gray-200">
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
										<tr>
											<th className="px-6 py-4 whitespace-nowrap text-md text-right" colSpan={4}>Total</th>
											<th className="px-6 py-4 whitespace-nowrap text-md text-right tabular-nums">
												{numberFormatter.format(
													data.items.reduce((sum, item) => sum + item.price * item.units, 0) / 100
												)}
											</th>
										</tr>
									</tfoot>

								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
