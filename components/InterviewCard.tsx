import React from 'react'
import Image from 'next/image';
import dayjs from 'dayjs';

const InterviewCard = ({interviewID, userId, role, 
    type, tecstack, createdat}: InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /min/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdat ||
        Date.now()).format('MMM D,YYYY');

    return (
        <div className='card-border w-{360px} max-sm:w-full min-h-96'>
            <div className='card-interview'>
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2
                     rounded-bl-lg bg-light-600'>
                        <p className='badge-text'>{normalizedType}</p>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default InterviewCard