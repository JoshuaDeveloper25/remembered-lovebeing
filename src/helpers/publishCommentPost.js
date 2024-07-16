import getFastApiErrors from "../utils/getFastApiErrors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const publishCommentPost = (postId) => {
  const PublishCommentPostMutation = useMutation({
    mutationFn: async (commentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/comment/${postId}`,
        commentInfo
      ),
    onSuccess: (res) => {
      toast.success("Comment published successfully!");
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  return PublishCommentPostMutation;
}

export default publishCommentPost;
