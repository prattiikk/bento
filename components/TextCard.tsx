import { useState, useEffect } from "react"
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LayoutItem from "@/utils/Types"
import { useRecoilState, useSetRecoilState } from "recoil"
import { GlobalLayoutRecState, GlobalLayoutUnsavedChangesRecState } from "@/store/layoutStore"

export default function TextCard({ item }: { item: LayoutItem }) {
    const [content, setContent] = useState(item.data.content)
    const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">(item.data.textAlign)
    const [bgColor, setBgColor] = useState(item.data.bgColor)
    const [textColor, setTextColor] = useState(item.data.textColor)
    const [showBgColors, setShowBgColors] = useState(false)
    const [showTextColors, setShowTextColors] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const [layout, setLayout] = useRecoilState(GlobalLayoutRecState)
    const setUnsavedChanges = useSetRecoilState(GlobalLayoutUnsavedChangesRecState)

    const bgColors = [
        "#FFFFFF", "#F2F2F2", "#5DADE2", "#4A90E2", "#3498DB", "#F1C40F", "#E67E22", "#E74C3C",
        "#95A5A6", "#34495E", "#D7BDE2", "#D2B4DE", "#C39BD3", "#ABEBC6", "#82E0AA", "#16A085"
    ]

    const textColors = [
        { name: "White", value: "#FFFFFF" },
        { name: "Black", value: "#000000" },
        { name: "Gray", value: "#808080" },
        { name: "Blue", value: "#0000FF" }
    ]

    // Function to update the global layout
    const updateGlobalLayout = (updatedItem: LayoutItem) => {
        // Find the index of the current item in the layout array
        const index = layout.findIndex(l => l.i === updatedItem.i)

        if (index !== -1) {
            // Create a copy of the layout array and update the item at the found index
            const updatedLayout = [...layout]
            updatedLayout[index] = updatedItem

            // Set the updated layout in Recoil
            setLayout(updatedLayout)
            setUnsavedChanges(true)
        }
    }

    // useEffect hooks to trigger layout updates when changes occur
    useEffect(() => {
        updateGlobalLayout({
            ...item,
            data: {
                content,
                textAlign,
                bgColor,
                textColor
            }
        })
    }, [content, textAlign, bgColor, textColor])

    return (
        <div className="w-full h-full relative">
            <div
                className="w-full h-full p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: bgColor, color: textColor }}
            >
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full text-2xl bg-transparent focus:outline-none resize-none"
                    style={{ color: textColor, textAlign: textAlign }}
                    placeholder="Text content"
                />
            </div>
            <button className=" absolute -bottom-6 left-2 w-6 h-6" onClick={() => setShowMenu(!showMenu)}><Ellipsis /></button>
            {showMenu &&
                <div className="absolute mt-1 left-1/2 transform -translate-x-1/2 bg-black rounded-full shadow-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="text-white h-8 w-8" onClick={() => setTextAlign("left")}>
                            <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white h-8 w-8" onClick={() => setTextAlign("center")}>
                            <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white h-8 w-8" onClick={() => setTextAlign("right")}>
                            <AlignRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white h-8 w-8" onClick={() => setTextAlign("justify")}>
                            <AlignJustify className="h-4 w-4" />
                        </Button>
                        <div className="relative">
                            <Button
                                variant="ghost"
                                className="flex items-center text-white h-8 w-8 p-0"
                                onClick={() => setShowBgColors(!showBgColors)}
                            >
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: bgColor }}></div>
                            </Button>
                            {showBgColors && (
                                <div className="absolute mt-2 left-1/2 transform -translate-x-full w-48 mb-2 p-4 bg-gray-800 rounded-2xl shadow-lg z-20">
                                    <div className="grid grid-cols-8 gap-1 mb-2">
                                        {bgColors.map((color) => (
                                            <Button
                                                key={color}
                                                className="w-4 h-4 rounded-full p-0"
                                                style={{ backgroundColor: color }}
                                                onClick={() => {
                                                    setBgColor(color)
                                                    setShowBgColors(false)
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <Input
                                        type="text"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="bg-transparent rounded-md text-white border-gray-600 text-xs h-6 px-1"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <Button
                                variant="ghost"
                                className="flex items-center text-white h-8 w-8 p-0"
                                onClick={() => setShowTextColors(!showTextColors)}
                            >
                                <Type className="h-4 w-4" />
                            </Button>
                            {showTextColors && (
                                <div className="absolute left-1/2 transform -translate-x-0 mt-2 mb-2 p-1 bg-gray-800 rounded-2xl shadow-lg z-10">
                                    <div className="flex space-x-1">
                                        {textColors.map((color) => (
                                            <Button
                                                key={color.value}
                                                variant="ghost"
                                                className="p-1"
                                                onClick={() => {
                                                    setTextColor(color.value)
                                                    setShowTextColors(false)
                                                }}
                                            >
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }}></div>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
