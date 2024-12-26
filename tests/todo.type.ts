export type CATEGORY = {
    id: string;
    catagory: string,
    emoji: string
}

export type TODO = {
    id: string;
    title: string;
    description: string;
    currentTime: string;
    check: boolean;
    catagory: CATEGORY[]
}