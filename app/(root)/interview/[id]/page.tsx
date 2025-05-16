import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { getCurrentuser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({params}: RouteParams) => {
    const user = await getCurrentuser();
    const {id} = await params;
    const interview = await getInterviewById(id);
    if (!interview) redirect("/");


    return (
        <>
            <div className='flex flex-row gap-4 justify-between'>
                <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
                    <div className=' flex flex-row gap-4 items-center'>
                        <Image src={getRandomInterviewCover()} 
                        alt='logo'
                        height={40}
                        width={40}
                        className='rounded-full object-cover size-[40px]' />
                        <h3 className='capitalize'>{interview.role} interview</h3>
                    </div>
                    <DisplayTechIcons techStack={interview.techstack}/>
                </div>
                <p className='rounded-lg bg-gray-700 px-4 py-2 h-fit capitalize'>{interview.type}</p>
            </div>

            <Agent userName={user?.name || ''}
            userId={user?.id}
            interviewId={id}
            questions={interview.questions} type='interview' />
        </>
    )
}

export default page