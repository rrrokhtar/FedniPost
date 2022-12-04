
export interface Post {
    id: number;
    title: string;
    content: string;
    likes: number;
    created_at: Date;
    comments: Comment[];
}

export interface Comment {
    id: number;
    content: string;
    created_at: Date;
}