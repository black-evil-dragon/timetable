export interface Action {
    label: string
    icon?: React.ReactNode
    type?: string
    onClick?: () => void
    items?: Action[]
}

export type Actions = (Action | Action[])[] | null;