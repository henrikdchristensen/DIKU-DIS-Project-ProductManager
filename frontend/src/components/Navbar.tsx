import React from 'react'
import { SiTeamviewer } from 'react-icons/si';

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
                <a href="https://mechtronic.dk" className="flex items-center">
                    <img src={process.env.PUBLIC_URL + '/Mechtronic-logo-web-350px.png'} className="h-6 mr-3" alt="logo" />
                </a>
                <div className="flex items-center space-x-6">
                    <a href="https://download.teamviewer.com/download/TeamViewerQS.exe">
                        <SiTeamviewer className="text-2xl " size={45} color="#2b347b" />
                    </a>


                    <div className="group inline-block">
                        <div className="bg-gray-600 font-bold text-white border-2 border-gray-900 hover:bg-gray-500 hover:border-gray-800 rounded-full flex items-center justify-center font-mono w-12 h-12 mx-4">
                            <label className="text-xl">MJ</label>
                        </div>
                        <div className='transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top'>
                            <ul className="bg-white border border-gray-400 text-center divide-y divide-gray-300 rounded-md shadow-lg mt-1 hover:bg-gray-100">
                                <li className="text-gray-700 font-bold block px-4 py-2 text-base">Log ud</li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </nav>
    )
}

export default Navbar


