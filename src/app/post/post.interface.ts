
export interface Post {
    id: string;
    title: string;
    content: string;
    likes: number;
    created_at: string;
    comments: Comment[];
    temperory_comment: string;
}

export interface Comment {
    id: string;
    content: string;
    created_at: string;
}