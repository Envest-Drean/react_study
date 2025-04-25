import { ThumbsUp, Trash } from "phosphor-react";
import style from "./comment.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";

interface commentprops {
	content: string;
	onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: commentprops) {
	const [likeCount, setLikeCount] = useState(0);
	function hadleDeleteComment() {
		onDeleteComment(content);
	}
	function handleLikeComment() {
		setLikeCount((state) => {
			return state + 1;
		});
	}
	return (
		<div className={style.comment}>
			<Avatar hasBorder={false} src="https://github.com/mariathdev.png" />
			<div className={style.commentbox}>
				<div className={style.commentContent}>
					<header>
						<div className="authorAndTime">
							<strong>Matheus mariath</strong>
							<time title="14 de abril as 00:23" dateTime="2025-04-14 00:23:43">
								cerca de 1 hora atrás
							</time>
						</div>
						<button onClick={hadleDeleteComment} title="deletar comentario">
							<Trash size={24} />
						</button>
					</header>
					<p>{content}</p>
				</div>
				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp />
						Aplaudir <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
