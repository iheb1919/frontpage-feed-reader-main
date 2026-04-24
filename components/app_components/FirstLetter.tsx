import { dotColorMap, firstLetterColor } from "@/lib/utils"
const FirstLetter = ({ text }: { text: string }) => {
    const color = firstLetterColor(text?.[0] ?? "A")
    const bgColor = dotColorMap[color]
    return (

        <div
            className={`uppercase shrink-0 w-4 h-4 
                           flex justify-center items-center text-[9px] 
                           font-extrabold text-white
                           ${bgColor} rounded-xs`}
        >
            {text?.[0] ?? "A"}
        </div>

    )
}
export default FirstLetter