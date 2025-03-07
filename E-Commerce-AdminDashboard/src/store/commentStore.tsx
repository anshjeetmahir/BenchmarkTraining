import { create } from "zustand";
import { CommentStore } from "@/context/types";


export const useCommentStore = create<CommentStore>((set) => ({
    comments: [],
    setComments: (comments) => set({ comments }),
    addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
}));
