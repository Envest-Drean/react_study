import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import style from "./Post.module.css";
import { Comment } from "./comment";
import { Avatar } from "./Avatar";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

export interface Author {
	name: string;
	role: string;
	avatarUrl: string;
}

export interface content {
	type: "paragraph" | "link";
	content: string;
}

interface postprops {
	author: Author;
	publishedAt: Date;
	content: content[];
}

export function Post({ author, publishedAt, content }: postprops) {
	const [comment, setcomment] = useState(["post interessante."]);
	const [newCommentText, setNewCommentText] = useState("");
	const publishedDateFormattend = format(
		publishedAt,
		"dd 'de' LLLL 'as' HH:mm'h'",
		{
			locale: ptBR,
		}
	);
	const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});
	function handleCreateNewComment(event: FormEvent) {
		event.preventDefault();
		setcomment([...comment, newCommentText]);
		setNewCommentText("");
	}
	function handleNewCommentchange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("");
		setNewCommentText(event.target.value);
	}
	function handleNewcommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("campo obrigatorio!");
	}

	function deleteComment(commentToDelete: string) {
		const commentsWithoutDeleteOne = comment.filter(
			(comment) => comment !== commentToDelete
		);
		setcomment(commentsWithoutDeleteOne);
	}
	const isNewCommentEmpty = newCommentText.length == 0;
	return (
		<article className={style.post}>
			<header>
				<div className={style.author}>
					<Avatar src={author.avatarUrl} />
					<div className={style.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>
				<time
					title={publishedDateFormattend}
					dateTime={publishedAt.toISOString()}>
					{publishedDateRelativeToNow}
				</time>
			</header>
			<div className={style.content}>
				{content.map((line) => {
					if (line.type == "paragraph") {
						return <p key={line.content}>{line.content}</p>;
					} else if (line.type == "link") {
						return (
							<p key={line.content}>
								<a href="#">{line.content}</a>
							</p>
						);
					}
				})}
			</div>

			<form onSubmit={handleCreateNewComment} className={style.commentForm}>
				<strong>deixe seu feedback</strong>
				<textarea
					name="comment"
					placeholder="comente aqui."
					onChange={handleNewCommentchange}
					value={newCommentText}
					onInvalid={handleNewcommentInvalid}
					required
				/>
				<footer>
					<button type="submit" disabled={isNewCommentEmpty}>
						publicar
					</button>
				</footer>
			</form>
			<div className={style.commentList}>
				{comment.map((comment) => {
					return (
						<Comment
							key={comment}
							content={comment}
							onDeleteComment={deleteComment}
						/>
					);
				})}
			</div>
		</article>
	);
}
