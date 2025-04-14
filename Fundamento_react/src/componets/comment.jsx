import { ThumbsUp, Trash, TrashSimple } from "phosphor-react";
import style from "./comment.module.css";

export function comment() {
	return (
		<div className={style.comment}>
			<img title="mariath" src="https://github.com/mariathdev.png" />
			<div className={style.commentBox}>
				<div className={style.commentContent}>
					<header>
						<div className="authorAndTime">
							<strong>Matheus mariath viana</strong>
							<time
								title="14 de abril as 00:23"
								dateTime="2025-04-14 00:23:43">
								cerca de 1 hora atrás
							</time>
						</div>
						<button title="deletar comentario">
							<Trash size={20} />
						</button>
					</header>
					<p>muito bom itto!vou usar ein</p>
				</div>
			</div>
			<footer>
				<button>
					<ThumbsUp />
					Aplaudir <span>20</span>
				</button>
			</footer>
		</div>
	);
}
