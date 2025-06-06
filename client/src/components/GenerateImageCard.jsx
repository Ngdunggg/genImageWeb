import { CircularProgress } from '@mui/material'
import React from 'react'

const GenerateImageCard = ({src, loading}) => {
    return (
        <div className='flex flex-1 p-4 min-h-[300px] border-2 border-dashed border-t-yellow-300 rounded-3xl items-center justify-center'>
            {loading ? (
                <> 
                    <CircularProgress color='inherit' style={{height: 24, width: 24, marginRight: 8}}/>
                    Generating Your Image .......
                </>
            ) : (
                <>
                    {src ? (
                        <img src={src} className='w-full h-full object-cover rounded-3xl bg-black/70' />
                    ) : <>Write a prompt to generate image</>
                    }
                </>
            )}

        </div>
    )
}

export default GenerateImageCard