
interface GapComponentProps {
    children: React.ReactNode
    block?:number
    inline?:number
}

export const GapComponent:React.FC<GapComponentProps> = ({children, block = 5, inline = 5}) => {
    return(
        <div className={`web-constructor-gap-component`} style={{paddingBlock: block, paddingInline: inline}}>
            {children}
        </div>
    )
}