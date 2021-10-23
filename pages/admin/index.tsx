
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ClientListbox } from '../../ui/form/client-listbox'
// import {
//   BellIcon,
//   ClockIcon,
//   CogIcon,
//   CreditCardIcon,
//   DocumentReportIcon,
//   HomeIcon,
//   MenuAlt1Icon,
//   QuestionMarkCircleIcon,
//   ScaleIcon,
//   ShieldCheckIcon,
//   UserGroupIcon,
//   XIcon } from '@heroicons/react/outline'

// import {
//     CashIcon,
//     CheckCircleIcon,
//     ChevronDownIcon,
//     ChevronRightIcon,
//     OfficeBuildingIcon,
//     SearchIcon
// } from '@heroicons/react/solid'

// const navigation = [
//     { name: 'Home', href: '#', icon: HomeIcon, current: true },
//     { name: 'History', href: '#', icon: ClockIcon, current: false },
//     { name: 'Balances', href: '#', icon: ScaleIcon, current: false },
//     { name: 'Cards', href: '#', icon: CreditCardIcon, current: false },
//     { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
//     { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false },
//     { name: 'Privacy', href: '#', icon: ShieldCheckIcon, current: false }
// ]

// const cards = [
//     {name: 'Account Balance', href: '#', icon: ScaleIcon, amount: '30.59€'}
// ]

// const transactions = [
//     {
//         id: 1,
//         name: 'Payment to Molly',
//         href: '#',
//         amount: '20.00€',
//         currency: 'EUR',
//         status: 'success',
//         date: 'July 11, 2020',
//         datetime: '2020-07-11'
//     },
//     // More
// ]

// const statusStyles = {
//     success: 'bg-green-100 text-green-800',
//     processing: 'bg-yellow-100 text-yellow-800',
//     failed: 'bg-gray-100 text-gray-800'
// }

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//     let [sidebarOpen, setSidebarOpen] = useState(false)

//     return (
//         <div className="h-screen flex overflow-hidden bg-gray-100">
//             <Transition.Root show={sidebarOpen} as={Fragment}>
//             <Dialog
//                 as="div"
//                 static
//                 className="fixed inset-0 flex z-40 lg:hidden"
//                 open={sidebarOpen}
//                 onClose={setSidebarOpen}
//             >
//                 <Transition.Child
//                     as={Fragment}
//                     enter="transition-opacity ease-linear duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="transition-opacity ease-linear duration-300"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
//                 </Transition.Child>

//                 <Transition.Child
//                     as={Fragment}
//                     enter="transition ease-in-out duration-300 transform"
//                     enterFrom="-translate-x-full"
//                     enterTo="-translate-x-0"
//                     leave="transition ease-in-out duration-300 transform"
//                     leaveFrom="translate-x-0"
//                     leaveTo="-translate-x-full"
//                 >
//                     <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-700">
//                         <Transition.Child
//                             as={Fragment}
//                     </div>
//         </div>
//     )
// }


export default function Example() {
    return (
        <>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Create New Invoice
                            </h3>
                            <p className="mt-1 text-sm text-gray-700">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    
                                    {/* Invoice Number */}
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="invoice-number" className="block text-sm font-medium text-gray-800">
                                                Invoice Number
                                            </label>

                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                    #
                                                </span>
                                                <input type="text" name="invoice-number" id="invoice-number"
                                                    className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                    placeholder="Invoice Number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Client */}
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="client" className="block text-sm font-medium text-gray-800">
                                                Client
                                            </label>

                                            <div className="w-240 mb-4 mt-6 h-6 sm:mt-0 sm:col-span-2 ">
                                                <ClientListbox />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Issue Date */}
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="issue-date" className="block text-sm font-medium text-gray-800">
                                                Issue Date
                                            </label>

                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input type="date" name="issue-date" id="issue-date"
                                                    className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    placeholder="Issue Date"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Due Date */}
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="due-date" className="block text-sm font-medium text-gray-800">
                                                Due Date
                                            </label>

                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input type="date" name="due-date" id="due-date"
                                                    className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                    placeholder="Due Date"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Legal */}
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Legal
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="All of legal stuff are going here"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-white text-right sm:px-6">
                                    <button type="submit"
                                        className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >Cancel
                                    </button>
                                    
                                    <button type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </>
    )
}