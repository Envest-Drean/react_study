import style from "./post.module.css";

export function Post() {
	return (
		<article className={style.post}>
			<header>
				<div className={style.author}>
					<img
						className={style.avatar}
						title="itto sanzzo shura bezarius de lavorier setsu"
						src="https://github.com/ittosanzzo.png"
					/>
					<div className={style.authorInfo}>
						<strong>itto sanzzo</strong>
						<span>dev fullstack</span>
					</div>
				</div>
				<time
					title="14 de abril as 00:23"
					dateTime="2025-04-14 00:23:43">
					publicado a 1 hora
				</time>
			</header>
			<div className={style.content}>
				<p>Olá, pessoal!</p>

				<p>
					Acabo de adicionar um novo projeto ao meu portfólio: um bot
					de música desenvolvido especialmente para o meu RPG. O
					projeto se chama Chariot 🚀
				</p>

				<p>
					👉{" "}
					<a href="">
						Acesse em: github.com/IttoSanzzo/ChariotSanzzo{" "}
					</a>
				</p>
				<p>
					<a href="">#albina #envest #perck</a>
				</p>
			</div>

			<form className={style.commentForm}>
				<strong>deixe seu feedback</strong>
				<textarea placeholder="comente aqui." />
				<footer>
					<button type="submit">publicar</button>
				</footer>
			</form>
		</article>
	);
}
