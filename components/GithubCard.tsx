"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import GitHubCalendar from 'react-github-calendar'
import { GithubIcon } from 'lucide-react'

export default function Component() {
    const [username] = useState('stable-diffusion')

    // const theme = {
    //     level0: '#ebedf0',
    //     level1: '#9be9a8',
    //     level2: '#40c463',
    //     level3: '#30a14e',
    //     level4: '#216e39',
    // }

    return (
        <Card className="w-full max-w-[480px] mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 p-6 pb-2">
                <div className="bg-black rounded-xl p-2">
                    <GithubIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold">{username}</h2>
                </div>
                <Button variant="outline" className="rounded-full px-6">
                    Follow
                </Button>
            </CardHeader>
            <CardContent className="p-6 pt-2">
                <GitHubCalendar
                    username={username}
                    theme={{
                        light: ['hsl(0, 0%, 92%)', 'firebrick'],
                        dark: ['#333', 'rgb(214, 16, 174)'],
                    }}
                    blockSize={10}
                    blockMargin={4}
                    fontSize={0}
                    hideColorLegend
                    hideMonthLabels
                    hideTotalCount
                />
            </CardContent>
        </Card>
    )
}