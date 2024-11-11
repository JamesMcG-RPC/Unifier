export type Query = {
    label: string
    value1: string | number
    value2?: string | number
    
}

export type UdrRequest = {
    reportname: string
    query?: Query[]
}