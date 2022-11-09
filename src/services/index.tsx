import useServices from './hooks/useServices';
import type { NextPage } from 'next'
import Service from './types/Service';
import ServiceItem from './components/service';
import IncidentsSection from '../incidents';
import useSystemStatus from './hooks/useSystemStatus';

const ServicesSection: NextPage = () => {
    const [data, isServicesLoading] = useServices();
    const [status, isStatusLoading] = useSystemStatus();

    return (
        <div className='mt-10'>
            <div className=" mx-px md:ml-80 md:mr-80 bg-white dark:bg-slate-800 rounded-xl card">
                <div className="w-full flex justify-between pt-2 pl-6 pr-6 pb-2">
                    <div className='flex items-center sm:text-xl text-xs font-semibold leading-7'>
                        <svg className="h-6 w-6 flex-none fill-sky-100 stroke-green-500 stroke-2">
                            <circle cx="12" cy="12" r="11" />
                            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                        </svg>
                        <p className="ml-3 text-gray-900">All System Operational</p>
                        <p>{JSON.stringify(status)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Last updated</p>
                        <p className="text-xs text-gray-400 text-end ">5 min ago</p>
                    </div>
                </div>
            </div>
            <div className="mx-px mt-10 md:ml-60 md:mr-60">
                <div className="card-body">
                    {
                        isServicesLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {
                                    (data as Service[]).map(service => (
                                        <ServiceItem key={service.id} item={service} />
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
                <p className="mt-10 sm:text-lg	text-base font-semibold leading-7 text-gray-900">Recent incident</p>
                <IncidentsSection />
            </div>
        </div >
    )
}

export default ServicesSection;
